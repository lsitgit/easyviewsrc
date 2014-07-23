/**
 * * Easyview model file, used to describe data that monitors changes in grade items 
 * *
 * * @package easyview report
 * * @copyright 2014 UC Regents
 * * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v2
 * */

Ext.define('easyview.model.Dataload', {
        extend: 'Ext.data.Model',
        fields: [
		{name:'firstname',		type:'string'},
		{name:'lastname',		type:'string'},
		{name:'finalgrade',		type:'string'},
		{name:'itemname',		type:'string'}
        ]
});

