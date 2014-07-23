/**
 * * Easyview store file - used to move data to populate group drop down
 * *
 * * @package easyview report
 * * @copyright 2014 UC Regents
 * * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v2
 * */

Ext.define('easyview.store.Groups', {
	extend: 'Ext.data.Store',
	model: 'easyview.model.Combo',
	autoLoad: true,
        autoSync: true,
        purgePageCount: 0,
        proxy: {
                type: 'rest',
                url: 'groups_json.php',
                reader: {
                        type: 'json',
                        rootProperty: 'groups',
                        successProperty: 'success'
                }
        }
});
