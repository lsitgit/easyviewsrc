<?php

/**
* Easyview primary file to load
*
* @package easyview report
* @copyright 2014 UC Regents
* @license http://www.gnu.org/copyleft/gpl.html GNU GPL v2
*/

require 'config_path.php'; // lots of library loaded, give $CFG and more useful variables, can uase all of moodle API from moodlelib.php dmllib.php, etc.""
require_once $CFG->dirroot.'/lib/gradelib.php';
require_once 'functions.php';


// RL: w/o this it is open access, this app has lots of student info fullname + perm + email which makes the data 
// a bit sensitive.

require_login();

$COURSEIDPASSEDIN =  required_param('id', PARAM_INT); // grade item  id
$_SESSION['COURSE_ID'] = $COURSEIDPASSEDIN;
//if student details is 1, the details will show by default
$STUDENT_DETAILS = optional_param('details',0,PARAM_INT);
//if category totals is 1, the category totals will show by default
$CATEGORY_TOTALS = optional_param('categories',1,PARAM_INT);

// RL: global declaration is only need if it is inside a function/class method   or if this code is include elsewhere inside a function/method.
global $DB;
$context = context_course::instance($COURSEIDPASSEDIN);

if (! has_capability('gradereport/grader:view', $context, $USER->id)) {
        print_error('Insufficient privilege');
}
add_to_log($COURSEIDPASSEDIN,'easyview','view','','view');

/////////////////////////////////////////////////////////////////////////
////code to create all the entries for each student in the gradebook/////
////////////////////////////////////////////////////////////////////////

//get all students and grade items for course
$students_and_all_groups        = get_students($COURSEIDPASSEDIN,$DB);//included in functions.php
$students       =       $students_and_all_groups[0];
$all_groups     =       $students_and_all_groups[1];//will be parsed below to create groups dropdown
$grade_items_and_categories     = get_grade_items($COURSEIDPASSEDIN,$DB);//included in functions.php
$grade_items = $grade_items_and_categories[0];
$all_categories = $grade_items_and_categories[1];//will be parsed below to create categories dropdown
//array_final will be filled, flattened, and set to json
$array_final    = array();
//nogroupflag will be used to see if any students below to no groups
//later on, the flag will be checked and if set to 1, a "no group" group
//will be added to the drop down
$nogroupflag    = 0;

// first build table of grade scores...$uids=array();
foreach ($students as $i => $any){ $uids[]=$students[$i]['id']; }
$ggtable=array();
for($j=0; $j<count($grade_items); $j++){
    $gitem=$grade_items[$j]['id'];
    $gi=grade_item::fetch(array('id'=>$gitem));
    $ggtable[$gitem]= grade_grade::fetch_users_grades($gi,$uids,true);
}


//creates final json, loops through all students and each grade item to fill in matrix
for ($i = 0; $i < count($students); $i++){
        if($students[$i]['group']==NULL){
                //$row['group']='no group';
                $nogroupflag=1;
        }
}

//////////////////////////////////////////////////////////
///code to create the groups dropdown filter contents/////
//////////////////////////////////////////////////////////
$id = 0;
//$groupNames = array();
$courseGroups = array();
//all groups is set above, returned from get_students
foreach ($all_groups as $name) {
        $entry['name'] = addslashes($name);
        array_push($courseGroups, json_encode($entry));
        $id++;
}
//manually adding 'all groups' entry$entry['name'] = 'all groups';
$entry['name'] = 'all groups';
array_push($courseGroups, json_encode($entry));
$id++;
// don't display a "no group" if everyone belongs to a group
if ( $nogroupflag == 1 ) {
        $entry['name'] = 'no group';
        array_push($courseGroups, json_encode($entry));
}

$groups = implode(',', $courseGroups);
$_SESSION['JSON_GROUPS'] = $groups;


//////////////////////////////////////////////////////////////
///code to create the categories dropdown filter contents/////
//////////////////////////////////////////////////////////////
$id = 0;
$courseCategories = array();
//all categories is returned from get_grade_items (see above)
foreach ($all_categories as $name) {
        $entry['name'] = $name;
        array_push($courseCategories, json_encode($entry));
        $id++;
}

$categories = implode(',', $courseCategories);
$_SESSION['JSON_CATEGORIES'] = $categories;


//get the title of the course
$sql="SELECT c.shortname FROM {course} as c WHERE id=".$COURSEIDPASSEDIN.";";
$course_name = $DB->get_record_sql($sql)->shortname;

$_SESSION['JSON_ITEMS_TOTAL']=count($array_final);
//$final = implode(',',$array_final);
//$_SESSION['JSON_ITEMS'] = $final;
session_start();
//error_log("in index.php, chaning time");
$_SESSION['GRADEBOOK_DATALOAD']= (int)time();
//error_log("time on initial load: ".$_SESSION['GRADEBOOK_DATALOAD']);
//print($_SESSION['GRADEBOOK_DATALOAD']);

?>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <title>easyview</title>
	<script type="text/javascript">
        	//pull globals out of php to be used in the app
        	var WROOT = <?php print("'".$CFG->wwwroot."'");?>;
        	var COURSEIDPASSEDIN = <?php print("'".$COURSEIDPASSEDIN."'");?>;
        	var COURSENAME = <?php print("'".$course_name."'");?>;
        	var BACKURL = WROOT+"/grade/report/grader/index.php?id="+COURSEIDPASSEDIN;
        	var HELPURL = WROOT+"/redirect/gradebook.html";

		var QUICKEDIT_PARAM = <?php print("'".$quickedit_param."'");?>;
		var HISTOGRAM_PARAM = <?php print("'".$histogram_param."'");?>;
		var TEXT_PARAM = <?php print("'".$text_param."'");?>;
		var averages_cond = <?php print("'".$averages_param."'");?>;
		var AVERAGES_PARAM = [];
		if(averages_cond == 1){
			AVERAGES_PARAM =[{ftype: 'summary', dock:'bottom'}];
		}
		var RELOAD_WARNING = 0;
		var STOP_CHECK_OTHERS =0;
		var STOP_CHECK_DATA =0;
		var HIDE_GRADEBOOK_ACCESS =<?php print ($hide_gradebook_access);?>;
		var CHECK_ACCESS =<?php print ($check_access);?>;
		var CHECK_DATA =<?php print ($check_data);?>;

 

        	//this php block grabs the grade_items array from the php above and creates a javascript array from it
        	//this will be used to create the columns and model
        	<?php
                	$js_array = json_encode($grade_items);
                	echo "var grade_items = ". $js_array . ";\n";
			if ($STUDENT_DETAILS == 1){
				echo "var hide_details = false;\n";	
				echo "var DETAILS_TEXT = 'Hide Student Details';\n";	
			}else{
				echo "var hide_details = true;\n";	
				echo "var DETAILS_TEXT = 'Show Student Details';\n";	
			}
			if ($CATEGORY_TOTALS == 1){
				echo "var hide_categories = false;\n";	
				echo "var CATEGORY_TEXT = 'Hide Category Totals';\n";	
			}else{
				echo "var hide_categories = true;\n";	
				echo "var CATEGORY_TEXT = 'Show Category Totals';\n";	
			}
        	?>
	</script>
	<link rel-"stylesheet" type="text/css" href="easyview_style.css">
    	<script id="indexload" type="text/javascript" src="indexLoad.js"></script>
    	<script id="microloader" type="text/javascript" src="bootstrap.js"></script>

</head>
       	<body>
                <div id="gradebook-app"></div>
        </body>
</html>
