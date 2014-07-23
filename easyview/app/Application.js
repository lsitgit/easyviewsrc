/**
 * * Easyview app  file - main application class
 * * holds timed functions
 * *
 * * @package easyview report
 * * @copyright 2014 UC Regents
 * * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v2
 * */

/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 /*/

Ext.define('easyview.Application', {
	extend: 'Ext.app.Application',
    	name: 'easyview',

    	views: ['main.Main','main.EasyviewGrid'],
    	controllers: ['Root'],
	models:['Items','Combo','Others','Dataload'],
	stores:['Items','Groups','Categories','ItemsCurrent','Others','Dataload'], 
    
	requires:['Ext.data.proxy.Rest',
		'Ext.grid.feature.Summary',
		'Ext.grid.column.Action',
		'Ext.form.field.ComboBox',
		'Ext.form.field.TextArea',
		'easyview.plugins.printer.Printer'
	],

	launch: function () {
		if (Ext.isSafari && Ext.safariVersion == 7) {
    			// Override button to fix tooltip issue on Safari 
         		delete Ext.tip.Tip.prototype.minWidth;
         	}  
		STOP_CHECK_DATA =HIDE_GRADEBOOK_ACCESS;
		STOP_CHECK_OTHERS=HIDE_GRADEBOOK_ACCESS;
		var info_text = Ext.ComponentQuery.query('#info_text')[0];
		info_text.addCls('my_info_text');
		Ext.TaskManager.start({
			run:this.check_store_equality,
			interval: CHECK_DATA*1000,
			scope:this
		});
		Ext.TaskManager.start({
			run:this.check_others,
			interval: CHECK_ACCESS*1000,
			scope:this
		});
	},
	check_others: function(){
		if(STOP_CHECK_OTHERS==0){
			//console.log("checking others");
			var others_store = Ext.data.StoreManager.lookup('Others');	
			others_store.reload();
			if(!(typeof others_store.proxy.reader.rawData === 'undefined')){
				var others_array = others_store.proxy.reader.rawData.others;
				var info_text = Ext.ComponentQuery.query('#info_text')[0];
				/*if(others_array.length==0){
					info_text.hide();
				}else{
					info_text.show();
				}*/
				var build_string = "Recent gradebook access:\n";
				for (var i=0; i<others_array.length;i++){
					build_string = build_string.concat(others_array[i].firstname," ",others_array[i].lastname,": ",others_array[i].module,'\n');	
				}
				info_text.setValue(build_string);
			}
		}
	},
	check_store_equality: function(){
		if(STOP_CHECK_DATA==0){
		//console.log("checking equality");
		///////////DATALOAD CODE//////////////
		var dataload_store = Ext.data.StoreManager.lookup('Dataload');
		var reload_data_button = Ext.ComponentQuery.query('#reload_data')[0];
		dataload_store.reload();
		if(!(typeof dataload_store.proxy.reader.rawData === 'undefined')){
			dataload_data = dataload_store.proxy.reader.rawData.dataload;
			build_string = "";
			if(dataload_data.length!=0){
				//console.log(dataload_data);
				if(RELOAD_WARNING==0){
	                        	Ext.create('Ext.tip.ToolTip', {
                                		closable:true,
                                		hideDelay : 4000,
                                		padding: '0 0 0 0',
                                		maxWidth:400,
                                		width:800,
                                		html: "<b>"+dataload_data.length+" grade item(s) have changed, you may want click the \"reload data\" button to refresh the gradebook scores</b>"
        				}).showAt(reload_data_button.getLocalXY());
                        		RELOAD_WARNING=1;
                        		reload_data_button.enable();
				}
				for(var i=0; i<dataload_data.length; i++){	
					build_string = build_string.concat("<strong>"+dataload_data[i].firstname," ",dataload_data[i].lastname,"</strong>: ",dataload_data[i].itemname+"-"+dataload_data[i].finalgrade+'<br>');	
				}
				reload_data_button.setTooltip(build_string);
			}else{
				reload_data_button.disable();
			}
		}		
		}
				/////////////////////////////////////
				/*
		if(RELOAD_WARNING==0){
			console.log("checking gradebook");
			var different_store_flag = false;
			var reload_data_button = Ext.ComponentQuery.query('#reload_data')[0];
			//get most up to date data by reloading the UsersCurrent store
			var item_current_store = Ext.data.StoreManager.lookup('ItemsCurrent');
			item_current_store.reload();
			//get item data that is displayed in the application
			var item_store = Ext.data.StoreManager.lookup('Items');
			if(!((typeof item_current_store.proxy.reader.rawData === 'undefined') && (typeof item_store.proxy.reader.rawData === 'undefined'))){
				//getting the raw data from the readers allows us to ignore any filters/sorting
				var item_store_data = item_store.proxy.reader.rawData.items;
				var item_current_store_data = item_current_store.proxy.reader.rawData.items;
				for (var i=0; i < item_store_data.length; ++i){
					//stringify function turns objects into json-type strings and allows for easy comparison of dynamic objects
					//we  are specifying which rows we want out of the data store to compare
					//this is so we can ignore the assigned id which is different in both stores 
					////use print_r(item_current_store_data[i]); to see what I am talking about
					//MODEL_FIELDS variable is defined in indexLoad.js, it has all the field names in the model
					if (JSON.stringify(item_current_store_data[i],MODEL_FIELDS) != JSON.stringify(item_store_data[i],MODEL_FIELDS)){
						different_store_flag = true;
					}
				}	
			}
			if(different_store_flag){ 
				Ext.create('Ext.tip.ToolTip', {
            				closable:true,
            				hideDelay : 3000,
            				padding: '0 0 0 0',
            				maxWidth:400,
            				width:800,
            				html: "<b>Your data is out of date, use the reload button here to refresh the data</b>"
        			}).showAt(reload_data_button.getLocalXY());
				RELOAD_WARNING=1;
				reload_data_button.enable();
			}else{
				reload_data_button.disable();
			}
		}
	*/}

});
