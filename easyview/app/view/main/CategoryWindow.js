/**
 * * Easyview main view file - is the bottom-most view element and contains everything else 
 * *
 * * @package easyview report
 * * @copyright 2014 UC Regents
 * * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v2
 * */

Ext.define('easyview.view.main.CategoryWindow', {
	extend: 'Ext.window.Window',
	alias:'categorywindow',
                        title:'Custom Category Filter',
                        height:400,
                        width:400,
                        layout:'border',
                        autoScroll: true,
                        bodyPadding: 10,
                        constrain: true,
		/*
                        items:[{
                                xtype:'checkboxgroup',
                                columns:2,
                                items:checkboxconfigs,
                                region:'center',
                                width:'100%',
                        },{
                                xtype:'container',
                                layout:'hbox',
                                region:'south',
                                height:40,
                                width:'100%',
                                items:[{
                                        xtype:'button',
                                        text:'Submit',
                                        height:'100%',
                                        width:'50%',
                                        action:'submit_multifilter'
                                },{
                                        xtype:'button',
                                        text:'Cancel',
                                        height:'100%',
                                        width:'50%',
                                        action:'close_window'
                                }]
                        }]
*/

});
