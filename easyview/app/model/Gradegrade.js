/**
 * * Easyview model file, used to describe data that monitors others usage of gradebook items 
 * *
 * * @package easyview report
 * * @copyright 2014 UC Regents
 * * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v2
 * */

Ext.define('easyview.model.Gradegrade', {
    extend: 'Ext.data.Model',
    allowNull: true,
    fields: [
		{name:'id', 	        type:'int'},
		{name:'itemid',		    type:'int'},
		{name:'userid',		    type:'int'},
		{name:'finalgrade',	    type:'float',       defaultValue: undefined },
		{name:'hidden',         type:'string',      defaultValue: 'No' },
		{name:'locked',         type:'string'},
		{name:'overridden',	    type:'string',      defaultValue: 'No' },
		{name:'excluded',	    type:'string',      defaultValue: 'No' },
		{name:'feedback',	    type:'string'},
		{name:'itemname',	    type:'string'},
		{name:'itemtype',	    type:'string'},
		{name:'itemmodule',	    type:'string',      defaultValue: 'manual' },
		{name:'itemgrademax',	type:'float'},
		{name:'itemlocked',	    type:'int'},
		{name:'itemscaleid',	type:'int'},
		//{name:'firstname',	type:'string'},
		//{name:'lastname',	type:'string'},
		{name:'displayname',	type:'string'},
		{name:'idnumber',	    type:'string'},
		{name:'email',	        type:'string'},
		{name:'pix',	        type:'string'}
        ]
});

