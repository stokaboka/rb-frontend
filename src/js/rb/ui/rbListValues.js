/**
 * Created by stokaboka on 12.08.2016.
 */

import $RbDataSource from '../core/rbDataSource';
import $RbBuilderInfo from '../core/rbBuilderInfo';
import $RbBinding from '../core/rbBinding';

let $RbListValues = function ( options )
{
    const self = this;

    Object.assign(
        self,
        {
	        id: 'listvalues',
	        datasource: '',
	        database_engine: '',
	        database: '',
	        table: '',
	        title: '',
	        columns: '',
	        orderby: '',
	        binding: null
        },
	    options
    );

	self.type = "listvalues";

	self.title = self.title ? self.title : 'Список значений '+self.table;

    self.binding = new $RbBinding().init( self.binding );

    if(!self.datasource) {
        if (!self.database) {
            if(self.model) {
	            self.model.$log.error('LISTVALUES: expected "database" property');
            }
        }
        if (!self.table) {
	        if(self.model) {
		        self.model.$log.error('LISTVALUES: expected "table" property');
	        }
        }
        if (self.binding.length === 0) {
	        if(self.model) {
		        self.model.$log.error('LISTVALUES: Data Binding is not defined: expected "binding" property or empty binding');
	        }
        }
    }

    self.saveDataSourceParameters = {
        filter_enabled: false,
        order_enabled: false,
        insert_enabled: false,
        update_enabled: false,
        delete_enabled: false,
        report_enabled: false,
        history_enabled: false
    };

	self.builder_info = new $RbBuilderInfo();

    return self;
};

$RbListValues.prototype.initColumn = function(__column)
{
	const self = this;
	self.binding.initColumn(__column);
};

$RbListValues.prototype.getDescription = function() {
	const self = this;
	let ___out = [4];
	___out[0] = self.id;
	___out[1] = self.title;
	___out[2] = self.table;
	___out[3] = self.binding.getDescription();
    return ___out.join(', ')
};

$RbListValues.prototype.toJSONimage = function()
{
    const self = this;
    let __keys = ['id', 'datasource', 'title', 'database', 'database_engine', 'table', 'columns', 'orderby', 'binding'];
    let ___out = {};
    _.each(__keys, function (__key) {
        if (self[__key]) {

            switch (__key) {
                case 'binding':
                    ___out[__key] = self[__key].toJSONimage();
                    break;
                default :
                    ___out[__key] = self[__key];
            }
        }
    });
    return ___out;
};

let $RbListValuesModel = function ( options )
{
    const self = this;

    self.model = options;

    self.ds = new $RbDataSource({id: 'listvalues'});

    self.binding = null;
    self.search_mask = '';
    self.visible = false;

    self.class = [
        "listvalues"
        //"box-shadow"
        //"lifted"
    ];
    self.style = {
        "top": "20px",
        "left": "50px",
        //"left": "50%",
        //"margin-left": "-250px",
        "position": "absolute",
        "z-index": 1500
    };
};

$RbListValuesModel.prototype.init = function (___listvalues_column, ___event)
{
    const self = this;

    if(typeof ___listvalues_column === 'string'){
        ___listvalues_column = JSON.parse(___listvalues_column);
    }

    if(___listvalues_column.listvalues.datasource){
        self.ds = self.model.get_registered_service(___listvalues_column.listvalues.datasource);
        if(!self.ds){
            self.model.$log.error("$RbListValuesModel: datasource ["+___listvalues_column.listvalues.datasource+"] not found");
        }
    }else {
        self.ds.init(___listvalues_column.listvalues);
    }

    self.binding = new $RbBinding().init(___listvalues_column.listvalues.binding);

    self.search_mask = '';
};

$RbListValuesModel.prototype.reset = function ()
{
    const self = this;

    //self.ds.reset();

    self.binding = null;
    self.search_mask = '';
};

//search_mask_change
$RbListValuesModel.prototype.search = function (__mask)
{
    const self = this;
    if(!__mask){
        __mask = '';
    }
    if(self.ds) {
        self.ds.search_mask = __mask;

        if( self.ds.search_mask ){
	        if (self.ds.search_mask.length > 2) {
		        self.ds.search_mask = "%" + self.ds.search_mask + "%";
		        self.model.load(self.ds, {page: false, force: true});
	        }
        }else{
	        self.ds.search_mask = '';
	        self.model.load(self.ds, {page: false, force: true});
        }

    }
};

//show_listvalues
$RbListValuesModel.prototype.show = function ()
{
    const self = this;
    self.search_mask = '%';
    self.ds.search_mask = self.search_mask;
    self.model.load(self.ds, {page: false, force: true});
    self.visible = true;

    self.saveDataSourceParameters = {
        filter_enabled: self.ds.filter_enabled,
        order_enabled: self.ds.order_enabled,
        insert_enabled: self.ds.insert_enabled,
        update_enabled: self.ds.update_enabled,
        delete_enabled: self.ds.delete_enabled,
        report_enabled: self.ds.report_enabled,
        history_enabled: self.ds.history_enabled
    };

   self.ds.filter_enabled = false;
   //self.ds.order_enabled,
   self.ds.insert_enabled = false;
   self.ds.update_enabled = false;
   self.ds.delete_enabled  = false;
   self.ds.report_enabled  = false;
    self.ds.history_enabled  = false;

};

//hide_listvalues
$RbListValuesModel.prototype.hide = function ()
{
    const self = this;
    self.reset();
    self.visible = false;

    self.ds.filter_enabled = self.saveDataSourceParameters.filter_enabled;
    self.ds.order_enabled = self.saveDataSourceParameters.order_enabled;
    self.ds.insert_enabled  = self.saveDataSourceParameters.insert_enabled;
    self.ds.update_enabled  = self.saveDataSourceParameters.update_enabled;
    self.ds.delete_enabled   = self.saveDataSourceParameters.delete_enabled;
    self.ds.report_enabled  = self.saveDataSourceParameters.report_enabled;
    self.ds.history_enabled  = self.saveDataSourceParameters.history_enabled;
};

$RbListValuesModel.prototype.bind = function()
{
    const self = this;
    if(0 <= self.ds.current_row && self.ds.current_row <  self.ds.dataset.length){
        let __source_row = self.ds.getCurrentRow();
        if(__source_row) {
            let __binding_result = self.binding.bind(__source_row, self.model.transaction.data);
            if (__binding_result) {
                self.class = 'bg-success';
            } else {
                self.class = 'bg-danger';
            }
        }else{
            self.class = 'bg-danger';
        }
    }
    self.hide();
};

$RbListValuesModel.prototype.add = function () {
	const self = this;
	self.binding.add();
};

$RbListValuesModel.prototype.release = function () {
	const self = this;
	self.binding.release();
};

export { $RbListValues, $RbListValuesModel };