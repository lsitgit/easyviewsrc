/**
 * * Easyview main view file - is the bottom-most view element and contains everything else 
 * *
 * * @package easyview report
 * * @copyright 2014 UC Regents
 * * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v2
 * */

Ext.define('easyview.view.main.Main', {
	extend: 'Ext.panel.Panel',
    	xtype: 'app-main',
    	layout: 'border',
	
        title:'&nbsp;&nbsp;<a href="'+MYHOME+'"><img src="resources/gauchospace.svg" '
		+'onmouseover="this.src=\'resources/gauchospace_hover.svg\'" onmouseout="this.src=\'resources/gauchospace.svg\'"></a><img src="resources/gradebook.svg">'
		+'<br><div class="my-header-link">' 
		+'<a href="'+MYHOME+'">My Home</a>&nbsp;'
		+'<span class="gradebookgold">&#9654; </span> '
		+'<a href="'+COURSEHOME+'">' + COURSENAME + '</a>'
                +'&nbsp;&nbsp;&nbsp;&nbsp;' 
                +'<a href="' + THISURL + '" title="Reset"  > Refresh&nbsp;&nbsp;</a>'
                +'<span class="gradebookgold"> Other Tools &#9654;</span>'
                +'<a href="' + SETUPURL + '" title="Gradebook Setup"> Setup &nbsp;&nbsp;</a>'
                +'<a href="' + IMPORTURL + '" title="Import"  > Import &nbsp;&nbsp;</a>'
                +'<a href="' + EXPORTURL + '" title="Export"  > Export &nbsp;&nbsp;</a>'
                +'<a href="' + BACKURL + '" title="Old Gradebook Report" > Old Report&nbsp;&nbsp;</a>'
                +'<a href="' + MYPREFURL + '" title="My Preferences" > My Preferences</a>'
                +'</div>',

	xtype: 'panel',
	header:{
		minHeight:73,
                titlePosition:0,
                items:[
		{
			
			xtype:'container',
			id:'gradebook_access_panel',
			hidden:DEFAULT_CHECK_GRADES_AND_OTHERS==0?true:false,
			layout:'hbox',
			items:GRADEBOOK_ACCESS_PANEL//defined in indexLoad.php based on config variables
		},/*{
			xtype:'combobox',
			id:'navigation_combo',
			emptyText:'Tools...',
			cls:'my-header-item',
			width:100,
			store:[
				'Setup',
				'Import', 'Export',
				'Old report', 'My Preferences'
			],
			editable:false
		},*/{
                       	xtype: 'button',
			cls:'my-header-item',
                       	text: 'Help',
                       	menuAlign: 'right',
                       	icon: 'resources/help.png',
			handler:function(){
		               	window.open(HELPURL);
			}
		}]
        },
	//defines buttons in task bar above the grid
	tbar:[{
		xtype:'combobox',
		id:'group_filter_select',
        	displayField: 'name',
        	width: 200,
        	store: 'Groups',
        	queryMode: 'local',
        	editable: false,
		emptyText:'Groups'
	},{
		xtype:'combobox',
		id:'category_filter_select',
        	displayField: 'name',
        	width: 200,
        	store: 'Categories',
        	queryMode: 'local',
        	editable: false,
		emptyText:'Show Only...',
	},{


                xtype:'button',
                text:CATEGORY_TEXT,//'Hide Category Totals',
                action:'totals'//listener and handler for this action in the Root controller
	},{
                xtype:'button',
                text:DETAILS_TEXT,//'Show Student Details',
                action:'details'//listener and handler for this action in the Root controller
	},{
                text: 'Print',
                icon: 'resources/printer.png',
                handler : function(){
                        easyview.plugins.printer.Printer.printAutomatically = false;
                        easyview.plugins.printer.Printer.print(Ext.ComponentQuery.query('#easyviewgrid')[0]);
                }
		//multiSelect:true
	/*
	},{
		xtype:'button',
		id:'category_multifilter',
		action:'category_multifilter',
		text:'Custom Category Filter'
	*/},'->',GRADEBOOK_ACCESS_TOGGLE/*{
		xtype:'button',
		text:DEFAULT_CHECK_GRADES_AND_OTHERS==0?'Show Gradebook Access':'Hide Gradebook Access',
		action:'gradebook_access',
		id:'gradebook_access'
	}*/],
        items:[{region:'center',xtype:'easyviewgrid'}]
});
