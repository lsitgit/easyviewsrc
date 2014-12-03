<?php
/** queries DB for list of other users who have used gradebook modules since the given timestamp
* @package easyview report
* @copyright 2014 UC Regents
* @license http://www.gnu.org/copyleft/gpl.html GNU GPL v2
 */


define('AJAX_SCRIPT', true);

// message -- these are better in the the language file
define('LOCKED_ITEM', 'Yes. Item locked, scores for all students are locked (can\'t be modified)');
define('LOCKED_SCORE', 'Yes. Grade score locked,  this student\'s score is locked (can\'t be modified)');
define('HIDDEN_ITEM', ' Yes. Item hidden: all students won\'t see this grade item in their grade view');
define('HIDDEN_SCORE', 'Yes. Score hidden, this student won\'t see this score in their grade view ');
define('OVERRIDDEN', 'Yes. This student\'s score has been overridden in the gradebook - in general its best to modify scores in the activity.');
define('EXCLUDED', 'Yes. This student\'s score won\'t be included in an aggregration for the category or course total.');

trigger_error("this is grade grade json");
require 'config_path.php';
$gid = required_param('gid', PARAM_INT);
$userid = required_param('uid', PARAM_INT);
$ggid = required_param('ggid', PARAM_INT);

$course = $DB->get_record('course', array('id'=>$_SESSION['COURSE_ID']));
$context = context_course::instance($_SESSION['COURSE_ID']);

require_login($course);

if (! has_capability('gradereport/grader:view', $context, $USER->id)) {
        print_error('Insufficient privilege');
}

/* THIS IS NOT USE FOR UPDATING, WE SHOULD IMPLEMENT UPDATING IN A SEPARATE SCRIPT
if ( $_SERVER['REQUEST_METHOD'] === 'PUT' ) {
    $_PUT = array();
    $_RAW = file_get_contents('php://input');
    trigger_error('$RAW: '.$_RAW);
    if ( !empty($_RAW) ) {
        $data = json_decode($_RAW);
        trigger_error(print_r($data,1));
        $DB->update_record('grade_grades',$data);
	}
exit();
}
if ( $_SERVER['REQUEST_METHOD'] === 'POST' ) {
    trigger_error('in gradegrade json file POST');
    $_PUT = array();
    $_RAW = file_get_contents('php://input');
    trigger_error('$RAW: '.$_RAW);
exit();
}
 */

// grade_items.id which contains courseid
//$gid = required_param('gid', PARAM_INT);
if ( empty($gid) ) {
    // grade items must have record, so send error handling message
    exit;
}//
$gradeitem = $DB->get_record('grade_items', array('id'=>$gid));
if ( ! is_object($gradeitem) ) {
    // error handling w/message back to calling page
    exit;
}// endif no gradeitem object

// user data
//$userid = required_param('uid', PARAM_INT);
$user = $DB->get_record('user', array('id'=>$userid), 'id, firstname, lastname, idnumber, email');

// we cannot rely on grade grades record id since record may not be 
// created yet. best to check the ggid before querying. 
if ( ! empty($ggid) ) {
    // RL: more efficient to leave out the join on user and  grade_items 
    $record = $DB->get_record('grade_grades', array('id'=>$ggid), 
    'id, hidden, locked, overridden, excluded, finalgrade, feedback');
    if ( $record->finalgrade === null || $record->finalgrade === '' ) {
        $record->finalgrade = 'undefined';
    } else {
        $record->finalgrade = (float) $record->finalgrade;
    }
} else {
    // no grade_grades record, create a standard object and set the value
    $record = (object) array(
        'id'=>0, 'itemid' => $gid, 'userid'=>$userid, 'finalgrade'=> 'undefined',
        'hidden'=>null, 'locked'=>null, 'overridden'=>null, 'excluded'=>null, 'feedback'=>null,
        'itemtype'=>$gradeitem->gradetype, 'itemmodule'=>$gradeitem->itemmodule, 
        'itemgrademax'=>$gradeitem->grademax, 
        'pix'=>'',
    );

}//end if

// explicity cast int and float
$record->locked = (int)  $record->locked;
$record->hidden = (int)  $record->hidden;
$record->excluded = (int)  $record->excluded;


// merge data from $gradeitem, $user, into $record
$record->displayname    = $user->firstname . ' ' . $user->lastname;
$record->email          = $user->email;
$record->idnumber       = $user->idnumber;

$record->itemname       = $gradeitem->itemname;
$record->itemtype       = $gradeitem->itemtype;
$record->itemmodule     = $gradeitem->itemmodule ? $gradeitem->itemmodule : $gradeitem->itemtype;
$record->itemscaleid    = $gradeitem->scaleid;
$record->itemgrademax   = $gradeitem->grademax;

// overridden, hidden, excluded, locked
$record->overridden =  $record->overridden ? OVERRIDDEN : 'No';
$record->excluded =  $record->hidden ? EXCLUDED : 'No';

if ( $gradeitem->hidden ) {
    $record->hidden = HIDDEN_ITEM;
} else if ( $record->hidden ) {
    $record->hidden = HIDDEN_SCORE;
} else { 
    $record->hidden = 'No';
}

$locked = '';
if ( $gradeitem->locked ) {
    $locked = LOCKED_ITEM;
} else if ( $record->locked ) {
    $locked = LOCKED_SCORE;
}
//$record->locked = $locked ? '<img src="' . $OUTPUT->pix_url('t/locked') . '" alt="locked" /> ' . $locked : 'No';    
$record->locked = $locked ? $locked : 'No';    
    
//  handle user avatar
$record->pix  = @ $OUTPUT->user_picture($user, array('size'=>100, 'link'=>false));
//$record->pix  = @ $OUTPUT->user_picture($user, array('link'=>false));


$others_array = array();
array_push($others_array,json_encode($record));

$final = implode(',',$others_array);

################################
### BEGIN OUTPUT TO BROWSER
###
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Fri, 01 Jul 2011 00:00:00 GMT"); // Date in the past
header("Content-type: application/JSON; charset=utf-8");

$status = empty($final) ? 'false' : 'true';
//trigger_error($final);
?>{"status": <?php echo $status; ?>, "gradegrade": [<?php echo $final; ?>]}
