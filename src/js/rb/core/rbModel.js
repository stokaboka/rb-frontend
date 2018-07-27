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

import $RbDataSource from './rbDataSource';
import $RbModelLoader from './rbModelLoader';
import $RbTransaction from './rbTransaction';

import { $RbListValuesModel } from '../ui/rbListValues';
import { $RbSequencer } from './rbSequence';
import $RbForm from './rbForm';
/**
 * Handler for data models
 *
 * coordinates the transaction, controls the data loading, processing relational connections, performs data storage
 */
let $RbModel = function (___options) {
	const self = this;

	Object.assign(
		self,
		{
			id: 'RbModel',
			loader: null,
			modelUrl: null,
			url: 'api',

			$rootScope: null,
			$http: null,
			$q: null,
			$cookies: null,
			$localStorage: null,
			$sessionStorage: null,
			$mdDialog: null,
			$location: null,
			$log: null,

			status: {
				success: false,
				error: false,
				message: ''
			},

			formats: {
				//date: 'dd-MMMM-yyyy'
				//date: 'dd-MM-yyyy'
				//date: 'shortDate'
				date: 'dd.MM.yyyy'
			},

			dateOptions: {
//                'day-format': 'dd',
//                'month-format': 'MM',
//                'year-format': "yyyy",
				'starting-day': 1
			},

			/**
			 * Disable weekend selection
 			 */
			disabled: function ( date, mode ) {
				return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
			},

			/**
			 * current datasource
			 * @type {RbDataSource}
			 */
			dataSource: {},
			data_services: [],
			/**
			 * data sources collection
			 * @type {Object}
			 */
			dataSources: {},
			/**
			 * relations collection
			 * @type {Array}
			 */
			relations: [],

			/**
			 * applications collection
			 * @type {Array}
			 */
			applications: [],
			/**
			 * forms collection
			 * @type {Array}
			 */

			forms: [],
			/**
			 * current application form
			 * @type {RbForm}
			 */
			form: null,

			/**
			 * busy flag
			 * @type {boolean}
			 */
			busy: false,

			/**
			 * title for the dialogs
			 * @type {string}
			 */
			editor_title: '',

			/**
			 * messages stack
			 * @type {Array}
			 */
			messages: [],

			/**
			 * the user is authorized
			 * @type {boolean}
			 */
			logged: false,

			/**
			 * updated flag
			 * @type {boolean}
			 */
			updated: false,

			/**
			 * page name for current data source
			 */
			topmost_page_name: '',

			/**
			 * ready flag
			 * @type {boolean}
			 */
			ready: false,

			/**
			 * scopes wait own datasource
			 * @type {Array}
			 */
			wait_scopes: [],

			/**
			 * forms wait initialization
			 * @type {Array}
			 */
			wait_forms: [],

			/**
			 * registered listeners collection
			 * @type {Array}
			 */
			listeners: []

		},
		___options
	);

	if (!self.$rootScope) {
		self.$log.error('$RbModel: $rootScope expected');
	}
	if (!self.$http) {
		self.$log.error('$RbModel: $http expected');
	}
	if (!self.$q) {
		self.$log.error('$RbModel: $q expected');
	}
	if (!self.$localStorage) {
		self.$log.error('$RbModel: $localStorage expected');
	}

	self.listvalues = new $RbListValuesModel(self);
	self.sequencer = new $RbSequencer(self);

	self.$rootScope.$on('user_login', function () {
		self.logged = true;
	});

	self.$rootScope.$on('user_logout', function () {
		self.logged = false;
	});

	self.$rootScope.$on('$viewContentLoaded', function ( ) {
		self.renderApplicationForm();
	});

	return self;
};

$RbModel.prototype.TRANSACTION = {
    IN_PROGRESS: 'TRANSACTION_IN_PROGRESS',
    EMPTY: "TRANSACTION_EMPTY",
    BUSY: "TRANSACTION_BUSY"
};

$RbModel.prototype.MESSAGE = {
    BUSY: 'Data processing...',
	NONE: '',
	LOADED: '',
	SAVE: 'Save...',
	NETWORK_ERROR: 'Network error: ',
	ERROR: 'Error: '
};

$RbModel.prototype.events = {
    STARTED: 'rb_model_started',
    READY: 'rb_model_ready'
};

$RbModel.prototype.setId = function ( ___id ) {
	const self = this;
	self.id = ___id;
	return self;
};

$RbModel.prototype.setLoader = function ( ___loader ) {
	const self = this;
	self.loader = ___loader;
	return self;
};

$RbModel.prototype.setModelUrl = function ( ___url ) {
	const self = this;
	self.modelUrl = ___url;
	return self;
};

$RbModel.prototype.addEventListener = function (__event, __listener) {
    const self = this;
    self.listeners.push({event: __event, listener: __listener});
};

$RbModel.prototype.send_event = function(__event, __data){
    const self = this;
    self.$rootScope.$broadcast(__event, __data);
    _.chain(self.listeners)
        .where({event: __event})
        .each(function (__listener) {
            __listener.listener();
        });
};

/**
 * initialization data model
 * load model configuration and load model components
 * @param __model_js - url datamodel js file
 */
//$RbModel.prototype.init = function( __model_url ){
/**
 */
$RbModel.prototype.init = function( ){
    const self = this;

    let __rb_model_loader = new $RbModelLoader(
    	{
		    model: self,
		    model_url: self.modelUrl
    	} );

    self.send_event( $RbModel.prototype.events.STARTED, { data: self.modelUrl } );
    __rb_model_loader.start();

    return self;
};

$RbModel.prototype.loadModel = function( ){
	const self = this;

	let __rb_model_loader = new $RbModelLoader(
		{
			model: self,
			model_url: self.modelUrl
		} );

	self.send_event( $RbModel.prototype.events.STARTED, { data: self.modelUrl } );
	__rb_model_loader.start();

	return self;
};

$RbModel.prototype.getEmptyValueForDataType = function( ___db_type ){
    let ___out = null;
    switch (___db_type.toUpperCase()){
        case 'INT':
        case 'NUMBER':
        case 'NUMERIC':
            ___out = 0;
            break;
        case 'DATE':
        case 'DATETIME':
            ___out = null;
            break;
        case 'STRING':
        case 'TEXT':
        default:
            ___out = '';
    }
    return ___out;
};

$RbModel.prototype.setDefaults = function (__options) {
    const self = this;
    self.default_database = __options.hasOwnProperty('database') ? __options.database : null;
    self.default_database_engine = __options.hasOwnProperty('database_engine') ? __options.database_engine : null;
};

/**
 * find form by application and form names
 */
$RbModel.prototype.getApplicationForm = function (___application_name, ___form_name) {
	const self = this;
	let ___app = _.findWhere( self.applications, { id:  ___application_name } );

	if( _.isUndefined( ___app ) ){
	    return null;
    }else{
		let ___form = _.findWhere( ___app.forms, { id:___form_name  } );
		if( _.isUndefined( ___form ) ){
		    return null;
		}else{
		    return ___form;
        }
    }
};

$RbModel.prototype.renderApplicationForm = function ( ___options ) {
	const self = this;

	if( self.form && !self.form.rendered )
	{

		if( !_.isUndefined( ___options ) ){
			self.form.preRendering( ___options );
		}

		 self.form.render_options.timeout(function() {

			 let ___container_elem = angular.element(document.getElementById("APPLICATION_FORM_CONTAINER_ID"));

			 //let ___formElement = angular.element(self.form.template);
			 let ___formElement = angular.element( self.form.compiledTemplate );
			___container_elem.append(___formElement);
			self.form.render_options.compile(___formElement)(self.form.render_options.scope);

			_.each(self.form.datasources, function (___ds) {
				self.load(
					___ds,
					{
						page: 1,
						scope: self.form.render_options.scope,
						search_by_id: self.form.getParameter( self.form.render_options.routeParams,  ___ds)
					}
				);
			});

			self.form.postRendering();

		 }, 100 );
	}
};

/**
 * prepare form
 * compile form element
 * modify DOM
 * load datasorces
 *
 * @param ___options
 * @param ___wait_initialization
 */
$RbModel.prototype.initApplicationForm = function (___options, ___wait_initialization) {
	const self = this;

	// console.log("initApplicationForm " + ___options.form_name);

	self.form = self.getApplicationForm( ___options.application_name, ___options.form_name );

	if( self.form ){

		if( ___wait_initialization === "FORCE" )
		{
			self.renderApplicationForm( ___options );
		} else {
			self.form.preRendering( ___options );
		}

    }else{

	    if( ___wait_initialization === "WAIT" ) {
			self.wait_forms.push(___options);
		}

    }
};

$RbModel.prototype.getForm = function (__options) {
	const self = this;
	let ___form = _.findWhere(self.forms, __options);

	if( _.isUndefined( ___form )){
		___form = null;
	}

	return ___form;
};

$RbModel.prototype.setApplications = function ( ___applications ) {
	const self = this;
	self.applications = [];
		self.applications = _.map(___applications, function ( __application ) {
		__application["model"] = self;
		return __application;
	});
};

$RbModel.prototype.initApplications = function () {
	const self = this;
	//self.applications = _.sortBy( self.applications, "order" );

	self.applications = _.chain( self.applications )
		.filter( { "enabled": true } )
		.sortBy( "order" )
		.each( function ( __application ) {

			__application.forms = _.chain( __application.forms )
				.filter( { "enabled": true } )
				.sortBy( "order" )
				.map( function ( ___form )
				{
					let ___form_definition = _.chain( self.forms )
                        .filter( { "enabled": true } )
                        .findWhere( { id: ___form.id } )
                        .value();

					if(_.isUndefined(___form_definition))
					{
						___form["enabled"] = false;
						return ___form;
					}else{
						return ___form_definition.extendObject( ___form ).initApplication( __application );
                    }

				})
				.filter( { "enabled": true } )
				.value();

		})
		.value();

	return self;
};

$RbModel.prototype.initForms = function () {
	const self = this;
	self.forms = _.sortBy( self.forms, "order" );
	return self;
};

/**
 * data model loaded and initialzed
 * @param __options - optional info
 */
$RbModel.prototype.modelReady = function (__options) {
    const self = this;

	__options = Object.assign( {}, __options );
    // if(typeof __options == undefined) {
    //     __options = {};
    // }

	self.initForms();
	self.initApplications();

    /**
     * register listvalues & datasources after model initialization
     */
    self.registerDataSource(self.listvalues.ds);

    for(let __i=0; __i < self.wait_scopes.length; __i++){
	    let ___wait_scopes_item = self.wait_scopes[__i];
	    let ___scope = ___wait_scopes_item["scope"];
	    let ___dataSource_id = ___wait_scopes_item["dataSource_id"];
	    let ___datasource = self.get_registered_service(___dataSource_id);
	    let ___action = ___wait_scopes_item["action"];


        if(typeof ___datasource !== undefined) {
            if(___scope !== undefined && ___scope) {
                ___scope.service = ___datasource;
            }
            if(___wait_scopes_item.hasOwnProperty('search_by_id')){
                ___datasource.search_by_id = ___wait_scopes_item['search_by_id'];
            }
            if(___action){
                self.addTransaction(new $RbTransaction(self, ___datasource, ___action, ___wait_scopes_item));
            }
        }
    }

    self.wait_scopes = [];

    self.ready = true;

	for( let __i=0; __i < self.wait_forms.length; __i++ ){
		self.initApplicationForm(self.wait_forms[__i], "FORCE");
	}

	self.wait_forms = [];

    self.send_event($RbModel.prototype.events.READY, __options);

    self.next_transaction();

};


/**
 * processModelComponent
 *
 * create loaded model objects (datasources, forms)
 *
 * @param __json
 */
$RbModel.prototype.processModelComponent = function (__json) {
	const self = this;

	if( !__json.hasOwnProperty( "component_type" ) )
	{

		if( __json.hasOwnProperty( "columns" ) ) {
			__json["component_type"] = "datasource";
		}

		if( __json.hasOwnProperty( "template" ) || __json.hasOwnProperty( "layout" ) || __json.hasOwnProperty( "numberOfBlocks" ) ) {
			__json["component_type"] = "form";
		}

	}

    switch ( __json.component_type )
    {
        case "datasource" :
	        self.createDataSource( __json );
            break;
        case "form" :
	        self.createForm( __json );
	        break;
    }

};

$RbModel.prototype.registerForm = function (__form) {
	const self = this;
	self.forms.push( __form );
	return self;
};

$RbModel.prototype.createForm = function (__json) {
	const self = this;
	let ___ds = new $RbForm( __json );
	self.registerForm( ___ds ) ;
	return self;
};

/**
 *  create datasource object by JSON data
 * @param __srv
 */
$RbModel.prototype.createDataSource = function(__srv){
	const self = this;
	let ___ds = self.get_registered_service(__srv.id);
	if(!___ds){
		let ___ds = new $RbDataSource(__srv);
		self.registerDataSource(___ds);
	}
	return ___ds;
};


$RbModel.prototype.generateJSON = function (__srv_name) {
    const self = this;
	let ___srv_json = window[__srv_name].toJSONimage();
    console.log("\n");
	let ___str_srv_json = JSON.stringify(___srv_json, function (___key, ___value) {
        if(___key === '__proto__') return undefined;
        else return ___value;
    });
    console.log(___str_srv_json);
    console.log("\n");
};

$RbModel.prototype._resetStatus = function(__ds, __msg, __ok, __err){
    //const self = this;
    __ds.status.success = __ok;
    __ds.status.error = __err;
    if(__msg)
        __ds.status.message = __msg;
    else
        // __ds.status.message = $RbModel.prototype.MESSAGE.BUSY;
	    __ds.status.message = $RbModel.prototype.MESSAGE.NONE;
};

/**
 * indicate transaction status
 * @param __srv
 * @param __msg
 * @param __ok
 * @param __err
 */
$RbModel.prototype.resetStatus = function(__srv, __msg, __ok, __err){
    const self = this;
    self._resetStatus(self, __msg, __ok, __err);
    self._resetStatus(__srv, __msg, __ok, __err);
	let __tbl_msg = typeof(__srv.title) === undefined ? __srv.table : __srv.title;
    if(self.messages.length >= 5)
        self.messages.shift();
    self.messages.push(__srv.status.message + " " + __tbl_msg);
};

/**
 * transaction - currently being processed
 * @type {{dataSource: null, action: string, row_index: number, columns: Array, data: {}, rollback_data: {}}}
 */
$RbModel.prototype.transaction = null;

/**
 *  transactions queue
 * @type {Array}
 */
$RbModel.prototype.transaction_queue = [];

$RbModel.prototype.addTransaction = function (__transaction) {
    const self = this;
    self.transaction_queue.push(__transaction);
};

/**
 * init columns of __data_row relations values
 * @param __dataSource
 * @param __data_row
 */
$RbModel.prototype.set_relation_data = function(__trg_dataSource_id, __data_row){
    const self = this;
    _.chain(self.relations)
        .each(function (__relation) {

        	if( __relation.target.datasource.toUpperCase() === __trg_dataSource_id.toUpperCase() ){
		        let __src_dataSource = self.get_registered_service( __relation.source.datasource );
		        if( __src_dataSource ){
			        __data_row[ __relation.target.column ] = __src_dataSource.getColumnValue( __relation.source.column );
		        }
	        }

        });
};

$RbModel.prototype.do_relations = function(__dataSource){
    const self = this;

    _.chain(self.relations)

        .each( function ( __relation ) {

        	if( __relation.source.datasource === __dataSource.id ) {

		        __dataSource.prepareRelationInfo( __relation.source );

		        let __relation_service = self.get_registered_service(__relation.target.datasource);
		        let __currentRowData = __dataSource.currentDataRow();

		        if ( __relation_service && __currentRowData ) {
			        __relation_service.prepareRelationInfo( __relation.target );
			        let __transaction = new $RbTransaction(
				        self,
				        __relation_service,
				        'R',
				        {
					        key: __relation.target.column,
					        value: [ __currentRowData[ __relation.source.column ] ],
					        parent_row: __currentRowData
				        });
			        self.addTransaction(__transaction);
		        } else {
			        self.$log.error('RELATION: data source [' + __relation.target.datasource + '] not found');
		        }
	        }
        });

    self.next_transaction();
};


/**
 * do next transaction in transactions queue
 * @returns {*}
 */
$RbModel.prototype.next_transaction = function(){
    const self = this;
    if(self.busy)return $RbModel.prototype.TRANSACTION.TRANSACTION_BUSY;
    if(self.transaction_queue.length === 0)return $RbModel.prototype.TRANSACTION.TRANSACTION_EMPTY;
	let __tr = _.first(self.transaction_queue);
    if(__tr !== undefined){
        self.transaction_queue = _.rest(self.transaction_queue);
        switch (__tr.action.toUpperCase()){
            case "R":
                __tr.dataSource.filter = {expression: "", values: []};
                __tr.dataSource.relation = __tr.data;
                self.load( __tr.dataSource );
                break;
            case "S":
                self.load( __tr.dataSource, __tr.data );
                break;
            case "I":
            case "U":
            case "D":
                self.transaction = __tr.commit();
                break;
        }
        return $RbModel.prototype.TRANSACTION.TRANSACTION_IN_PROGRESS;
    }else{
        return $RbModel.prototype.TRANSACTION.TRANSACTION_EMPTY;
    }
};

$RbModel.prototype.commitTransaction = function () {
    const self = this;
    if(self.transaction){
        self.transaction.commit();
        self.save(self.transaction);
    }
};

$RbModel.prototype.rollbackTransaction = function () {
    const self = this;
    if(self.transaction){
        self.transaction.rollback();
    }
};


$RbModel.prototype.row_editor_template = '<md-dialog aria-label="rbModel.transaction.dataSource.editor_title">\n' +
	'\n' +
	'        <form method="post" enctype="multipart/form-data" style="display: table;">\n' +
	'\n' +
	'            <md-toolbar style="min-height: 40px;">\n' +
	'                <div class="md-toolbar-tools" style="height: 40px;">\n' +
	'                    <h4>{{rbModel.transaction.dataSource.editor_title}}</h4>\n' +
	'                    <span flex></span>\n' +
	'                    <ng-md-icon icon="close" style="cursor: pointer;" ng-click="cancel()"></ng-md-icon>\n' +
	'                </div>\n' +
	'            </md-toolbar>\n' +
	'\n' +
	'            <md-dialog-content >\n' +
	'                <div class="md-dialog-content" style="padding: 6px 24px 0px 24px">\n' +
	'                        <div ng-repeat="v_column in rbModel.transaction.columns  | filter: {editable: true }" style="margin: 1px; display: table-row;">\n' +
	'\n' +
	'                            <div style="display: table-cell; margin-right: 5px;" layout="row" layout-align="start center">\n' +
	'                                <span>{{v_column.title}}</span>\n' +
	'                                <p ng-class="v_column.message_class">{{v_column.message}}</p>\n' +
	'                            </div>\n' +
	'\n' +
	'                            <div ng-if="v_column.listvalues == null && v_column.combobox == null  && v_column.sequence == null" style="display: table-cell;">\n' +
	'                                <div ng-if="v_column.editable">\n' +
	'                                    <div ng-switch on="v_column.db_type">\n' +
	'\n' +
	'                                        <div ng-switch-when="NUMBER" >\n' +
	'                                            <input type="number"  ng-focus="hide_listvalues()" ng-model="rbModel.transaction.data[v_column.db_name]" class="long" style="width: 100%;">\n' +
	'                                        </div>\n' +
	'\n' +
	'                                        <div ng-switch-when="FILE" >\n' +
	'                                            <input type="file" id="input_document_file_id" target_field="{{v_column.db_name}}" name="document_file" file-selector-on-change="fileToUploadChanged">\n' +
	'                                        </div>\n' +
	'\n' +
	'                                        <div ng-switch-when="TEXT" >\n' +
	'                                            <textarea rows="4" cols="50" ng-focus="hide_listvalues()" placeholder="{{v_column.title}}" style="width: 100%;" ng-model="rbModel.transaction.data[v_column.db_name]" ng-required="false" class="form-control"></textarea>\n' +
	'                                        </div>\n' +
	'\n' +
	'                                        <div ng-switch-when="DATE" >\n' +
	'                                            <md-datepicker ng-model="rbModel.transaction.data[v_column.db_name]" ng-focus="hide_listvalues()"></md-datepicker>\n' +
	'                                        </div>\n' +
	'\n' +
	'                                        <div ng-switch-default >\n' +
	'                                            <input type="text"  ng-focus="hide_listvalues()" ng-model="rbModel.transaction.data[v_column.db_name]" class="long" style="width: 100%;">\n' +
	'                                        </div>\n' +
	'\n' +
	'                                    </div>\n' +
	'                                </div>\n' +
	'\n' +
	'                                <div ng-if="!v_column.editable">\n' +
	'                                    <input type="text" ng-model="rbModel.transaction.data[v_column.db_name]" disabled>\n' +
	'                                </div>\n' +
	'\n' +
	'                            </div>\n' +
	'\n' +
	'                            <div ng-if="v_column.listvalues != null">\n' +
	'                                <input type="text"  ng-model="rbModel.transaction.data[v_column.db_name]">\n' +
	'                                <ng-md-icon icon="list" listvalues-button-column="{{v_column}}"><md-tooltip md-direction="right">Список значений</md-tooltip></ng-md-icon>\n' +
	'                            </div>\n' +
	'\n' +
	'                            <div ng-if="v_column.sequence != null">\n' +
	'                                <input type="text" ng-model="rbModel.transaction.data[v_column.db_name]">\n' +
	'                                <ng-md-icon icon="plus_one" sequencer-button-column="{{v_column}}"><md-tooltip md-direction="right">Получить следующий номер</md-tooltip></ng-md-icon>\n' +
	'                            </div>\n' +
	'\n' +
	'                            <div ng-if="v_column.combobox != null" style="padding-top: 3px; padding-bottom: 3px;">\n' +
	'                                <rb-data-combobox combobox-column="{{v_column}}" label="v_column.title" placeholder="{{v_column.title}}"><md-tooltip md-direction="right">Список возможных значений для {{v_column.title}}</md-tooltip></rb-data-combobox>\n' +
	'                            </div>\n' +
	'\n' +
	'                        </div>\n' +
	'                </div>\n' +
	'            </md-dialog-content>\n' +
	'\n' +
	'            <md-dialog-actions layout="row">\n' +
	'                <span flex></span>\n' +
	'                <md-button class="md-raised md-primary" ng-click="ok()" ng-show="$root.user.logged" aria-label="ОК">OK</md-button>\n' +
	'                <md-button class="md-raised" ng-click="cancel()" aria-label="Cancel">Cancel</md-button>\n' +
	'            </md-dialog-actions>\n' +
	'\n' +
	'        </form>\n' +
	'\n' +
	'</md-dialog>\n';

/**
 * create new record in DataSource
 * @param __dataSource
 */
$RbModel.prototype.create = function(__dataSource, __event){
    const self = this;

    if (typeof __dataSource === undefined || !__dataSource) {
        return;
    }
    if(!__dataSource.insert_enabled) {
        return;
    }
    if(!self.logged) {
        return;
    }

    __dataSource.editor_title = 'New';
    __dataSource.before_new_row();

    self.transaction = new $RbTransaction(self, __dataSource, 'I');

    self.$mdDialog.show({
        controller: "RbEditorModalCtrl",
//        templateUrl: 'tmpl/row_editor.html',
	    template: $RbModel.prototype.row_editor_template,
        parent: angular.element(document.body),
        targetEvent: __event
    })
        .then(function(answer) {
            self.transaction.commit();
        }, function() {
            self.transaction.rollback();
        });
};

/**
 * edit current record in DataSource
 * @param __dataSource
 * @param __row_index
 */
$RbModel.prototype.edit = function(__dataSource, __row_index, __event) {
    const self = this;
    if (typeof __dataSource === undefined || !__dataSource) {
        return;
    }

    if( self.form ){
    	let ___action = self.form.getAction( {
		    "event": "doubleclick",
		    "datasource": __dataSource.id
    	} );

    	if( ___action ){
    		switch (___action.action)
		    {
			    case "OPEN_FORM" :
				    let __column_value = __dataSource.getColumnValue( ___action.column );

				    if( !__column_value ){
					    console.warn('From action [' + self.form.id + "] column [" + __action.column + "] not defined or null.");
				    }

				    let __target_form = self.getForm( { id: ___action.target } );

				    if( !__target_form ){
					    console.warn('From action [' + self.form.id + "] form [" + __action.target + "] not defined or null.");
				    }


				    if ( __column_value && __target_form ) {

					    let ___parameters = {};
					    ___parameters[___action.parameter] = __column_value;
					    //self.$location.search( ___parameters ).path('/document');
					    self.$location.search( ___parameters ).path(__target_form.path);

				    }
			    	break;

		    }
	    }
	    else
	    {

		    if( !__dataSource.update_enabled ) {
			    return;
		    }
		    if( !self.logged ) {
			    return;
		    }

		    // default action - editing record
		    // __dataSource.editor_title = 'Редактировать запись';
		    __dataSource.editor_title = 'Edit';
		    self.transaction = new $RbTransaction( self, __dataSource, 'U' );

		    self.$mdDialog.show({
			    controller: "RbEditorModalCtrl",
			    // templateUrl: 'tmpl/row_editor.html',
			    template: $RbModel.prototype.row_editor_template,
			    parent: angular.element( document.body ),
			    targetEvent: __event
		    }).then(function(answer) {
			    self.transaction.commit();
		    }, function() {
			    self.transaction.rollback();
		    });

	    }
    }

    // __dataSource.editor_title = 'Редактировать запись';
    // self.transaction = new $RbTransaction(self, __dataSource, 'U');
    //
    // self.$mdDialog.show({
    //     controller: "RbEditorModalCtrl",
    //     templateUrl: 'tmpl/row_editor.html',
    //     parent: angular.element(document.body),
    //     targetEvent: __event
    // }).then(function(answer) {
    //     self.transaction.commit();
    // }, function() {
    //     self.transaction.rollback();
    // });
};


/**
 * delete marked records in DataSource
 * @param __dataSource
 */
$RbModel.prototype.delete = function(__dataSource){

    const self = this;

    if(!self.logged) {
        return;
    }

    if(!__dataSource.delete_enabled){
        return;
    }

    let __str_id =
        _.chain(__dataSource.dataset)
            .where({select: true})
            .pluck("id")
            .map(function(__id){return __id;})
            .value()
            .join(", ");
    __str_id = "(" + __str_id + ")";

    self.transaction = new $RbTransaction(self, __dataSource, 'D', {id: __str_id});
    self.transaction.commit();
};

$RbModel.prototype.getDataSourceHTTPData = function(__dataSource, __options){
    const self = this;

    if(__options === undefined) {
        __options = {};
    }

    let __include_columns = __options.hasOwnProperty("include_columns") ? __options['include_columns'] : false;
    let __all_rows = __options.hasOwnProperty("all_rows") ? __options['all_rows'] : false;
    let __only_visible = __options.hasOwnProperty("only_visible") ? __options['only_visible'] : false;
    let __only_printable = __options.hasOwnProperty("only_printable") ? __options['only_printable'] : false;
    let __filter_description = __options.hasOwnProperty("filter_description") ? __options['filter_description'] : false;

    let __database = __dataSource.database;
    let __table = __dataSource.table;
    let __title = __dataSource.title;
    let __columns = __dataSource.columns;
    let __filter = __dataSource.filter;
    let __orderby = __dataSource.orderby;
    let __groupby = __dataSource.groupby;
    let __page = __dataSource.page;
    let __page_length = __dataSource.page_length;
    let __filter_description_value = __filter_description ? __dataSource.filter_description : '';


    let __limit = '';
    if(!__all_rows){
        if (__page != null && __page_length != 0) {
            __limit = ((__page - 1) * __page_length) + ',' + __page_length;
        }
    }

    let ___where = {db: true, query: true};
    if(__only_visible){
        ___where["visible"] = true;
    }

    if(__only_printable){
        ___where["printable"] = true;
    }

    let __columns_str =
        _.chain(__columns)
            .where(___where)
            .pluck("db_name")
            .value()
            .join();

    let ___orderby = __orderby.length > 0 ? __orderby.join() : '';

    let ___groupby = __groupby.length > 0 ? __groupby.join() : '';

    let __data = {
        database:   __database,
        table:      __table,
        title:      __title,
        columns:    __columns_str,
        filter:     __filter,
        filter_description: __filter_description_value,
        groupby:    ___groupby,
        having:     '',
        orderby:    ___orderby,
        limit:      __limit
    };

    if(__include_columns){
        __data["columns_obj"] = _.chain(__columns)
            .where(___where)
            .map(function (__column) {
                return __column.getSimpleObject();
            })
            .value();
    };

    return __data;
};

$RbModel.prototype.load_as_file = function(__dataSource, __options){
    const self = this;

    if(__options === undefined) {
        __options = {};
    }

    if(typeof __dataSource === 'string'){
        let __dataSourceId = __dataSource;
        __dataSource = self.get_registered_service(__dataSourceId, __options);
    }

    if(!__dataSource){
        return;
    }

    let __data = self.getDataSourceHTTPData(__dataSource, __options);
    let deffered = self.$q.defer();

    self.$http({
        method: 'POST',
        url: self.url+"/excel.json",
        data: __data,
        headers: {
            //'Content-type': 'application/octet-stream'
            'Content-type': 'application/json'
        },
        responseType: 'arraybuffer'
    }).then(function(data) {
        deffered.resolve(data.data, data.status, data.headers, data.config);
    }).catch(function(data) {
        deffered.reject(data.data, data.status, data.headers, data.config);
    });

    deffered.promise.then(
        function(__data, __status, __headers, __config) {
            let blob = new Blob([__data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
            fileSaver.saveAs(blob, __dataSource.title + ' ' + moment().format('DD.MM.YYYY') + ".xlsx");
        },
        function(__data, __status, __headers, __config) {
            self.resetStatus(__dataSource, $RbModel.prototype.MESSAGE.NETWORK_ERROR + __data, false, true);
        }
    );
};


/**
 * handle network error
 * @param error
 */

$RbModel.prototype.handleError = function(error, ds){
	const self = this;

	let __err_msg = '';
	if(typeof error === 'string'){
		__err_msg = error;
	}else{
		let _err = Object.assign( {message: '', code: '', sqlState: '', errno: '', sqlMessage: ''}, error );
		// __err_msg = 'message: '+_err.message + " code: "+_err.code + ' sqlState:'+_err.sqlState+' errno:'+_err.errno;
		__err_msg = _.chain(_err)
			.omit('sql')
			.pairs()
			.filter( err => err[1] )
			.map( err => err.join(': ') )
			.value()
			.join('; ');
	}
	if(ds) {
		self.resetStatus(ds, $RbModel.prototype.MESSAGE.ERROR + __err_msg, true, false);
	}
	self.$log.error(__err_msg);
};

/**
 *
 * @param __dataSource
 * @param __load_options
 * @returns {Promise}
 * @private
 */
$RbModel.prototype._load = function( __dataSource, __load_options ){
    const self = this;

    let __data = self.getDataSourceHTTPData( __dataSource, __load_options );
    //let deffered = self.$q.defer();

    self.busy = true;
    __dataSource.busy = true;

    return self.loader.load( self.url + "/load.json",  __data);

    // self.$http({
    //     method: 'POST',
    //     url: self.url+"/load.json",
    //     data: __data
    // }).then(function(data) {
    //     deffered.resolve(data.data, data.status);
    // }).catch(function(data) {
    //     deffered.reject(data.data, data.status);
    // });
    // return deffered.promise;
};


/**
 * load data for data source
 * @param __dataSource
 * @param __page
 * @param __force
 * @param __callback
 */
$RbModel.prototype.load = function( __dataSource, __options ){
    const self = this;

    if(__options === undefined) {
        __options = {};
    }

    let __callback = __options.hasOwnProperty("callback") ? __options['callback'] : null;
    let __page = __options.hasOwnProperty("page") ? __options['page'] : 1;
    let __force = __options.hasOwnProperty("force") ? __options['force'] : true;
    let __scope = __options.hasOwnProperty("scope") ? __options['scope'] : null;
    let __page_length = __options.hasOwnProperty("page_length") ? __options['page_length'] : -2;
    let __include_columns = __options.hasOwnProperty("include_columns") ? __options['include_columns'] : false;

    if(typeof __dataSource === 'string'){
        let __dataSourceId = __dataSource;

        if(!self.ready) {
            __options["action"] = 'S';
        }

        if(__scope === undefined){
            __dataSource = self.get_registered_service(__dataSourceId, __options);
        }else {
            __dataSource = self.get_registered_service(__dataSourceId, __options);
            if(__dataSource) {
                __scope.service = __dataSource;
            }
        }
    }

    if(!__dataSource){
        return;
    }

    if(!self.ready){
	    //self.addTransaction(new $RbTransaction(self, __dataSource, 'S', __options));
        return;
    }

    if(self.busy){
        self.addTransaction(new $RbTransaction(self, __dataSource, 'S', __options));
    }

    if(!__page) __page = 1;

    if(__page_length > -2){
        __dataSource.setPageLength(__page_length);
    }

    if(!__force) {
        if (__dataSource.dataset.length > 0) {
            if (__dataSource.page_length === 0){
                if (__callback !== undefined) {
                    __callback(true);
                }
                return;
            }else{
                if (__dataSource.page === __page) {
                    if (__callback !== undefined) {
                        __callback(true);
                    }
                    return;
                }
            }
        }
    }

    try{
        __dataSource.before_query();
    }catch(err){
    	self.$log.error(err);
    }


    try{
        __dataSource.before_relation_query();
    }catch(err){
    	self.$log.error(err);
    }

    self.resetStatus(__dataSource);
    __dataSource.page = __page;

    __dataSource.status.loaded = false;
    __dataSource.status.inserted = false;
    __dataSource.status.updated = false;
    __dataSource.status.deleted = false;

    let __load_options = {
        include_columns: __include_columns
    };

    let __load = self._load( __dataSource, __load_options );
    __load.then(
        function(__data, __status) {
            self.busy = false;
            self.resetStatus(__dataSource, $RbModel.prototype.MESSAGE.LOADED, true, false);
            __dataSource.dataset = __data.result;
            __dataSource.total_rows = __data.total_rows;
            __dataSource.updated = false;

            __dataSource.status.loaded = true;

            try{
                let __cols_date = _.chain(__dataSource.columns).where({db_type: 'DATE'}).value();
                if(__dataSource.dataset != null){
                    for(let __r=0; __r < __dataSource.dataset.length; __r++){
                        __dataSource.dataset[__r] = $RbTransaction.prototype.afterCommit(__dataSource.dataset[__r], __dataSource.columns, true)
                    }
                }
            }catch(err){
                self.$log.error(err);
            };

            __dataSource.after_data_loaded(true);

            self.busy = false;

            //self.do_relations(__dataSource);
            self.select_row(__dataSource, 0);

            // let __next_transaction_result =  self.next_transaction();
            // switch (__next_transaction_result){
            //     case $RbModel.prototype.TRANSACTION.EMPTY :
            //         self.select_row(__dataSource, 0);
            //         break;
            //     case $RbModel.prototype.TRANSACTION.BUSY :
            //     case $RbModel.prototype.TRANSACTION.IN_PROGRESS :
            //         break;
            // }

            if(__callback) {
                __callback(true);
            }
        },
        /**
         * network or other error
         * @param __data
         * @param __status
         */
        function(__data, __status) {
            self.busy = false;
            __dataSource.after_data_loaded(false);
            // self.resetStatus(__dataSource, "Network error " + __data, false, true);
	        self.handleError( __data.error ? __data.error : __data, __dataSource);
            self.next_transaction();
            if(__callback) {
                __callback(false);
            }
        }
    );
};

$RbModel.prototype._save = function(_transaction){
    const self = this;

	let __data = _transaction.getSaveObject();
    _transaction.dataSource.busy = true;
	return self.loader.load( self.url+"/save.json",  __data);

};

$RbModel.prototype.save = function(_transaction){
    const self = this;

    if(!self.logged) {
        return;
    }

    if(self.busy){
        self.transaction_queue.push(_transaction);
        return;
    }

    self.busy = true;
    self.resetStatus(_transaction.dataSource, $RbModel.prototype.MESSAGE.SAVE, false, false);
    let __save = self._save( _transaction );
    __save.then(
        function(__data, __status){
            self.busy = false;
            if(__data.error){
                self.handleError(__data.error, _transaction.dataSource);
            }else {
                switch (_transaction.action.toUpperCase()) {
                    case "I" :
                        _transaction.fixInsert(__data.result);
                        break;
                    case "U" :
                        _transaction.fixUpdate(__data.result);
                        break;
                    case "D" :
                        _transaction.fixDelete(__data.result);
                        break;
                }
                self.busy = false;
                self.resetStatus(_transaction.dataSource, $RbModel.prototype.MESSAGE.LOADED, true, false);
                self.updated = false;

                _transaction.dataSource.after_data_saved(true);

                _transaction.dataSource.status.inserted = false;
                _transaction.dataSource.status.updated = false;
                _transaction.dataSource.status.deleted = false;
            }
            self.next_transaction();
        },
        function(__data, __status) {
            _transaction.dataSource.after_data_saved(false);
            self.busy = false;
            self.resetStatus(_transaction.dataSource, $RbModel.prototype.MESSAGE.NETWORK_ERROR + __data, false, true);
            self.next_transaction();
        }
    );
};

$RbModel.prototype.upload = function(__files, __target){
    const self = this;

    if(!self.logged) {
        return;
    }

    let __data = new FormData();
    __data.append('mode', 'documents');
    _.each(__files,
        function(__file){
            __data.append('file[]', __file);
        }
    );

    let deffered = self.$q.defer();

    self.$http({
        method: 'POST',
        url: self.url+"/upload.json",
        headers: {
            'Content-Type': undefined
        },
        data: {
            "files[]": __files[0],
            "mode": 'documents',
            "target": __target
        },
        transformRequest: function(data) {
            let fd = new FormData();
            angular.forEach(data, function(value, key) {
                fd.append(key, value);
            });
            return fd;
        }
    }).then(function(data) {
        deffered.resolve(data.data, data.status);
    }).catch(function(data) {
        deffered.reject(data.data, data.status);
    });

    deffered.promise.then(
        function(__data, __status) {
            self.$log.error(__data);
            _.each(__data.results, function(__row){
                self.transaction.data[__row["target_field"]] = __row["name"];
            });
        },
        function(__data, __status) {
            self.$log.error(__data);
        }
    );
};

$RbModel.prototype.before_relation_query = function(__dataSource){
    const self = this;
};

$RbModel.prototype.search = function(__dataSource){
    const self = this;
    self.$location.search({});
    self.load(__dataSource);
};

$RbModel.prototype.doSearch = function(__dataSource_id, __search_mask){
    const self = this;
    let __dataSource = _.findWhere(self.data_services, {id: __dataSource_id});
    if(typeof __dataSource !== undefined){
        __dataSource.search_mask = __search_mask;
        self.load(__dataSource);
    }
};

$RbModel.prototype.registerDataSource = function(__srv){
    const self = this;

    let __exist_srv = _.findWhere(self.data_services, {id: __srv.id});
    if(__exist_srv === undefined){

        __srv["$cookies"]  = self.$cookies;
        __srv["$localStorage"]  = self.$localStorage;
        __srv["$sessionStorage"]  = self.$sessionStorage;

        __srv.registerInModel(self);

        self.dataSources[__srv.id] = __srv;
        self.data_services.push(__srv);

    }else{
        // datasource exist - replace registered datasource with new instance
        let ___idx = _.indexOf(self.data_services, __exist_srv);
        if(___idx >= 0){
            self.data_services[___idx] = null;
            self.$rootScope[__srv.id] = null;
            self.data_services[___idx] = __srv;
            self.$rootScope[__srv.id] = __srv;
        }
    }

    if(__srv.autoload){
        __srv.load();
    }

};

$RbModel.prototype.get_registered_service = function(__dataSource_id, __options){
    const self = this;
    let __dataSource = _.findWhere(self.data_services, {id: __dataSource_id});

    if(__dataSource !== undefined){
        if(__options !== undefined){
            if(__options.hasOwnProperty('search_by_id')){
                __dataSource.search_by_id = __options['search_by_id'];
            }
        }
        //return __dataSource;
    }else{
        __dataSource = null;
    }

    if(self.ready) {

    }else{
        let __ds_register = _.findWhere(self.wait_scopes, {dataSource_id: __dataSource_id});

        if (__options !== undefined) {
            __options["dataSource_id"] = __dataSource_id;
            let ___cr_tr = typeof __ds_register === undefined ? true : false;
            if(!___cr_tr) {
                /**
                 * TODO check !!!!!
                 */
                //__options["action"] = null;
            }
            self.wait_scopes.push(__options);
        }
    }
    //return null;
    return __dataSource;
};

$RbModel.prototype.select_row = function(__dataSource, __row_index){
    const self = this;
    if(__dataSource) {
        __dataSource.set_current_row(__row_index);
        self.mark_current_record(__dataSource);
        self.do_relations(__dataSource);
    }
};


$RbModel.prototype.mark_current_record = function(__dataSource){
    if(__dataSource) {
        _.each(
            __dataSource.dataset,
            function (_elem) {
                _elem['current'] = '';
            }
        );
        if (__dataSource.dataset !== undefined && __dataSource.dataset && __dataSource.dataset[__dataSource.current_row])
            __dataSource.dataset[__dataSource.current_row]['current'] = 'rb-table-current-row';
    }
};

$RbModel.prototype.dowloadFile = function(__file_id){

    let __data = {
        file_id: __file_id
    };

    self.$http({
        method: 'POST',
        url: self.url+"/download.ajax",
        data: __data
    })
};

export default $RbModel;
