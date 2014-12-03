/**
 * * Easyview  file - describes grid, specifically does all logic for the column header drop downs
 *  usually column descriptions would be in this file but since they are generated dynamically, they are in indexLoad.js
 * *
 * * @package easyview report
 * * @copyright 2014 UC Regents
 * * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v2
 * */

Ext.define('easyview.view.main.GradeEditWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.gradeEditWindow',
    //id: 'gradeeditwindow',
    //controller: 'GradeEditWinCtl', 
    title:'Grade Item Editor for ', //+column.text.replace(/<img[^>]*>/g,""),
    height:500,
    width:600,
    bodyPadding: 5, 
    constrain: true,
    layout:'border',
    modal:true,
    items:[{
        xtype:'gradeEditForm',
        region:'center',
        width:'100%',   
        height:'100%',
    }],
    buttons: [{ 
        xtype:'button',
        name: 'close',
        align:'c-r',
        text: 'close',
        handler: function() { this.up('window').close(); }
    }]
}); 

