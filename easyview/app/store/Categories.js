/**
 * * Easyview store file - used to move data to populate grade item categories drop down
 * *
 * * @package easyview report
 * * @copyright 2014 UC Regents
 * * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v2
 * */

Ext.define('easyview.store.Categories', {
	extend: 'Ext.data.Store',
	model: 'easyview.model.Combo',
	autoLoad: true,
        autoSync: true,
        purgePageCount: 0,
        proxy: {
                type: 'rest',
                url: 'categories_json.php',
                reader: {
                        type: 'json',
                        rootProperty: 'categories',
                        successProperty: 'success'
                }
        }
});
