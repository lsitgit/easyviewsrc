/**
 * * Easyview  file - describes grid, specifically does all logic for the column header drop downs
 *  usually column descriptions would be in this file but since they are generated dynamically, they are in indexLoad.js
 * *
 * * @package easyview report
 * * @copyright 2014 UC Regents
 * * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v2
 * */


Ext.define('easyview.view.main.EasyviewGrid', {
    	extend: 'Ext.grid.Panel',
	alias:'widget.easyviewgrid',
	id:'easyviewgrid',
	
	features: AVERAGES_PARAM,
	
        store: 'Items',
        columns: COLUMNS, //defined in indexLoad.js
	region:'center',
	enableColumnMove:false,
	listeners:{
		//this function sorts out the header menus for the grid
        	afterrender: function(grid) {
                	var icons = Ext.dom.Element.select('.header-icon').elements;
            		Ext.each(icons, function (icon) {
				if(icon){
					Ext.get(icon).swallowEvent('click', true);
					Ext.get(icon).addListener('click',function(icon){
                                        	var url = WROOT+"/grade/report/quick_edit/index.php?id="
							+COURSEIDPASSEDIN+"&item=grade&group=&itemid="
							+icon.target.id.substring(1);
                                        	var win = window.open(url, 'easygradeuserreport');
                                        	win.focus();
					});
				}
			});
			
			//the following code is very repetative due to the grid being split and the active header being specific to one side
			////im sure this code could be fixed up though
			//note: ,maybe grabbing the active header from #easyviewgrid instead of its subcomponents, forget if I tried that yet	
			//these menu items are added to all unlocked headers and hidden/shown on the fly in the beforeShow functions below
			var new_unlocked_menu_items = [{
                        	text:"grade item"//this is a stub which will be filled with the grade item name later on
                     	},{
                        	text: 'Edit Grade With Quick Edit',
                                icon: 'resources/manual_item.svg',
                                handler: function() {
                                	var gradeid = unlocked_grid_header_menu.activeHeader.dataIndex;
					// the substring(1) is a hack to strip the character that prefixes the id number for trying to get printing to work
                                        var url = WROOT+"/grade/report/quick_edit/index.php?id="+COURSEIDPASSEDIN+"&item=grade&group=&itemid="+gradeid.substring(1);
                                        var win = window.open(url, 'easygradeuserreport');
                                        win.focus();
                           	}
                    	},{
                        	text:"Histogram (full class)",
                                icon: 'resources/scales.gif',
                                handler: function() {
                                	var gradeid = unlocked_grid_header_menu.activeHeader.dataIndex;
                                        var url = WROOT+"/grade/report/easyview/histogram/?view=wide&id="+gradeid.substring(1);
                                        var win = window.open(url, 'easygradeuserreport');
                                        win.focus();
                           	}
                  	}];
			//these menu items are added to all locked headers and hidden/shown on the fly in the beforeShow functions below
			var new_locked_menu_items = [{
                        	text:"grade item"//this is a stub which will be filled with the grade item name later on
                     	},{
                        	text: 'Edit Grade With Quick Edit',
                                icon: 'resources/manual_item.svg',
                                handler: function() {
                                	var gradeid = locked_grid_header_menu.activeHeader.dataIndex;
					// the substring(1) is a hack to strip the character that prefixes the id number for trying to get printing to work
                                        var url = WROOT+"/grade/report/quick_edit/index.php?id="+COURSEIDPASSEDIN+"&item=grade&group=&itemid="+gradeid.substring(1);
                                        var win = window.open(url, 'easygradeuserreport');
                                        win.focus();
                           	}
                    	},{
                        	text:"Histogram (full class)",
                                icon: 'resources/scales.gif',
                                handler: function() {
                                	var gradeid = locked_grid_header_menu.activeHeader.dataIndex;
                                        var url = WROOT+"/grade/report/easyview/histogram/?view=wide&id="+gradeid.substring(1);
                                        var win = window.open(url, 'easygradeuserreport');
                                        win.focus();
                           	}
                  	}];
			var textfield = 0;
			var quickedit = 1;
			var histogram = 2;

			//for some reason I couldn't get the two sides of the grids to work with one function
			//thus this repetative mess. 
			//I think part of it is when I get the activeHeader item, comes across as null if I'm looking at the wrong grid
			//first we deal with the unlocked portion of the grid
                	var unlocked_grid_header_menu = Ext.ComponentQuery.query('grid')[1].headerCt.getMenu();//finding the unlocked portion of the grid
                        var unlocked_menu_item = unlocked_grid_header_menu.add(new_unlocked_menu_items);//adding the menu items to the headers in that part of the grid
                   	unlocked_grid_header_menu.on('beforeShow',function(){
                        	var colId = unlocked_grid_header_menu.activeHeader.itemId;//get the itemId (id for the column which indicates the type of row it is)
                                if(colId.indexOf('manual')==0){///case if manual grade item
                                	if(TEXT_PARAM==1){unlocked_menu_item[textfield].show();}
					else{unlocked_menu_item[textfield].hide();}

					if(QUICKEDIT_PARAM==1){unlocked_menu_item[quickedit].show();}
					else{unlocked_menu_item[quickedit].hide();}

					if(HISTOGRAM_PARAM==1){unlocked_menu_item[histogram].show();}
					else{unlocked_menu_item[histogram].hide();}
                            	}else if(colId.indexOf('category')==0||colId.indexOf('mod')==0){//case if category or module item
                                	if(TEXT_PARAM==1){unlocked_menu_item[textfield].show();}
					else{unlocked_menu_item[textfield].hide();}

                                	unlocked_menu_item[quickedit].hide();

					if(HISTOGRAM_PARAM==1){unlocked_menu_item[histogram].show();}
					else{unlocked_menu_item[histogram].hide();}
                                }else{//all others (meant for the "info" columns such as name,perm,email
                                	unlocked_menu_item[textfield].hide();
                                	unlocked_menu_item[quickedit].hide();
                                	unlocked_menu_item[histogram].hide();
				}
					
                                unlocked_menu_item[textfield].setText(unlocked_grid_header_menu.activeHeader.tooltip);
                   	});

			//now we deal with the locked portion of the grid
                        var locked_grid_header_menu = Ext.ComponentQuery.query('grid')[0].headerCt.getMenu();//finding the locked portion of the grid
                        var locked_menu_item = locked_grid_header_menu.add(new_locked_menu_items);//adding the menu items to the headers in that part of the grid
                        locked_grid_header_menu.on('beforeShow',function(){
                        	var colId = locked_grid_header_menu.activeHeader.itemId;//get the itemId (id for the column which indicates the type of row it is)
                                if(colId.indexOf('manual')==0){//case if manual grade item
                                	if(TEXT_PARAM==1){locked_menu_item[textfield].show();}
					else{locked_menu_item[textfield].hide();}

					if(QUICKEDIT_PARAM==1){locked_menu_item[quickedit].show();}
					else{locked_menu_item[quickedit].hide();}

					if(HISTOGRAM_PARAM==1){locked_menu_item[histogram].show();}
					else{locked_menu_item[histogram].hide();}
                            	}else if(colId.indexOf('category')==0||colId.indexOf('mod')==0){//case if category or module item
                                	if(TEXT_PARAM==1){locked_menu_item[textfield].show();}
					else{locked_menu_item[textfield].hide();}

                                	locked_menu_item[quickedit].hide();
	
					if(HISTOGRAM_PARAM==1){locked_menu_item[histogram].show();}
					else{locked_menu_item[histogram].hide();}
                                }else{//all other cases (meant for the "info" columns such as name,perm, email
                                	locked_menu_item[textfield].hide();
                                	locked_menu_item[quickedit].hide();
                                	locked_menu_item[histogram].hide();
				}
                                locked_menu_item[textfield].setText(locked_grid_header_menu.activeHeader.tooltip);
                        });
        	}
	}
});
