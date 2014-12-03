/**
 * * Easyview store file - Used to hold data that monitors others usage of the gradebook 
 * *
 * * @package easyview report
 * * @copyright 2014 UC Regents
 * * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v2
 * */

Ext.define('easyview.store.Gradegrade', {
	extend: 'Ext.data.Store',
	model: 'easyview.model.Gradegrade',
	//pageSize:10,
        autoLoad: false,
        autoSync: true,
        proxy: {
                type: 'rest',
                url: 'gradegrade_json.php',
                reader: {
                        type: 'json',
                        rootProperty: 'gradegrade',
                        successProperty: 'success'
                }
        },
});
