/**
 * * Easyview store file - Used to hold data that monitors changes in grade items
 * *
 * * @package easyview report
 * * @copyright 2014 UC Regents
 * * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v2
 * */

Ext.define('easyview.store.Dataload', {
	extend: 'Ext.data.Store',
	model: 'easyview.model.Dataload',
	//pageSize:10,
        autoLoad: true,
        autoSync: true,
        proxy: {
                type: 'rest',
                url: 'dataload_json.php',
                reader: {
                        type: 'json',
                        rootProperty: 'dataload',
                        successProperty: 'success',
            		totalProperty: 'total'
                }
        },
});
