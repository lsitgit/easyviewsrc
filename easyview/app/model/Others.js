/**
 * * Easyview model file, used to describe data that monitors others usage of gradebook items 
 * *
 * * @package easyview report
 * * @copyright 2014 UC Regents
 * * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v2
 * */

Ext.define('easyview.model.Others', {
        extend: 'Ext.data.Model',
        fields: [
		{name:'module',		type:'string'},
		{name:'action',		type:'string'},
		{name:'firstname',		type:'string'},
		{name:'lastname',		type:'string'}
        ]
});

