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
	title:'&nbsp&nbspEasyView: '+COURSENAME,
	xtype: 'panel',
	header:{
                titlePosition:1,
                items:[{
                        xtype:'button',
                        text:'Back to course',
			handler:function(){
		                window.location = BACKURL;
			},
			icon:'resources/door_out.png'
		},{
			xtype:'textarea',
			autoScroll:true,
			width:300,
			id:'info_text',
			editable:false,
			hidden:HIDE_GRADEBOOK_ACCESS!=0?true:false
		},{
			xtype:'button',
			text:'Reload Data',
			action:'reload_data',
			id:'reload_data',
			disabled:true,
			icon:'resources/database_refresh.png',
			tooltip:'No Grades Have Been Modified',
			hidden:HIDE_GRADEBOOK_ACCESS!=0?true:false
		},{
                       	xtype: 'button',
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
        	text: 'Print',
                icon: 'resources/printer.png',
                handler : function(){
                	easyview.plugins.printer.Printer.printAutomatically = false;
                        easyview.plugins.printer.Printer.print(Ext.ComponentQuery.query('#easyviewgrid')[0]);
           	}
	},{
		xtype:'button',
		text:DETAILS_TEXT,//'Show Student Details',
		action:'details'//listener and handler for this action in the Root controller
	},{
                xtype:'button',
                text:CATEGORY_TEXT,//'Hide Category Totals',
		action:'totals'//listener and handler for this action in the Root controller

	},{
		xtype:'combobox',
		id:'group_filter_select',
        	displayField: 'name',
        	width: 300,
        	store: 'Groups',
        	queryMode: 'local',
        	editable: false,
		emptyText:'Filter Students by Course Group'
	},{
		xtype:'combobox',
		id:'category_filter_select',
        	displayField: 'name',
        	width: 300,
        	store: 'Categories',
        	queryMode: 'local',
        	editable: false,
		emptyText:'Filter Columns by Grade Item Category'
	},'->',{
		xtype:'button',
		text:HIDE_GRADEBOOK_ACCESS!=0?'Show Gradebook Access':'Hide Gradebook Access',
		action:'gradebook_access',
		id:'gradebook_access'
	}],
        items:[{region:'center',xtype:'easyviewgrid'}]
});
