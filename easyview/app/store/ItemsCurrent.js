/**
 * * Easyview store file - Holds all course participants and their grades
 * * this store is updated with latest grade information
 * * not shown in the application
 * *
 * * @package easyview report
 * * @copyright 2014 UC Regents
 * * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v2
 * */

Ext.define('easyview.store.ItemsCurrent', {
	extend: 'Ext.data.Store',
	model: 'easyview.model.Items',
	//pageSize:10,
        autoLoad: true,
        autoSync: true,
        proxy: {
                type: 'rest',
                url: 'items_json.php',
                reader: {
                        type: 'json',
                        rootProperty: 'items',
                        successProperty: 'success',
            		totalProperty: 'total'
                }
        },
        sorters: [{
                property: 'last',
                direction: 'ASC'
        }]
});
