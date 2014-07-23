/**
 * * Easyview store file - Used to hold data that monitors others usage of the gradebook 
 * *
 * * @package easyview report
 * * @copyright 2014 UC Regents
 * * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v2
 * */

Ext.define('easyview.store.Others', {
	extend: 'Ext.data.Store',
	model: 'easyview.model.Others',
	//pageSize:10,
        autoLoad: true,
        autoSync: true,
        proxy: {
                type: 'rest',
                url: 'others_json.php',
                reader: {
                        type: 'json',
                        rootProperty: 'others',
                        successProperty: 'success',
            		totalProperty: 'total'
                }
        },
});
