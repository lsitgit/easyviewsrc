/**
 * * Easyview model file - Used to describe rows in the grid, dynamically defined indexLoad.js 
 * *
 * * @package easyview report
 * * @copyright 2014 UC Regents
 * * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v2
 * */

Ext.define('easyview.model.Items', {
	extend: 'Ext.data.Model',
	idProperty:'userid',	
	fields:MODEL  //defined in indexLoad.js
});
