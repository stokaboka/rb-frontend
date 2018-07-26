/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

/**
 * Data Source object - default table model
 * @returns {$RbDataSource}
 */

"use strict";

import $RbBuilderInfo from './rbBuilderInfo';
import $RbColumn from './rbColumn';
import $RbColumnFilter from './rbColumnFilter';
import $RbColumnOrder from './rbColumnOrder';
import $RbDataSourceEvent from './rbDataSourceEvent';
import $RbHierarchyConnection from './rbHierarchyConnection';
import $RbHierarchyModel from './rbHierarchyModel';
import $RbRowFilter from './rbRowFilter';
import $RbRowValidatorProcessor from './rbRowValidatorProcessor';
import $RbRowValidator from './rbRowValidator';
//import $RbModelBuilderDatabase from '../designer/rbModelBuilderDatabase';

let $RbDataSource = function( __datasource, __builder ){
	const self = this;

	self.type = 'table';

    /**
     * builder mode
     */
    if(typeof  __builder === "undefined"){
        self.builder = false;
    }else{
        self.builder = !!__builder;
    }

    /**
     * link to RmModel object
     * @type {null}
     */
    self.model = null;

    self.icons = {
        SEARCH: {ASC: 'arrow_drop_up', DESC: 'arrow_drop_down', NONE: 'more_vert'},
        RECORD: {ADD: '', DELETE: 'delete_forever'}
    };

    self.busy = false;

	self.dataset = [];

    return self.init(__datasource);
};


$RbDataSource.prototype.DEFAULT_VALUES_BY_DB_TYPE = {
    'INT': 0,
    'NUMBER': 0,
    'STRING': '',
	'ENUM': '',
    'TEXT': '',
    'DATE': NaN,
    'DATETIME': NaN
};

$RbDataSource.prototype.setPageLength = function ( __page_length ) {
	const self = this;
	// if(__page_length >= 0){
    //     self.page_length = __page_length;
    // }else{
    //     self.page_length = self.page_length_save;
    // }

	self.page_length = __page_length >= 0 ? __page_length : self.page_length_save;
};

$RbDataSource.prototype.getDesignerTitle = function(){
	const self = this;
	return self.database + "." +  self.id;
};


$RbDataSource.prototype.init = function(__datasource){
	const self = this;

	self.model_info = null;

	self.builder_info = null;

    self.table = __datasource.hasOwnProperty('table') ?  __datasource['table'] : '';

    if(self.builder){
        self.comments = __datasource.hasOwnProperty('COMMENTS') ?  __datasource['COMMENTS'] : __datasource.hasOwnProperty('comments') ?  __datasource['comments'] : '';

        self.id = __datasource.hasOwnProperty('id') ?  __datasource['id'] : self.table +  '_' + ++__datasource.counter;

        if(__datasource.hasOwnProperty('builder_info')){
            self.builder_info = new $RbBuilderInfo( __datasource.builder_info );
        }else{
	        self.builder_info = new $RbBuilderInfo(
                {
                    x: __datasource.x,
                    y: __datasource.y,
	                included: true
                }
            );
        }
    }else{
        self.comments = null;
        self.id = __datasource.hasOwnProperty('id') ? __datasource['id'] : '';
    }

    //self.id = __datasource.hasOwnProperty('id') ? __datasource['id'] : '';

    self.name = self.table;

    self.title = __datasource.hasOwnProperty('title') ?  __datasource['title'] : '';
    self.database = __datasource.hasOwnProperty('database') ?  __datasource['database'] : '';
    self.database_engine = __datasource.hasOwnProperty('database_engine') ?  __datasource['database_engine'] : '';

    self.update_table = __datasource.hasOwnProperty('update_table') ?  __datasource['update_table'] : self.table;

    self.headers = __datasource.hasOwnProperty('headers') ?  __datasource['headers'] : true;

//    self.orderby = __datasource.hasOwnProperty('orderby') ?  __datasource['orderby'] : [];
//    self.groupby = __datasource.hasOwnProperty('groupby') ?  __datasource['groupby'] : [];
	/**
     * TODO TEST null values instead []
	 * @type {null}
	 */

	if(self.builder) {
		self.orderby = __datasource.hasOwnProperty('orderby') ? __datasource['orderby'] : null;
		self.groupby = __datasource.hasOwnProperty('groupby') ? __datasource['groupby'] : null;
	}else{
       self.orderby = __datasource.hasOwnProperty('orderby') ?  __datasource['orderby'] : [];
       self.groupby = __datasource.hasOwnProperty('groupby') ?  __datasource['groupby'] : [];
    }

	if(self.orderby == null){
		self.orderby = [];
	}
    if(self.groupby == null){
	    self.groupby = [];
    }

    self.insert_enabled = __datasource.hasOwnProperty('insert_enabled') ?  __datasource['insert_enabled'] : true;
    self.update_enabled = __datasource.hasOwnProperty('update_enabled') ?  __datasource['update_enabled'] : true;
    self.delete_enabled = __datasource.hasOwnProperty('delete_enabled') ?  __datasource['delete_enabled'] : true;

    self.filter_enabled = __datasource.hasOwnProperty('filter_enabled') ?  __datasource['filter_enabled'] : true;
    self.order_enabled = __datasource.hasOwnProperty('order_enabled') ?  __datasource['order_enabled'] : true;

    self.pager_enabled = __datasource.hasOwnProperty('pager_enabled') ?  __datasource['pager_enabled'] : true;

    self.report_enabled = __datasource.hasOwnProperty('report_enabled') ?  __datasource['report_enabled'] : true;
    self.history_enabled = __datasource.hasOwnProperty('history_enabled') ?  __datasource['history_enabled'] : true;

    self.autoload = __datasource.hasOwnProperty('autoload') ?  __datasource['autoload'] : false;

    self.single_row = __datasource.hasOwnProperty('single_row') ?  __datasource['single_row'] : false;

    self.page_length = __datasource.hasOwnProperty('page_length') ?  __datasource['page_length'] : 10;
    self.page_length = self.single_row ? 1 : self.page_length;
    self.page_length_save = self.page_length;

    self.row_filter = __datasource.hasOwnProperty('row_filter') ?  __datasource['row_filter'] : null;


    //self.validators = [];
	self.validators = null;
	let __validator_items = [];
	if(__datasource.hasOwnProperty('validator_processor')){
	    __validator_items = __datasource.validator_processor;
        _.each(__datasource.validator_processor, function (___validator) {
            self.addValidator(new $RbRowValidator(___validator));
        });
    }else{
	    __validator_items = []
    }

	self.validator_processor = new $RbRowValidatorProcessor(self, __validator_items);

    self.columns = [];

    if(__datasource.hasOwnProperty('columns')) {
        self.setColumns(__datasource.columns);
    }

    self.hier_connection = null;

    if(__datasource.hasOwnProperty('hier_connection')){
        if(__datasource.hier_connection != null) {
	        self.hier_connection = new $RbHierarchyConnection(__datasource.hier_connection);
        }
    }

    if(__datasource.hasOwnProperty('row_filter')){
        if(__datasource.row_filter != null) {
	        self.setRowFilter(new $RbRowFilter(__datasource.row_filter));
        }
    }

    self.hier_model = null;

    self.primary_key = '';

    self.status = {
        success: false,
        error: false,
        message: '',
        loaded: false,
        inserted: false,
        updated: false,
        deleted: false
    };

    self.current_row = -1;

    self.print_mode = false;

    self.blank = {};
    self._blank = {};

    self.last_page = 1;

    self.search_mask = '';

    self.dataset = [];
    self.page = 0;
    self.max_pages = 10;
    self.total_rows = 8;

    self.filter = {expression: "", values: []};
    self.filter_description = '';

    self.relation = null;

    self.where = null;

    self.search_by_id = null;

    self.listeners = [];

    if(self.where === undefined){
        self.where = null;
    }

    self.setDatabaseEngine(self.database_engine);

    /**
     *  indexses - the indexes list of the table (builder mode)
     * @type {Array}
     */
    self.indexses = [];

    /**
     * keys - then keys list of the table (builder mode)
     * @type {Array}
     */
    self.keys = [];

    return self;
};

$RbDataSource.prototype.setModelInfo = function (__path, __type) {
	const self = this;
	self.model_info = null;
    switch (__type.toUpperCase()){
        case 'JSON' :
        default :
            self.model_info = ['+', __path + self.id + '.json', self.id];
    }
};

$RbDataSource.prototype.toJSONimage = function() {
	const self = this;
	const __keys = ['id', 'title', 'database', 'database_engine', 'table', 'update_table', 'headers', 'orderby', 'groupby', 'insert_enabled', 'update_enabled', 'delete_enabled', 'filter_enabled', 'order_enabled', 'pager_enabled', 'report_enabled', 'history_enabled', 'autoload', 'single_row', 'page_length', 'row_filter', 'columns', 'validator_processor', 'hier_connection', 'builder_info'];
	let ___out = {
		component_type: 'datasource'
	};

	_.each(__keys, function (__key) {
        if(typeof self[__key] !== undefined) {

            switch (__key){
	            //case 'orderby':
                //case 'groupby' :
                case 'row_filter' :
	            case 'validator_processor' :
                case 'hier_connection' :
                    if(self[__key]) {
                        ___out[__key] = self[__key].toJSONimage();
                    }else{
	                    ___out[__key] = null;
                    }
                    break;
                case 'columns' :
                case 'validators' :
	                if(self[__key]) {
		                ___out[__key] = _.chain(self[__key])
			                .map(function (___item) {
				                if (___item) {
					                return ___item.toJSONimage();
				                } else {
					                return null;
				                }
			                })
			                .value();
	                }else{
		                ___out[__key] = null;
                    }
                    break;
                default :
                    ___out[__key] = self[__key];
            }
        }
    });

    return ___out;
};

$RbDataSource.prototype.setDatabaseEngine = function ( __db_eng ) {
	const self = this;
	self.database_engine = __db_eng;

    if( !self.database_engine ){
	    self.database_engine = 'NONE';
    }

    switch (self.database_engine.toUpperCase()){
        case 'ORACLE' :
            self.cast_data_types = {
                'INT': 'NUMBER',
                'NUMBER': 'NUMBER',
                'STRING': 'VARCHAR2',
                'TEXT': 'VARCHAR2',
                'DATE': 'DATE',
                'DATETIME': 'DATE'
            };
            self.cast_data_formats = {
                'INT': '',
                'NUMBER': '',
                'STRING': '',
                'TEXT': '',
                'DATE': 'DD.MM.YYYY',
                'DATETIME': 'DD.MM.YYYY HH:mm:ss'
            };
            self.TO_UPPER = 'NLS_UPPER';
            self.primary_key = 'ID';
            break;
        case 'MYSQL' :
        default :
            // default data types - MYSQL data types
            self.cast_data_types = {
                'INT': 'INTEGER',
                'NUMBER': 'NUMERIC',
                'STRING': 'VARCHAR',
                'TEXT': 'VARCHAR',
	            'ENUM': 'ENUM',
                'DATE': 'DATE',
                'DATETIME': 'DATETIME'
            };
            self.cast_data_formats = {
                'INT': '',
                'NUMBER': '',
                'STRING': '',
                'TEXT': '',
	            'ENUM': '',
                'DATE': 'YYYY-MM-DD',
                'DATETIME': 'YYYY-MM-DD HH:mm:ss'
            };
            self.TO_UPPER = 'UPPER';
            self.primary_key = 'id';
    }

};

$RbDataSource.prototype.reset = function () {
    const self = this;
    self.last_page = 1;

    self.search_mask = '';

    self.dataset = [];
    self.page = 0;
    //self.page_length = 10;
    self.max_pages = 10;
    self.total_rows = 8;

    self.filter = {expression: "", values: []};
    self.filter_description = '';

    self.relation = null;

    self.where = null;

    self.search_by_id = null;

    self.status = {
        success: false,
        error: false,
        message: '',
        loaded: false,
        inserted: false,
        updated: false,
        deleted: false,
    };

    self.listeners = [];

    return self;
};

$RbDataSource.prototype.id = function(___value){
	const self = this;
	if(typeof ___value === 'undefined'){
        return self.id;
    }else{
        self.id = ___value;
        return self;
    }
};

$RbDataSource.prototype.prepareRelationInfo = function ( ___relation ) {
	const self = this;
	switch (self.database_engine.toUpperCase()){
        case 'ORACLE' :
            ___relation.column = ___relation.column.toUpperCase();
            break;
        case 'MYSQL' :
        default :
        // default data types - MYSQL data types
    }
};

$RbDataSource.prototype.addListener = function (___event_id, ___listener) {
	const self = this;
	self.listeners.push(new $RbDataSourceEvent(___event_id, ___listener));
};

$RbDataSource.prototype.doListeners = function (___event_id, ___event_data) {
    const self = this;
    _.chain(self.listeners)
        .where({id: ___event_id})
        .each(function (___item) {
            if(___item.listener){
                try{
                    if(typeof ___event_data !== 'undefined'){
                        ___item.listener(___event_data);
                    }else {
                        ___item.listener();
                    }
                }catch(e){
                    self.model.$log.error('$RbDataSource.doListeners error:');
                    self.model.$log.error(e);
                }
            }
        });
};

$RbDataSource.prototype.load = function (___options) {
    const self = this;
    if(___options === undefined)
        ___options = {};
    self.model.load(self, ___options);
};

$RbDataSource.prototype.setBlank = function (__blank) {
    const self = this;
    self._blank = __blank;
};

$RbDataSource.prototype.currentDataRow = function () {
    const self = this;
    if(self.dataset != null && 0 <= self.current_row && self.current_row < self.dataset.length){
        return self.dataset[self.current_row];
    }else{
        return self._blank;
    }
};

$RbDataSource.prototype.setColumns = function (__columns) {
    const self = this;
    self.columns = null;
    self.columns = [];
    self.addColumns(__columns);
    return self;
};

$RbDataSource.prototype.addColumns = function ( __columns ) {
    const self = this;
    _.each(__columns, function ( ___column ) {

        if(!self.builder) {
            if (!___column.hasOwnProperty("db_type"))
                ___column["db_type"] = "STRING";
            if (!___column.hasOwnProperty("visible")) {
                ___column["visible"] = ___column["db_name"].toUpperCase() !== 'ID';
            }
        }
	    let __column = new $RbColumn(___column, self.builder);
	    self.addColumn(__column);
    });
    return self;
};


$RbDataSource.prototype.addColumn = function (__column) {
    const self = this;

	__column.init(self, self.database_engine);

    self.columns.push(__column);

    if(__column.primary_key){
        self.primary_key = __column.db_name;
    }

    return self;
};

$RbDataSource.prototype.compileFilterExpression = function(__expression){
    const self = this;
	const regexp = /\$\w+/g;
    let result;
    //let __out = '';

    while (result = regexp.exec(__expression)) {
        // alert( 'Найдено: ' + result[0] + ' на позиции:' + result.index );
        // alert( 'Свойство lastIndex: ' + regexp.lastIndex );
    }
};

/**
 * prepare data source for query
 */
$RbDataSource.prototype.before_query = function () {
    const self = this;

	let __expression_and = [];
	let __expression_or = [];
	let __expression_date = [];
	let __values = [];

	let __expression_description_and = [];
	let __expression_description_or = [];

	let __row_filter = self.row_filter;

    self.filter = {expression: "", values: []};
    self.filter_description = '';

    if(self.search_by_id) {
        self.filter = {expression: "id = ?", values: [self.search_by_id]};
    }else if(self.search_mask) {
        if (self.search_mask.indexOf('%') < 0) {
            self.search_mask = '%' + self.search_mask + '%';
        }
        self.search_mask = self.search_mask.toUpperCase();
        let ___filter_cols = _.chain(self.columns)
            .filter(function (___column) {
                return (___column["db_type"] === 'STRING' || ___column["db_type"] === 'TEXT'  || ___column["db_type"] === 'ENUM') && ___column.db_name.toUpperCase() !== 'ID';
            })
            .value();
        let ___expr = _.map(___filter_cols, function (___column) {
            return self.TO_UPPER + '(' + ___column["db_name"] + ') LIKE ?';
        });
        let ___expr_descr = _.map(___filter_cols, function (___column) {
            return ___column["title"];
        });
        self.filter = {
            expression: ___expr.join(' OR '),
            values: _.map(___expr, function (_____expr) {
                return self.search_mask
            })
        };
        __expression_description_and.push(___expr_descr.join(', ') + ' содержит текст: "' + self.search_mask + '"');
    }else {

        if (__row_filter) {
            _.each(__row_filter.column_binding, function(___col_bind){
	            let __column = self.getColumn(___col_bind.column);
	            let __filter_column = __column["filter"];
                __filter_column.init();
	            let __db_type = __filter_column["db_type"];
                __db_type = __db_type.toUpperCase();

	            let ___filter_property = ___col_bind.filter_property == 'value' ? 'value1' : ___col_bind.filter_property;
	            let ___val = __filter_column[___filter_property];

	            let __cast_data_type = self.cast_data_types[__db_type];
	            let __cast_data_format = self.cast_data_formats[__db_type];

                switch (__db_type.toUpperCase()) {
                    case 'INT' :
                    case 'NUMBER' :
                        __values.push(___val == null ? '' : ___val);
                        break;
                    case 'STRING' :
                    case 'TEXT' :
	                case 'ENUM' :
                        __values.push(___val == null ? '' : ___val);
                        break;
                    case 'DATE' :
                        let ___d = moment(___val);
                        __values.push(___d.isValid() ? ___d.format(__cast_data_format) : '');
                        break;
                }
            });
        }else{

	        let __filter_columns = _.filter(self.columns, function (___column) {
                return ___column.filter_enabled;
            });

            for (let __i = 0; __i < __filter_columns.length; __i++) {
	            let __column = __filter_columns[__i];

	            let __filter_column = __column["filter"];
                __filter_column.init();
	            let __value1 = __filter_column["value1"];
	            let __value2 = __filter_column["value2"];
	            let __mask = __filter_column["mask"];
	            let __db_name = __column["db_filter"] ? __column["db_filter"] : __filter_column["db_name"];
	            let __expression = __filter_column["expression"];
	            let __db_title = __column["title"];
	            let __db_type = __filter_column["db_type"];
                __db_type = __db_type.toUpperCase();
	            let __reverse = __filter_column["reverse"];
	            let __operator_not = __reverse ? ' NOT ' : ' ';
	            let __reverse_descr = __reverse ? ' не ' : ' ';
	            let __cast_data_type = self.cast_data_types[__db_type];
	            let __cast_data_format = self.cast_data_formats[__db_type];

                switch (__db_type) {
                    case 'INT' :
                    case 'NUMBER' :
                        if (__expression) {
                            if (__value1 != null || __value2 != null) {
                                if (__value1 == null)__value1 = '';
                                if (__value2 == null)__value2 = '';
                                __values.push(__value1);
                                __values.push(__value2);
                                __expression_and.push(__operator_not + "(" + __expression + ")");
                                if (__reverse) {
                                    __expression_description_and.push(__db_title + ' до ' + __value1 + ' от ' + __value2);
                                } else {
                                    __expression_description_and.push(__db_title + ' от ' + __value1 + ' до ' + __value2);
                                }
                            }
                        } else {
                            if (__value1 != null && __value2 != null) {
                                if (__value1 === __value2) {
                                    //__expression_and.push(__operator_not + "(" + __db_name + " = CAST(? AS " + __cast_data_type + "))");
	                                __expression_and.push(__operator_not + "(" + __db_name + " = ? )");
                                    __values.push(__value1);
                                    __expression_description_and.push(__db_title + __reverse_descr + 'равно ' + __value1);
                                } else {
                                    //__expression_and.push(__operator_not + "(" + __db_name + " BETWEEN CAST(? AS " + __cast_data_type + ") AND CAST(? AS " + __cast_data_type + "))");
	                                __expression_and.push(__operator_not + "(" + __db_name + " BETWEEN ? AND ? )");
                                    __values.push(__value1);
                                    __values.push(__value2);
                                    if (__reverse) {
                                        __expression_description_and.push(__db_title + ' до ' + __value1 + ' от ' + __value2);
                                    } else {
                                        __expression_description_and.push(__db_title + ' от ' + __value1 + ' до ' + __value2);
                                    }
                                }
                            } else if (__value1 != null && __value2 == null) {
                                //__expression_and.push(__operator_not + "(CAST(? AS " + __cast_data_type + ") <= " + __db_name + ")");
	                            __expression_and.push(__operator_not + "( ? <= " + __db_name + " ) ");
                                __values.push(__value1);
                                __expression_description_and.push(__value1 + __reverse_descr + ' меньше ' + __db_title);
                            } else if (__value1 == null && __value2 != null) {
                                //__expression_and.push(__operator_not + "(" + __db_name + " <= CAST(? AS " + __cast_data_type + "))");
	                            __expression_and.push(__operator_not + " ( " + __db_name + " <= ? )");
                                __values.push(__value2);
                                __expression_description_and.push(__db_title + __reverse_descr + ' меньше ' + __value2);
                            }
                        }
                        break;
                    case 'STRING' :
                    case 'TEXT' :
	                case 'ENUM' :
                        //if(__mask) {
                        if (__expression) {
                            if (__mask) {
                                __expression_and.push(__operator_not + "(" + __expression + ")");
                                __values.push(__mask);
                                __expression_description_and.push(__db_title + __reverse_descr + ' ' + __mask);
                            }
                        } else if (__mask) {
                            __expression_and.push(__operator_not + "(" + __db_name + " LIKE ?)");
                            __values.push(__mask);
                            __expression_description_and.push(__db_title + __reverse_descr + ' ' + __mask);
                        }

                        //}
                        break;
                    case 'DATE' :
	                    let __ds = moment(__value1);
	                    let __de = moment(__value2);

                        if (__expression) {
                            if (__ds.isValid() || __de.isValid()) {
                                if (__ds.isValid()) {
                                    __values.push(__ds.format(__cast_data_format));
                                } else {
                                    __values.push('');
                                }
                                if (__de.isValid()) {
                                    __values.push(__de.format(__cast_data_format));
                                } else {
                                    __values.push('');
                                }
                                __expression_and.push(__operator_not + "(" + __expression + ")");
                                if (__reverse) {
                                    __expression_description_and.push(__db_title + ' до ' + __value1 + ' от ' + __value2);
                                } else {
                                    __expression_description_and.push(__db_title + ' от ' + __value1 + ' до ' + __value2);
                                }
                            }
                        } else if (__ds.isValid() && __de.isValid()) {
                            if (__ds.isSame(__de, 'day')) {
                                __expression_and.push(__operator_not + "(" + __db_name + " = CAST(? AS " + __cast_data_type + "))");
                                __values.push(__ds.format(__cast_data_format));
                                __expression_description_and.push(__db_title + __reverse_descr + ' равно ' + __ds.format('DD.MM.YYYY'));
                            } else {
                                __expression_and.push(__operator_not + "(" + __db_name + " BETWEEN CAST(? AS " + __cast_data_type + ") AND CAST(? AS " + __cast_data_type + "))");
                                __values.push(__ds.format(__cast_data_format));
                                __values.push(__de.format(__cast_data_format));
                                if (__reverse) {
                                    __expression_description_and.push(__db_title + ' до ' + __ds.format('DD.MM.YYYY') + ' от ' + __de.format('DD.MM.YYYY'));
                                } else {
                                    __expression_description_and.push(__db_title + ' от ' + __ds.format('DD.MM.YYYY') + ' до ' + __de.format('DD.MM.YYYY'));
                                }
                            }
                        } else if (__ds.isValid() && !__de.isValid()) {
                            __expression_and.push(__operator_not + "(CAST(? AS " + __cast_data_type + ") <= " + __db_name + ")");
                            __values.push(__ds.format(__cast_data_format));
                            __expression_description_and.push(__db_title + __reverse_descr + ' позднее ' + __ds.format('DD.MM.YYYY'));
                        } else if (!__ds.isValid() && __de.isValid()) {
                            __expression_and.push(__operator_not + "(" + __db_name + " <= CAST(? AS " + __cast_data_type + "))");
                            __values.push(__de.format(__cast_data_format));
                            __expression_description_and.push(__db_title + __reverse_descr + ' ранее ' + __de.format('DD.MM.YYYY'));
                        }

                        break;
                    default :
                }
            }
        }

        if(__row_filter) {
            self.filter = {expression: __row_filter.expression, values: __values};
        }else{
            if (__expression_and.length > 0 || __expression_or.length > 0 || __expression_date.length > 0) {
	            let __exp_and = __expression_and.join(' AND ');
	            let __exp_or = __expression_or.join(' OR ');
	            let __expr_dt = __expression_date.join(' AND ');
	            let __expr = '';
	            let __expr_arr = [];

                if (__exp_and)
                    __expr_arr.push("(" + __exp_and + ")");
                if (__exp_or)
                    __expr_arr.push("(" + __exp_or + ")");
                if (__expr_dt)
                    __expr_arr.push("(" + __expr_dt + ")");

                if (__expr_arr.length > 0)
                    __expr = __expr_arr.join(' AND ');
                else
                    __expr = '';

                self.filter = {expression: __expr, values: __values};
                if (__expression_description_and.length > 0 && __expression_description_or.length > 0) {
                    self.filter_description = __expression_description_and.join(' и ') + ' / ' + __expression_description_or.join(' или ');
                } else {
                    self.filter_description = __expression_description_and.join(' и ') + __expression_description_or.join(' или ');
                }
            } else {
                self.filter = {expression: "", values: []};
                self.filter_description = '';
            }
        }

        self.orderby = _.chain(self.columns)
            .pluck('order')
            .reject(function (___order_item) {
                return ___order_item.dir === 'NONE';
            })
            .sortBy(function (___order_item) {
                return ___order_item.num;
            })
            .map(function (___order_item) {
                return ___order_item.db_name + ' ' + ___order_item.dir;
            })
            .value();

        self.save_filter();
        self.save_order();

    }

    self.doListeners($RbDataSourceEvent.prototype.EVENTS.BEFORE_QUERY);
};

$RbDataSource.prototype.changeColumnFilter = function (___columnm, __options) {
    const self = this;
    let __reload_flag = false;
    switch (__options.toUpperCase()){
        case "REVERSE" :
            ___columnm.filter.reverse = !___columnm.filter.reverse;
            __reload_flag = true;
            break;
    }
    if(__reload_flag) {
        ___columnm.filter.init();
        if(!___columnm.filter.isEmpty()) {
            self.load();
        }
    }
};

$RbDataSource.prototype.changeOrder = function (___column, ___dir) {
    const self = this;
    let __max_num = _.reduce(self.columns, function (memo, ___item) {
        return memo < ___item["order"]["num"] ? ___item["order"]["num"] : memo;
    }, 0);

    ___column.order.setSort(___dir, __max_num);

    let ___reindex = 1;
    _.chain(self.columns)
        .sortBy(function (___order_item) {
            return ___order_item.num;
        })
        .each(function (___order_item) {
            if(___order_item.dir !== 'NONE'){
                ___order_item.num = ___reindex++;
            }
        });

    self.load();
};

/**
 * set filter for relation query
 */
$RbDataSource.prototype.before_relation_query = function () {
    const self = this;
    if(self.relation){
        if(self.filter.expression && self.filter.values.length > 0){
            self.filter.expression = "("+self.filter.expression+") AND ("+self.relation.key+" =? "+")";
            _.each(self.relation.value, function(_el){self.filter.values.push(_el)});
        }else{
            self.filter.expression = "("+self.relation.key+" =? "+")";
            self.filter.values = self.relation.value;
        }
        self.doListeners($RbDataSourceEvent.prototype.EVENTS.BEFORE_RELATION_QUERY);
    }
};

$RbDataSource.prototype.save_filter = function () {
    const self = this;
    let __filter = _.chain(self.columns)
        .pluck( "filter")
        .map(function (___filter_item) {return ___filter_item.toObject();})
        .value();

    self.storageValue('FILTER', __filter);
};

$RbDataSource.prototype.restore_filter = function () {
	const self = this;

	let __filter = self.storageValue('FILTER');

	_.each(self.columns, function (___column) {
		if( ___column.fixed_filter ){
			___column.setFilter(___column.fixed_filter);
		}else {

			if(__filter) {
				let ___flt = _.findWhere(__filter, {db_name: ___column["db_name"]});
				if (___flt) {
					___column.setFilter(new $RbColumnFilter(___flt));
				}
			}

			if (___column["filter"].isEmpty() && ___column.default_filter != null) {
				___column.setFilter(___column.default_filter);
			}
		}
	});

};

$RbDataSource.prototype.save_order = function () {
    const self = this;

    let __order = _.chain(self.columns)
        .pluck("order")
        .map(function (___order_item) {
            return ___order_item.toObject();
        })
        .value();

    self.storageValue('ORDER', __order);
};

$RbDataSource.prototype.restore_order = function () {
    const self = this;

    let __order = self.storageValue('ORDER');

	_.each(self.columns, function (___column) {
		if( ___column.fixedOrder ){
			___column.setOrder(___column.fixed_order);
		}else {
			if(__order) {
				let ___ord = _.findWhere(__order, {db_name: ___column["db_name"]});
				if (___ord) {
					___column.setOrder(new $RbColumnOrder(___ord));
				}
			}
			if (___column["order"].isEmpty() && ___column.default_order) {
				___column.setOrder(___column.default_order);
			}
		}
	});

};

$RbDataSource.prototype.storageValue = function (___name, ___value) {
    const self = this;
    let __storageModel = self.$localStorage;

    if( ___name ){
	    ___name = self.model.id + '.' + self.id+'.'+___name;
	    if (typeof ___value === 'undefined') {
		    if(typeof __storageModel[___name] !== 'undefined') {
			    return __storageModel[___name];
		    }else{
			    return null;
		    }
	    } else {
		    __storageModel[___name] = ___value;
	    }
    }else{
	    console.debug("Name of storage must be defined");
    }
    //
    // if(typeof ___name === 'undefined') {
    //     console.debug("Name of storage must be defined");
    // }else {
    //     ___name = self.model.id + '.' + self.id+'.'+___name;
    //     if (typeof ___value == 'undefined') {
    //         if(typeof __storageModel[___name] != 'undefined') {
    //             return __storageModel[___name];
    //         }else{
    //             return null;
    //         }
    //     } else {
    //         __storageModel[___name] = ___value;
    //     }
    // }
};

$RbDataSource.prototype.registerInModel = function (__model) {
    const self = this;
    self.model = __model;

    if(!self.database){
        self.database = self.model.default_database;
    }

    if(!self.database_engine){
        self.setDatabaseEngine(self.model.default_database_engine);
    }

    if(!self.database){
        self.model.$log.debug('$RbDataSource.registerInModel: database expected')
    }

    if(!self.database_engine){
        self.model.$log.debug('$RbDataSource.registerInModel: database_engine expected')
    }

    if(self.hier_connection) {
        //self.hier_model = new $RbHierarchyModel(self.model, self, {}, new $RbHierarchyConnection(self.hier_connection));
        self.hier_model = new $RbHierarchyModel(self.model, self, {}, self.hier_connection);
    }

    self.restore_filter();
    self.restore_order();
};

$RbDataSource.prototype.set_current_row = function (__current_row) {
    const self = this;
    self.current_row = __current_row;
};

$RbDataSource.prototype.getCurrentRow = function (__current_row) {
    const self = this;
    if(typeof __current_row !== 'undefined'){
        self.set_current_row(__current_row);
    }
    if(0 <= self.current_row && self.current_row < self.dataset.length){
        return self.dataset[self.current_row];
    }else{
        return null;
    }
};

$RbDataSource.prototype.getColumnValue = function (__db_name){
    const self = this;
    let ___row = self.getCurrentRow();
    if(___row){
        if(___row.hasOwnProperty(__db_name)) {
            return self.dataset[self.current_row][__db_name];
        }else{
            return null;
        }
    }else{
        return null;
    }
};

$RbDataSource.prototype.before_new_row = function () {
    const self = this;
    self._blank = {};
    for(let __i=0; __i < self.columns.length; __i++){
        if(self.columns[__i]["update"] || self.columns[__i]["editable"]){
	        let __column = self.columns[__i];
            if(__column.default){
                if(__column.db_type === 'DATE' || __column.db_type === 'DATETIME'){
                    if(__column.default === 'NOW'){
                        self._blank[self.columns[__i]["db_name"]] = new Date();
                    }else{
                        self._blank[self.columns[__i]["db_name"]] = __column.default;
                    }
                }else{
                    self._blank[self.columns[__i]["db_name"]] = __column.default;
                }
            }else{
                if($RbDataSource.prototype.DEFAULT_VALUES_BY_DB_TYPE.hasOwnProperty(__column.db_type)) {
                    self._blank[self.columns[__i]["db_name"]] = $RbDataSource.prototype.DEFAULT_VALUES_BY_DB_TYPE[__column.db_type];
                }else{
                    self.model.$log.error('$RbDataSource.before_new_row: unknown db_type ['+__column.db_type+']');
                }
            }
        }
    }

    self.model.set_relation_data(self.id, self._blank);

    self.blank = self._blank;
    self.doListeners($RbDataSourceEvent.prototype.EVENTS.BEFORE_NEW_ROW, self.blank);
};

$RbDataSource.prototype.before_commit_transaction = function (__transaction) {
    const self = this;
    if(self.transactionValidator){
        self.transactionValidator(__transaction);
    }
    self.doListeners($RbDataSourceEvent.prototype.EVENTS.BEFORE_COMMIT_TRANSACTION, __transaction);
};
$RbDataSource.prototype.before_rollback_transaction = function (__row) {
    const self = this;
    self.doListeners($RbDataSourceEvent.prototype.EVENTS.BEFORE_ROLLBACK_TRANSACTION, __row);
    return __row;
};

/**
 * TODO - проверить вызов after_sequencer
 * @param __sequence
 * @param __value
 */
$RbDataSource.prototype.after_sequencer = function (__sequence, __value) {
    const self = this;
    self.doListeners($RbDataSourceEvent.prototype.EVENTS.AFTER_SEQUENCER);
};

$RbDataSource.prototype.after_data_loaded = function (__result){
    const self = this;
    self.current_row = 0;
    self.search_by_id = null;

    _.each(self.dataset, function(__row){

        _.each(self.columns, function (__column) {
            if(__column.data_map){
                __row[__column.db_name] = __column.data_map.getValueAB(__row[__column.db_name]);
                // translate column db_type to db_type_b
                if(__column.db_type !== __column.data_map.db_type_b){
                    __column.db_type = __column.data_map.db_type_b;
                }
            }
        });

    });



    if(self.hier_model){
        self.hier_model.dataLoaded(__result);
    }

    self.doListeners($RbDataSourceEvent.prototype.EVENTS.AFTER_DATA_LOADED, __result);

    self.busy = false;

};
$RbDataSource.prototype.after_data_saved = function (__result){
    const self = this;
    self.doListeners($RbDataSourceEvent.prototype.EVENTS.AFTER_DATA_SAVED);
    self.busy = false;
};

$RbDataSource.prototype.setColumnOrder = function (__options, __order){
    const self = this;
	let ___column = self.getColumn(__options);
    if(___column){
        ___column.setOrder(__order);
    }else{
        self.model.$log.error("$RbDataSource.setColumnOrder: column not found");
    }
};

$RbDataSource.prototype.clearFilters = function(){
    const self = this;
    _.each(self.columns, function (___column) {
        ___column.setFilter(new $RbColumnFilter());
    });
};

$RbDataSource.prototype.clearOrders = function(){
    const self = this;
    _.each(self.columns, function (___column) {
        ___column.setOrder(new $RbColumnOrder());
    });
};

$RbDataSource.prototype.setRowFilter = function (__filter) {
    const self = this;
    self.row_filter = __filter;
    if(self.database_engine === 'oracle'){
        _.each(self.row_filter.column_binding, function (___elem, ___index, ___list) {
            //___list[___index] = ___elem.column.toUpperCase();
            ___elem.column = ___elem.column.toUpperCase();
        })
    }
    return self;
};

$RbDataSource.prototype.setColumnFilter = function (__options, __filter){
    const self = this;
	let ___column = self.getColumn(__options);
    if(___column){
        ___column.setFilter(__filter);
    }else{
        self.model.$log.error("$RbDataSource.setColumnFilter: column not found");
    }
};

$RbDataSource.prototype.getColumn = function (__options) {
    const self = this;
    if(typeof __options === 'string'){
        __options = {db_name: __options}
    }

    if(self.database_engine === 'oracle'){
        __options.db_name = __options.db_name.toUpperCase();
    }

	let ___column = _.findWhere(self.columns, __options);
    if(typeof ___column === 'undefined'){
        self.model.$log.error("$RbDataSource.getColumn: column ["+__options.db_name+"] not found in datasourse ["+self.id+"]");
        return null;
    }else{
        return ___column;
    }
};

$RbDataSource.prototype.createFilterForColumn = function (__column_options, __filter_options, __set_filter_for_column) {
    const self = this;
	let __column = self.getColumn(__column_options);
    if(typeof __set_filter_for_column == 'undefined'){
        __set_filter_for_column = false;
    }
    if(__column){
        __filter_options["db_name"] = __column.db_name;
        __filter_options["db_type"] = __column.db_type;
	    let __filter = new $RbColumnFilter(__filter_options);
        if(__set_filter_for_column){
            __column.setFilter(__filter);
        }
        return __filter;
    }else{
        return null;
    }
};

$RbDataSource.prototype.clearColumnsMessages = function ()
{
	const self = this;
	_.each(self.columns, function (___column) {
		___column.setMessage('');
	});
};

$RbDataSource.prototype.validate = function (__row_data) {
	const self = this;
	return self.validator_processor.validate(__row_data);
};

/**
 * TODO delete metod  validate__
 * @param __row_data
 * @returns {boolean}
 * @private
 */

$RbDataSource.prototype.validate__ = function (__row_data)
{

    const self = this;
	let __out = true;

	if(self.validators) {

		_.each(self.columns, function (___column) {
			___column.setMessage('');
		});

		for (let ___i = 0; ___i < self.validators.length; ___i++) {
			let ___validator = self.validators[___i];
			___validator.validate(__row_data);
			if (!___validator.result) {
				__out = false;
			}
		}

		if (!__out) {
			_.chain(self.validators)
				.where({result: false})
				.each(function (___validator) {
					if (___validator.column) {
						let ___column = self.getColumn(___validator.column);
						if (___column)
							___column.setMessage(___validator.message);
					}
					if (___validator.column1) {
						let ___column = self.getColumn(___validator.column1);
						if (___column)
							___column.setMessage(___validator.message);
					}
					if (___validator.column2) {
						let ___column = self.getColumn(___validator.column2);
						if (___column)
							___column.setMessage(___validator.message);
					}
				});
		}
	}

    return __out;
};

$RbDataSource.prototype.addValidator = function(__validator){
    const self = this;
    if(self.validators == null){
	    self.validators = [];
    }
    __validator.datasource = self;
    self.validators.push(__validator);
    return self;
};


/**
 * add the index in the indexses array
 * @param __index
 * @returns {$RbModelBuilderTable}
 */
$RbDataSource.prototype.addIndex = function(__index){
    const self = this;
    self.indexses.push(__index);
    return self;
};

/**
 * find the index in the indexses array
 * @param __column
 */
$RbDataSource.prototype.getIndex = function(__index){
    const self = this;

	let ___out = _.findWhere(self.indexses, {name: __index});

    if(typeof ___out === 'undefined'){
        ___out = null;
    }
    return ___out;
};

/**
 * delete the index named __index or object from the indexses array
 * @param __index
 * @returns {$RbModelBuilderDatabase}
 */
$RbDataSource.prototype.removeIndex = function (__index) {
    const self = this;

    var ___t = null;
    if(typeof __index === 'string'){
        ___t = self.getIndex(__index);
    }else{
        ___t = __index;
    }

    if(___t){
        self.indexses = _.without(self.indexses, ___t);
    }

    return self;
};


/**
 * add the key in the keys array
 * @param __key
 * @returns {$RbModelBuilderTable}
 */
$RbDataSource.prototype.addKey = function(__key){
    const self = this;
    self.keys.push(__key);
    return self;
};

/**
 * find the key in the keys array
 * @param __key
 */
$RbDataSource.prototype.getKey = function(__key){
    const self = this;

	let ___out = _.findWhere(self.keys, {name: __key});

    if(typeof ___out === 'undefined'){
        ___out = null;
    }
    return ___out;
};

/**
 * delete the key named __key or object from the keys array
 * @param __key
 * @returns {$RbModelBuilderDatabase}
 */
$RbDataSource.prototype.removeKey = function (__key) {
    const self = this;

	let ___t = null;
    if(typeof __index === 'string'){
        ___t = self.getKey(__key);
    }else{
        ___t = __key;
    }

    if(___t){
        self.keys = _.without(self.keys, ___t);
    }

    return self;
};

export default $RbDataSource;