/**
 * * Easyview - main application controller
 * * does dropdown and filter logic
 * *
 * * @package easyview report
 * * @copyright 2014 UC Regents
 * * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v2
 * */

/**
 * The main application controller. This is a good place to handle things like routes.
 */
Ext.define('easyview.controller.Root', {
    extend: 'Ext.app.Controller',
        init: function(){
                this.control({
                        '#group_filter_select'                  :       {select:this.groupcomboselect},
                        '#category_filter_select'               :       {select:this.categorycomboselect},
			'button[action=details]'		: 	{click: this.details},
			'button[action=totals]'			: 	{click: this.totals},
			'button[action=reload_data]'		: 	{click: this.reload_data},
			'button[action=gradebook_access]'	: 	{click: this.gradebook_access}
                });
        },
     	reload_data:function(button){
		var items_store = Ext.data.StoreManager.lookup('Items');
		items_store.reload();
		var item_current_store = Ext.data.StoreManager.lookup('ItemsCurrent');
		item_current_store.reload();
		var dataload_store = Ext.data.StoreManager.lookup('Dataload');
		dataload_store.reload();
		RELOAD_WARNING =0;
                var reload_data_button = Ext.ComponentQuery.query('#reload_data')[0];
		reload_data_button.disable();
		reload_data_button.setTooltip("No Grades Have Been Modified");
	},
     	totals:function(button){
        	var grid = Ext.getCmp('easyviewgrid');
                var set_visible = false;
                var set_text= "Show Category Totals";
                if(button.getText()=="Show Category Totals"){
                	set_visible = true;
                        set_text="Hide Category Totals";
               	}
             	Ext.suspendLayouts();
		for (var i=0; i<grid.columns.length;i++){
                	if(grid.columns[i].itemId.indexOf('category')>-1){
                        	grid.columns[i].setVisible(set_visible);
                         }
             	}
           	Ext.resumeLayouts(true);
                button.setText(set_text);
     	},
	gradebook_access:function(button){
                var reload_data_button = Ext.ComponentQuery.query('#reload_data')[0];
                var info_text = Ext.ComponentQuery.query('#info_text')[0];
		var set_text= "Show Gradebook Access";
		if(button.getText()=="Show Gradebook Access"){
			set_text="Hide Gradebook Access";	
			reload_data_button.show();
			info_text.show();
			RELOAD_WARNING = 0;
			STOP_CHECK_DATA=0;
			STOP_CHECK_OTHERS=0;
		}else{
			reload_data_button.hide();
			info_text.hide();
			RELOAD_WARNING=1;
			STOP_CHECK_OTHERS=1;
			STOP_CHECK_DATA=1;
		}
		button.setText(set_text);
	},
	details:function(button){
		var grid = Ext.getCmp('easyviewgrid');
		var set_visible = false;
		var set_text= "Show Student Details";
                if(button.getText()=="Show Student Details"){
                        set_visible = true;
                        set_text="Hide Student Details";
                }
                Ext.suspendLayouts();
                grid.columns[1].setVisible(set_visible);
                grid.columns[2].setVisible(set_visible);
                grid.columns[3].setVisible(set_visible);
                Ext.resumeLayouts(true);
                button.setText(set_text);

	},
	groupcomboselect:function(combo,record,index){
		var items = Ext.data.StoreManager.lookup('Items');
		var selected = record[0].data.name;
		items.clearFilter(true);
		Ext.ComponentQuery.query('#info1')[0].down('textfield').setValue("");
		if(selected=="all groups"){
			selected=""; 
		}
		items.filter({
			filterFn: function(item){
				var group = item.data.group;
				return group.indexOf(selected)>-1;//checks if the row's group is in the selected group
			}
		});
	},
	categorycomboselect:function(combo,record,index){
		Ext.suspendLayouts();
		var grid = Ext.ComponentQuery.query('#easyviewgrid')[0];
		var selected_category = record[0].data.name.replace(/["'()%\[\]{}\\=+\s&#@\^,\.!\$\*-]/g,'');
		if(selected_category!='Allgradeitems'){//if the user selected something other than all grade items
			for (var i=0; i<grid.columns.length;i++){
				if(grid.columns[i].itemId.indexOf(selected_category)>-1){
					//show if it matches the selected category
					grid.columns[i].setVisible(true);
				}else if(!((grid.columns[i].itemId.indexOf('info')>-1)||(grid.columns[i].itemId.indexOf('category')>-1))){
					//else hide, unless its an info or category total column
					grid.columns[i].setVisible(false);
				}
			}
		}else{
			for (var i=0; i<grid.columns.length;i++){
				if(!((grid.columns[i].itemId.indexOf('info')>-1)||(grid.columns[i].itemId.indexOf('category')>-1))){
					grid.columns[i].setVisible(true);
				}
			}
		}
		Ext.resumeLayouts(true);
	}
});
