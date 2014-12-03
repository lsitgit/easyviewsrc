/**
 * * Easyview  file - describes grid, specifically does all logic for the column header drop downs
 *  usually column descriptions would be in this file but since they are generated dynamically, they are in indexLoad.js
 * *
 * * @package easyview report
 * * @copyright 2014 UC Regents
 * * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v2
 * */


Ext.define('easyview.view.main.GradeEditForm', {
    extend: 'Ext.form.Panel',
    id:'gradeEditForm',
    alias:'widget.gradeEditForm',
    closeAction: 'destroy',
    //controller: 'gradeEditFormAction',  // move to edit window
    layout: 'vbox',
    bodyPadding: 5,
    defaults:{ width:'100%'},
    fieldDefaults: { labelAlign: 'right', margin:'0 auto 0 auto', padding:'0 auto 0 auto', bodyPadding:'0 auto 0 auto', hideEmptyLabel: true },
    items: [{
        xtype: 'container', layout: 'hbox', border: 1, defaults: {width: '100%'},
        fieldDefaults: { margin:'0 auto 0 auto', padding:'0 auto 0 auto', bodyPadding:'0 auto 0 auto' },
        items: [{
                xtype: 'container', 
                border: 5,
                align: 'center', 
                fixed: true, 
                width: 105,
        		minHeight: 125,
                height: 125,
        		maxHeight: 125,
               items: [{ xtype: 'displayfield', align: 'center', name: 'pix' }]
            } , {
                xtype: 'container',
                layout: 'vbox' ,
                fieldDefaults: { margin: '0 auto 0 auto', padding: '0 auto 0 auto', bodyPadding: '0 auto 0 auto', hideEmptyLabel: true, flex: 1, labelWidth: 10,
                   fieldStyle: { font: '600 15px/17px helvetica,arial,verdana,sans-serif', padding:'0 auto 0 auto' }
                },
                items: [{
                    xtype: 'displayfield',
                    name: 'displayname',
                    fieldLabel: 'Name',
                    labelAlign: 'left'
                } , {
                    xtype: 'displayfield',
                    name:  'idnumber',
                    fieldLabel: 'Perm No',
                    labelAlign: 'left'
                } , {
                    xtype: 'displayfield',
                    name: 'email',
                    fieldLabel: 'Email',
                    labelAlign: 'left'
                }] 
            }]
    }, {
        xtype: 'container', 
        layout: 'vbox', 
        items: [{
            name: 'itemname',
            xtype:'displayfield',
            fieldLabel: 'Grade item'
        },{
            xtype: 'container',
            layout: 'hbox',
            items: [{
                    name: 'itemmodule',
                    xtype: 'displayfield',
                    fieldLabel: 'Type'
                },{
                    name: 'itemgrademax',
                    xtype:'displayfield',
                    fieldLabel: 'Max Score', /*
                    renderer:function(value) {
                    	return isNaN(value)   ? '-' : value.toFixed(SCORE_PRECISION) ; // PRECISION from index.php
                    } */
                }]
        }]
    }, {
        xtype: 'fieldset',
        border: '2 0 2 0',
        fieldStyle: { font: '600 16px/18px helvetica,arial,verdana,sans-serif', padding:'0 auto 0 auto' },
        items: [{
                name:'finalgrade',
                xtype:'displayfield',
                fieldLabel:'Score',
                defaultAlign: 'c-b', /*
                renderer:function(value) {
                    return isNaN(value)   ? '-' : value.toFixed(SCORE_PRECISION) ; // PRECISION from index.php
                },*/ 
                width: '10'
            }, {
                name:'feedback',
                xtype:'displayfield',
                fieldLabel:'Feedback',
                renderer:function(value, metaData, record, rowIdx, colIdx, store, view) {
                    //console.log('feedback = ' + value);
                    return ( value == undefined || value == '' ? '-' : value );
                }, 
                allowblank:true
            }]
       }, { 
            xtype: 'fieldset',
            layout: 'auto',
            border: 0,
            items: [{
                xtype: 'displayfield',
                name: 'locked',
                fieldLabel: 'Locked',
                renderer:function(value, metaData, rec, rIdx, cIdx, store, view) {
                    return  (value == undefined || value == '' || value == '0' ) ? 'No' : value;
                }
            },{
                name: 'hidden',
                xtype: 'displayfield',
                fieldLabel: 'Hidden'
            }, {
                xtype: 'displayfield',
                name: 'excluded', 
                fieldLabel: 'Excluded'
            },{
                xtype: 'displayfield',
                name: 'overridden', 
                fieldLabel: 'Overridden'

            }]
      } ]
});
