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
        layout:'vbox',
	//url:'submit_form.php',
	standardSubmit:true,
       	defaults:{ width:'100%'},
       	items:[{
	/*
		xtype:'label',
		id:'form_name',
		width:'100%'
	},{
		xtype:'label',
		id:'form_perm'
	},{
		xtype:'label',
		id:'form_itemname'
	},{
		xtype:'label',
		id:'form_grademax'
       	},{*/
		xtype:'numberfield',
       		fieldLabel:'Score',
       	 	name:'finalgrade',
        	allowblank:true,
		id:'form_score'
	},{
		xtype:'textfield',
       		fieldLabel:'Feedback',
       	 	name:'feedback',
        	allowblank:true,
		id:'form_feedback'
	/*},{
		xtype:'label',
		id:'form_overridden',
		text:"Overridden: not implemented yet"
	},{
		xtype:'label',
		id:'form_hidden',
		text:"Hidden: not implemented yet"
	},{
		xtype:'label',
		id:'form_locked',
		text:"Locked: not implemented yet"
	},{
		xtype:'label',
		id:'form_excluded',
		text:'Excluded: not implemented yet'
	*/}]   
});
