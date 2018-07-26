/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

/**
 * Created by stokaboka on 12.08.2016.
 */

"use strict";

import $RbColumnFilter from './rbColumnFilter';
import $RbColumnOrder from './rbColumnOrder';
import $RbDataMap from './rbDataMap';
import { $RbSequence } from './rbSequence';
import $RbComboBox from '../ui/rbComboBox';
import { $RbListValues } from '../ui/rbListValues';
import $RbDisplayGadget from '../ui/rbDisplayGadget';

import $RbList from '../ui/rbList';

let $RbColumn = function (__column, __builder) {
    const self = this;

    self.type = "column";

	self.datasource = null;
	self.link_datasource = null;
	self.identifier = null;

	self.list = null;
    self.combobox = null;
    self.listvalues = null;
    self.sequence = null;
    self.gadget = null;
    self.data_map = null;

	self.builder = !!__builder;

    self.title = __column.hasOwnProperty('title') ?  __column['title'] : "";
    if(self.builder){
        self.db_name =
            __column.hasOwnProperty('COLUMN_NAME') ? __column.COLUMN_NAME :
                __column.hasOwnProperty('column_name') ? __column.column_name :
                    __column.hasOwnProperty('db_name') ?  __column['db_name'] : "";

        self.db_type =
            __column.hasOwnProperty('DATA_TYPE') ? __column.DATA_TYPE :
                __column.hasOwnProperty('data_type') ? __column.data_type :
                    __column.hasOwnProperty('db_type') ?  __column['db_type'] : "";

        self.data_length = __column.hasOwnProperty('DATA_LENGTH') ? __column.DATA_LENGTH : __column.hasOwnProperty('data_length') ? __column.data_length : null;
        self.data_precision = __column.hasOwnProperty('DATA_PRECISION') ? __column.DATA_PRECISION : __column.hasOwnProperty('data_precision') ? __column.data_precision : null;
        self.data_scale = __column.hasOwnProperty('DATA_SCALE') ? __column.DATA_SCALE : __column.hasOwnProperty('data_scale') ? __column.data_scale : null;
        self.nullable = __column.hasOwnProperty('IS_NULLABLE') ? __column.IS_NULLABLE : __column.hasOwnProperty('is_nullable') ? __column.is_nullable : false;
        self.comments = __column.hasOwnProperty('COMMENTS') ? __column.COMMENTS : __column.hasOwnProperty('comments') ? __column.comments : null;

	    if(!self.title && self.comments){
		    self.title = self.comments
	    }

    }else{
        self.db_name = __column.hasOwnProperty('db_name') ?  __column['db_name'] : "";
        self.db_type = __column.hasOwnProperty('db_type') ?  __column['db_type'] : "";

        self.data_length = null;
        self.data_precision = null;
        self.data_scale = null;
        self.nullable = false;
        self.comments = null;
    }


    self.name = self.db_name;

    self.db_filter = __column.hasOwnProperty('db_filter') ?  __column['db_filter'] : '';

    self.display_mask = __column.hasOwnProperty('display_mask') ?  __column['display_mask'] : "";

    self.primary_key = __column.hasOwnProperty('primary_key') ?  __column['primary_key'] : false;

    self.filter_enabled = __column.hasOwnProperty('filter_enabled') ?  __column['filter_enabled'] : true;
    self.order_enabled = __column.hasOwnProperty('order_enabled') ?  __column['order_enabled'] : true;

    //console.log("self.order_enabled " + self.db_name + " " + self.order_enabled);

    self.editable = __column.hasOwnProperty('editable') ?  __column['editable'] : true;
    self.query = __column.hasOwnProperty('query') ?  __column['query'] : true;
    self.update = __column.hasOwnProperty('update') ?  __column['update'] : true;
    self.db = __column.hasOwnProperty('db') ?  __column['db'] : true;

    self.visible = __column.hasOwnProperty('visible') ?  __column['visible'] : true;
    self.printable = __column.hasOwnProperty('printable') ?  __column['printable'] : self.visible;

    self.default = __column.hasOwnProperty('default') ?  __column['default'] : null;

    if(!self.db_name){
        console.error('ERROR CREATE COLUMN: db_name not defined');
    }

    if(!self.db_type){
        console.error('ERROR CREATE COLUMN: db_type not defined');
    }

    if(!self.title){
        self.title = self.db_name;
    }

    self.id = self.db_name;
    self.db_type = self.db_type.toUpperCase();

    switch (self.db_type){
        case "INTEGER" :
	        self.db_type = 'INT';
	        break;
        case "TIMESTAMP" :
        case "DATETIME" :
            self.db_type = 'DATE';
            break;
        case "DECIMAL" :
	    case "DOUBLE" :
            self.db_type = 'NUMBER';
            break;
        case "VARCHAR" :
        case "VARCHAR2" :
        case "CHAR" :
        case "CHARACTER VARYING" :
            self.db_type = "STRING";
            break;
    }

    /**
     * TODO JSON columt data type !!!
     */

    if(!(self.db_type === 'INT'
        || self.db_type === 'NUMBER'
	    || self.db_type === 'DOUBLE'
        || self.db_type === 'STRING'
        || self.db_type === 'TEXT'
        || self.db_type === 'BOOLEAN'
        || self.db_type === 'JSON'
		|| self.db_type === 'ENUM'
        || self.db_type === 'DATE')){
        console.error('ERROR CREATE COLUMN: db_type field contains an invalid value ['+self.db_type+']. Possible values: NUMBER, INT, STRING, TEXT, BOOLEAN, JSON, DATE');
    }

	self.order = null;
	self.filter = null;

    self.setFilter(new $RbColumnFilter());
    self.setOrder(new $RbColumnOrder());

    self.default_filter = null;
    self.default_order = null;

    self.fixed_filter = null;
    self.fixed_order = null;

    self.message = '';
    self.message_class = 'rb-validate-error';

    if(__column.hasOwnProperty('combobox') && __column.combobox){
        self.addCombobox(new $RbComboBox(__column.combobox));
    }

	if(__column.hasOwnProperty('list') && __column.list){
		self.addList(new $RbList(__column.list));
	}

    if(__column.hasOwnProperty('sequence') && __column.sequence){
        self.addSequence(new $RbSequence(__column.sequence));
    }

    if(__column.hasOwnProperty('gadget') && __column.gadget){
        self.addGadget(new $RbDisplayGadget(__column.gadget));
    }

    if(__column.hasOwnProperty('data_map') && __column.data_map){
        self.addDataMap(new $RbDataMap(__column.data_map));
    }

    if(__column.hasOwnProperty('listvalues') && __column.listvalues){
        self.addListvalues(new $RbListValues(__column.listvalues));
    }

    if(__column.hasOwnProperty('fixed_filter') && __column.fixed_filter){
        self.setFixedFilter(new $RbColumnFilter(__column.fixed_filter));
    }

    if(__column.hasOwnProperty('fixed_order') && __column.fixed_order){
        self.setFixedOrder(__column.fixed_order);
    }

    if(__column.hasOwnProperty('default_filter') && __column.default_filter){
        self.setDefaultFilter(new $RbColumnFilter(__column.default_filter));
    }

    if(__column.hasOwnProperty('default_order') && __column.default_order){
        self.setDefaultOrder(__column.default_order);
    }

    return self;
};

// COLUMN_NAME, DATA_TYPE, DATA_LENGTH, DATA_PRECISION, DATA_SCALE, NULLABLE IS_NULLABLE, COMMENTS

$RbColumn.prototype.initDatasource = function(__datasource, __database_engine){
	const self = this;

	if(!__database_engine){
		__database_engine = __datasource.database_engine;
	}

	self.datasource = __datasource.id;
	self.identifier = self.datasource + '.' + self.db_name;

	self.id = 'datasource___' + self.datasource + '.column___' + self.db_name;

	switch (__database_engine.toUpperCase()){
		case 'ORACLE' :
			self.db_name = self.db_name.toUpperCase();
			break;
		case 'MYSQL' :
		default :
			self.db_name = self.db_name.toLowerCase();
	}

	return self;

};

$RbColumn.prototype.init = function(__datasource, __database_engine){
	const self = this;
	self.initDatasource(__datasource, __database_engine);
	self.initComboBox();
	self.initListValues();
};

$RbColumn.prototype.initComboBox = function(){
	const self = this;
	if(self.combobox){
		self.combobox.initColumn(self);
	}

	return self;
};

$RbColumn.prototype.initListValues = function() {
	const self = this;
	if(self.listvalues){
		self.listvalues.binding.initColumn(self);
	}

	return self;
};

$RbColumn.prototype.getDesignerTitle = function(){
    const self = this;
    return self.datasource + "." +  self.id;
};

$RbColumn.prototype.setMessage = function (__massage) {
    const self = this;
    self.message = __massage;
};

$RbColumn.prototype.setFilter = function (__filter) {
    const self = this;
    __filter.db_name = self.db_name;
    __filter.db_type = self.db_type;
    self.filter = __filter;
};

$RbColumn.prototype.setOrder = function (__order) {
    const self = this;
    __order.db_name = self.db_name;
    __order.db_type = self.db_type;
    self.order = __order;
};

$RbColumn.prototype.nextSort = function (___num){
    const self = this;
    self.order.nextSort(___num);
};

$RbColumn.prototype.addDataMap = function (__datamap){
    const self = this;

    if(__datamap.db_type_a === null){
        __datamap.db_type_a = self.db_type;
    }

    if(__datamap.db_type_b === null){
        __datamap.db_type_b = self.db_type;
    }

    self.data_map = __datamap;
    return self;
};

$RbColumn.prototype.addGadget = function (__gadget){
    const self = this;

    self.gadget = __gadget;
    self.gadget.column = self;
    self.gadget.init();

    return self;
};

$RbColumn.prototype.addCombobox = function (__combobox){
    const self = this;
    self.combobox = __combobox;

    if(self.combobox.binding.items.length === 1){
        if(!self.combobox.binding.items[0]["target"]){
            self.combobox.binding.items[0]["target"] = self.db_name;
            self.combobox.binding.items[0]["target_type"] = self.db_type;
        }
    }

    return self;
};

$RbColumn.prototype.addList = function (__list){
	const self = this;
	self.list = __list;

	if(self.list.binding.items.length === 1){
		if(!self.list.binding.items[0]["target"]){
			self.list.binding.items[0]["target"] = self.db_name;
			self.list.binding.items[0]["target_type"] = self.db_type;
		}
	}

	return self;
};



$RbColumn.prototype.addListvalues = function (__options){
    const self = this;
    self.listvalues = __options;
    if(!self.listvalues["title"]) {
	    self.listvalues["title"] = self.title;
    }
    return self;
};

$RbColumn.prototype.addSequence = function (__options){
    const self = this;
    self.sequence = __options;
    if(!self.sequence.target){
        self.sequence.target = self.db_name;
    }
    return self;
};

$RbColumn.prototype.setDefaultFilter = function (__options){
    const self = this;
    self.default_filter = new $RbColumnFilter(__options);
    return self;
};

$RbColumn.prototype.setDefaultOrder = function (__options){
    const self = this;
    self.default_order = new $RbColumnOrder(__options);
    return self;
};

$RbColumn.prototype.setFixedFilter = function (__options){
    const self = this;
    self.fixed_filter = new $RbColumnFilter(__options);
    self.setFilter(self.fixed_filter);
    return self;
};

$RbColumn.prototype.setFixedOrder = function (__options){
    const self = this;
    self.fixed_order = new $RbColumnOrder(__options);
    return self;
};

$RbColumn.prototype.getSimpleObject = function () {
    const self = this;
    return {
        id: self.id,
        db_name: self.db_name,
        db_type: self.db_type,
        title: self.title
    };
};

$RbColumn.prototype.toJSONimage = function() {
    const self = this;
    var __keys = ['id', 'title', 'db_name', 'db_type', 'db_filter', 'display_mask', 'primary_key', 'filter_enabled', 'order_enabled', 'editable', 'query', 'update', 'db', 'visible', 'printable', 'default', 'default_filter', 'default_order', 'fixed_filter', 'fixed_order', 'combobox', 'list', 'listvalues', 'sequence', 'gadget', 'data_map', 'link_datasource'];
    var ___out = {};

    _.each(__keys, function (__key) {
        if (typeof self[__key] !== 'undefined') {

            switch (__key) {
                case 'combobox':
                case 'listvalues' :
                case 'sequence' :
                case 'gadget' :
                case 'data_map' :
                case 'default_filter' :
                case 'default_order' :
                case 'fixed_filter' :
                case 'fixed_order' :
                    if(self[__key]) {
                        ___out[__key] = self[__key].toJSONimage();
                    }
                    break;
                default :
                    ___out[__key] = self[__key];

            }
        }
    });

    return ___out;
};

export default $RbColumn;