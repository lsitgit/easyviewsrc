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

    	views: ['main.Main','main.EasyviewGrid','main.CategoryWindow','main.GradeGradeForm'],
    	controllers: ['Root'],
	models:['Items','Combo','Others','Dataload','Gradegrade'],
	stores:['Items','Groups','Categories','Others','Dataload','Gradegrade'], 
    
	requires:['Ext.data.proxy.Rest',
		'Ext.grid.feature.Summary',
		'Ext.window.Toast',
		'Ext.grid.column.Action',
		'Ext.form.field.ComboBox',
		'Ext.form.field.TextArea',
		'easyview.plugins.printer.Printer',
		'Ext.window.Window',
		'Ext.form.CheckboxGroup',
		'Ext.form.Panel'
	],

	launch: function () {
		if (Ext.isSafari && Ext.safariVersion == 7) {
    			// Override button to fix tooltip issue on Safari 
         		delete Ext.tip.Tip.prototype.minWidth;
         	}  
		STOP_CHECK_DATA = !DEFAULT_CHECK_GRADES_AND_OTHERS;
		STOP_CHECK_OTHERS = !DEFAULT_CHECK_GRADES_AND_OTHERS;
		if(ENABLE_CHECK_GRADES){
			Ext.TaskManager.start({
				run:this.check_store_equality,
				interval: CHECK_GRADES_TIME*1000,
				scope:this
			});
		}
		if(ENABLE_CHECK_OTHERS){
			Ext.TaskManager.start({
				run:this.check_others,
				interval: CHECK_OTHERS_TIME*1000,
				scope:this
			});
		}
	},
	check_others: function(){
		if(STOP_CHECK_OTHERS==0){
			//console.log("checking others");
			var others_store = Ext.data.StoreManager.lookup('Others');	
			others_store.reload();
			if(!(typeof others_store.proxy.reader.rawData === 'undefined')){
				var others_array = others_store.proxy.reader.rawData.others;
				var info_text = Ext.ComponentQuery.query('#info_text')[0];
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
					if(RELOAD_WARNING==0){
	                	        	Ext.create('Ext.tip.ToolTip', {
                                			closable:true,
                                			hideDelay : 4000,
                                			padding: '0 0 0 0',
	                                		maxWidth:400,
        	                        		width:800,
                	                		html: "<b>"+dataload_data.length+" grade item(s) have changed, you may want to "
								+"click the \"reload data\" button to refresh the gradebook scores</b>"
        					}).showAt(reload_data_button.getLocalXY());
                        			RELOAD_WARNING=1;
                        			reload_data_button.enable();
					}
					for(var i=0; i<dataload_data.length; i++){	
						build_string = build_string.concat("<strong>"+dataload_data[i].firstname," ",dataload_data[i].lastname,"</strong>: ",dataload_data[i].itemname+": "+dataload_data[i].finalgrade+'<br>');	
					}
					reload_data_button.setTooltip(build_string);
				}else{
					reload_data_button.disable();
				}
			}		
		}
	}
});
