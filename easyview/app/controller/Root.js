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
            '#group_filter_select'              : {select:this.groupcomboselect},
            '#navigation_combo'                 : {select:this.navigation_combo_select},
            '#easyviewgrid' 	             	: {celldblclick:this.grid_cell_click},
            //'#category_filter_select'           : {blur:this.categorycomboselect},
            '#category_filter_select'           : {select:this.categorycomboselect},
//           '#category_filter_select'            : {select:this.categorycomboselecttoast},
            'button[action=details]'		    : {click: this.details},
            'button[action=totals]'			    : {click: this.totals},
            'button[action=reload_data]'		: {click: this.reload_data},
            'button[action=gradebook_access]'	: {click: this.gradebook_access},
            //'button[action=category_multifilter]'	: 	{click: this.category_multifilter},
            //'button[action=submit_multifilter]'	: 	{click: this.submit_multifilter},
            //'button[action=close_window]'		: 	{click: this.close_window}
        });
    },
	navigation_combo_select:function(combo,record,index){
		var selected = record[0].data.field1;	
		switch(selected){
			case 'Original Grader Report':
				window.location = WROOT+'/grade/report/grader/index.php?id='+COURSEIDPASSEDIN;
				break;
			case 'Categories and Items':	
				window.location = WROOT+'/grade/edit/tree/index.php?showadvanced=0&id='+COURSEIDPASSEDIN;
				break;
			case 'Import':
				window.location = WROOT+'/grade/import/csv/index.php?id='+COURSEIDPASSEDIN;
				break;
			case 'Export':
				window.location = WROOT+'/grade/export/egrade/index.php?id='+COURSEIDPASSEDIN;
				break;
			case 'Quick Edit':
				window.location = WROOT+'/grade/report/singleview/index.php?id='+COURSEIDPASSEDIN;
				break;
			case 'User Report':
				window.location = WROOT+'/grade/report/user/index.php?id='+COURSEIDPASSEDIN;
				break;
		}
	},
	grid_cell_click:function(grid,td,cellIndex,record,tr,rowIndex,e,e0pts){
		var row = grid.getStore().getAt(rowIndex);
		var column = grid.grid.columns[cellIndex];
		var ggid = row.get((column.dataIndex).substr(1)+"ggid"); // NOTE: it is better to send userid + grade_item.id
        var gid = column.dataIndex.substr(1); // grade_items.id
//        console.log('gid = ' + gid);
        console.log('ggid = ' + ggid);
//        console.log('rowIndex = ' + rowIndex);
//        console.log('cellIndex = ' + cellIndex);
//        console.log('RECORD: ');
//        console.log(record);
//        console.log('row: ');      
//        console.log(row);
//        console.log('userid = ' + row.data.userid);
//        console.log('column: ');
//        console.log(column);

		var gradegrade_store = Ext.data.StoreManager.lookup('Gradegrade');
		if(!(typeof ggid === 'undefined')){
            var edit_window = Ext.widget('gradeEditWindow', { title: 'Grade Item Editor for '+column.text.replace(/<img[^>]*>/g,"")});
			edit_window.show();
            // param needs to be grade_item.id & user.id
			gradegrade_store.load({
                    params: {
                        'ggid': ggid,
                        'gid' : gid,
                        'uid' : row.data.userid
                    },
    				callback: function(records, operation, success) {
                        var gfrm = Ext.ComponentQuery.query('gradeEditForm');
					    gfrm[0].getForm().loadRecord(records[0]);
				    }
			 });
            //console.log('gradegrade_store.data: ');
            //console.log(gradegrade_store.data);	

			var form = edit_window.down('gradeEditForm');
            form.data = gradegrade_store.data;
           
		}// if ggid is undefined
	},
	/*//used for category multifilter
	submit_multifilter:function(button){
		var checkboxgroup = button.up('window').down('checkboxgroup');
		CATEGORY_STATUS=[];
		var category_string = "";
		checkboxgroup.items.items.forEach(function(box){//updating global category status
			CATEGORY_STATUS.push({'name':box.boxLabel,'visible':box.checked});
		});
		Ext.suspendLayouts();
		var grid = Ext.ComponentQuery.query('#easyviewgrid')[0];
           	for (var i=0; i<grid.columns.length;i++){//cycling through all columns, determining if each should be visible or not, given new CATEGORY_STATUS
			var show_this_one = false;
			CATEGORY_STATUS.forEach(function(category){//find the current column's category in the CATEGORY_STATUS ARRAY
				//once the category is found in the array, see if it is marked as visible
				//console.log(grid.columns[i].itemId);
				if ((category.visible==true)&&(grid.columns[i].itemId.indexOf(category.name.replace(/["'()%\[\]{}\\=+\s&#@\^,\.!\$\*-]/g,''))>-1)){
					show_this_one = true;	
					return;
				}	
			});
                	if(show_this_one){
                                grid.columns[i].setVisible(true);
                     	}else if(!((grid.columns[i].itemId.indexOf('info')>-1)||(grid.columns[i].itemId.indexOf('category')>-1))){
                        	//else hide, unless its an info or category total column
                                grid.columns[i].setVisible(false);
                     	}
             	}
		Ext.resumeLayouts(true);
		Ext.WindowManager.each(function(cmp) { cmp.destroy(); });
	},*/
	/*//used for category multifilter
	close_window:function(){
		Ext.WindowManager.each(function(cmp) { cmp.destroy(); });
	},*/
	/*//used for category multifilter
	category_multifilter:function(button){
		var checkboxconfigs=[];
		//loop below sets up the checkboxes to mirror current category status
		CATEGORY_STATUS.forEach(function(record){
			if(record.name!=""){
				checkboxconfigs.push({
					id: record.name.replace(/["'()%\[\]{}\\=+\s&#@\^,\.!\$\*-]/g,''),
					boxLabel:record.name,
					checked:record.visible
				});
			}
		});
		Ext.WindowManager.each(function(cmp) { cmp.destroy(); });
		var category_window = new easyview.view.main.CategoryWindow();
		category_window.show();
		Ext.create('Ext.window.Window',{
			title:'Custom Category Filter',
			height:400,
			width:400,
			layout:'border',
    			autoScroll: true,
    			bodyPadding: 10,
    			constrain: true,
			items:[{
				xtype:'checkboxgroup',
				columns:2,
				items:checkboxconfigs,
				region:'center',
				width:'100%',
			},{
				xtype:'container',
				layout:'hbox',
				region:'south',
				height:40,
				width:'100%',
				items:[{
					xtype:'button',
					text:'Submit',
					height:'100%',
					width:'50%',
					action:'submit_multifilter'
				},{
					xtype:'button',
					text:'Cancel',
					height:'100%',
					width:'50%',
					action:'close_window'
				}]
			}]
		}).show();	
	},*/
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
		var gradebook_access_panel = Ext.ComponentQuery.query('#gradebook_access_panel')[0];
		var set_text= "Show Gradebook Access";
		if(button.getText()=="Show Gradebook Access"){
			set_text="Hide Gradebook Access";	
			//reload_data_button.show();
			//info_text.show();
			gradebook_access_panel.show();
			RELOAD_WARNING = 0;
			STOP_CHECK_DATA=0;
			STOP_CHECK_OTHERS=0;
		}else{
			//reload_data_button.hide();
			//info_text.hide();
			gradebook_access_panel.hide();
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
	
		//var category_length = CATEGORY_STATUS.length;
	
		if(selected_category!='Allgradeitems'){//if the user selected something other than all grade items
			/*//this was for experimenting with filtering with multiple categories
			////////
			for(var i=0;i<category_length;i++){
				if(CATEGORY_STATUS[i].name == record[0].data.name){
					CATEGORY_STATUS[i].visible = true;	
				}else{
					CATEGORY_STATUS[i].visible = false;	
				}
			}
			///////////
			*/
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
			/*//this was for experimenting with filtering with multiple categories
			////////
			for(var i=0;i<category_length;i++){
				CATEGORY_STATUS[i].visible = true;	
			}
			/////////
			*/
			for (var i=0; i<grid.columns.length;i++){
				if(!((grid.columns[i].itemId.indexOf('info')>-1)||(grid.columns[i].itemId.indexOf('category')>-1))){
					grid.columns[i].setVisible(true);
				}
			}
		}
		Ext.resumeLayouts(true);
	},
	/*//this was for experimenting with filtering with multiple categories
	categorycomboselect:function(The,e0pts){
		console.log("in cat select function");
		var box = Ext.ComponentQuery.query('#category_filter_select')[0];
		var records = box.getSubmitValue();
		console.log(records);
		Ext.suspendLayouts();
		//records.forEach(function(record){//find the current column's category in the CATEGORY_STATUS ARRAY
		for(var j=0;j<records.length;j++){
			console.log("looking at "+records[j]+" and j = "+j);
			var grid = Ext.ComponentQuery.query('#easyviewgrid')[0];
			var selected_category = records[j].replace(/["'()%\[\]{}\\=+\s&#@\^,\.!\$\*-]/g,'');
	
			var category_length = CATEGORY_STATUS.length;
	
			if(selected_category!='Allgradeitems'){//if the user selected something other than all grade items
				for (var i=0; i<grid.columns.length;i++){
					//console.log("comparing "+grid.columns[i].itemId+" and "+selected_category);
					if(grid.columns[i].itemId.indexOf(selected_category)>-1){
						//show if it matches the selected category
						console.log("showing "+grid.columns[i].itemId);
						grid.columns[i].setVisible(true);
					}else if((!((grid.columns[i].itemId.indexOf('info')>-1)||(grid.columns[i].itemId.indexOf('category')>-1)))&&j==0){
						//else hide, unless its an info or category total column
						console.log("hiding "+grid.columns[i].itemId);
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
		}
		Ext.resumeLayouts(true);
	}*/
});
