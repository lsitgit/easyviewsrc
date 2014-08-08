/**
 * * Easyview  file - describes grid, specifically does all logic for the column header drop downs
 *  usually column descriptions would be in this file but since they are generated dynamically, they are in indexLoad.js
 * *
 * * @package easyview report
 * * @copyright 2014 UC Regents
 * * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v2
 * */


Ext.define('easyview.view.main.GradeGradeForm', {
    	extend: 'Ext.form.Panel',
	alias:'widget.gradegradeform',
	id:'gradegradeform',
        layout:'anchor',
       	defaults:{ anchor:'100%'},
       	items:[{
       		fieldlabel:'Feedback',
       	 	name:'feedback',
        	allowblank:true,
       	}]   
});
