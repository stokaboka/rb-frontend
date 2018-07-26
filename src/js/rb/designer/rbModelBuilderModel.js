/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

"use strict";

import $RbApplication from '../core/rbApplication';
import $RbDataSource from '../core/rbDataSource';
import $RbForm from '../core/rbForm';
import $RbFormLayout from '../core/rbFormLayout';
import $RbModelBuilderDataRelation from './rbModelBuilderDataRelation';

let $RbModelBuilderModel = function ( __data ) {
    const self = this;

    self.type = "models";

    //self.designer = designer;

    if( _.isUndefined( __data.model ) ){
    	if( !_.isUndefined( __data.id ) ) {
		    __data.model = {
			    id: __data.id,
			    description: __data["description"]
		    };
	    } else {
		    __data.model = {};
	    }
    }

	if(_.isUndefined( __data.ds )){
		__data.ds = {
			datasources: [],
			applications: [],
			forms: []
		};
	}

	self.status = '';

    self.id = __data.model.hasOwnProperty("id") ? __data.model.id : "";
    self.saved_id = self.id;
    self.description = __data.model.hasOwnProperty("description") ? __data.model.description : "";
	//self.designer = __data.model.hasOwnProperty("designer") ? __data.model.designer : null;
    self.path = __data.model.hasOwnProperty("path") ? __data.model.path : "";
    //self.type = __data.model.hasOwnProperty("type") ? __data.model.type.toUpperCase() : 'JSON';

    self.default = __data.model.hasOwnProperty("default") ? __data.model.default : {database: null, database_engine: null};

    self.datasources = __data.model.hasOwnProperty("datasources") ? __data.model.datasources : [];
    let ___relations = __data.model.hasOwnProperty("relations") ? __data.model.relations : [];

	self.relations = self.initRelations( ___relations );

	self.setApplications( __data.model.applications );

	self.setForms( __data.ds.forms );
	self.setDataSources( __data.ds.datasources );

	/**
	 * # listvalues
	 * @type {Array}
	 */
	self.listvalues = __data.model.hasOwnProperty("listvalues") ? __data.model.listvalues : [];

	/**
	 * # lists
	 * @type {Array}
	 */
	self.lists = __data.model.hasOwnProperty("lists") ? __data.model.lists : [];

	/**
	 * # comboboxes
	 * @type {Array}
	 */
	self.comboboxes = __data.model.hasOwnProperty("comboboxes") ? __data.model.comboboxes : [];

	/**
	 * # sequences
	 * @type {Array}
	 */
	self.sequences = __data.model.hasOwnProperty("sequences") ? __data.model.sequences : [];

	/**
	 * # rowvalidators
	 * @type {Array}
	 */
	self.rowvalidators = __data.model.hasOwnProperty("rowvalidators") ? __data.model.rowvalidators : [];

	/**
	 * # rowfilters
	 * @type {Array}
	 */
	self.rowfilters = __data.model.hasOwnProperty("rowfilters") ? __data.model.rowfilters : [];

	/**
	 * # hierarchymodels
	 * @type {Array}
	 */
	self.hierarchymodels = __data.model.hasOwnProperty("hierarchymodels") ? __data.model.hierarchymodels : [];

	/**
	 * # datamaps
	 * @type {Array}
	 */
	self.datamaps = __data.model.hasOwnProperty("datamaps") ? __data.model.datamaps : [];

	/**
	 * # gadgets
	 * @type {Array}
	 */
	self.gadgets = __data.model.hasOwnProperty("gadgets") ? __data.model.gadgets : [];

	/**
	 * # bindings
	 * @type {Array}
	 */
	self.bindings = __data.model.hasOwnProperty("bindings") ? __data.model.bindings : [];

    self.status = $RbModelBuilderModel.prototype.STATUS.NEW;

	self.selected =
		{
			relation: null,
			listvalue: null,
			combobox: null,
			list: null,
			sequence: null,
			rowvalidator: null,
			rowfilter: null,
			hierarchymodel: null,
			datamap: null,
			binding: null
		};

	return self;

};

$RbModelBuilderModel.prototype.STATUS =
	{
		NEW: "NEW",
		LOADED: "LOADED",
		EDITED: "EDITED",
		SAVED: "SAVED"
	};

$RbModelBuilderModel.prototype.init = function ()
{
	const self = this;
	return self;
};

$RbModelBuilderModel.prototype.setStatus = function ( ___status )
{
	const self = this;
	self.status = ___status;
};

$RbModelBuilderModel.prototype.setDefaultDatabase = function (__database )
{
    const self = this;

    self.default.database = __database.name;
    self.default.database_engine = __database.schema;
    self.default.schema = __database.schema;

};

$RbModelBuilderModel.prototype.setDataSources = function ( __dss )
{
    const self = this;

    self.datasources = null;
    self.datasources = [];

    _.each(__dss, function (__ds) {
        let __ds_obj = new $RbDataSource( __ds, true );
        self.addDataSource(__ds_obj);
    });

	self.setStatus($RbModelBuilderModel.prototype.STATUS.LOADED);

};

$RbModelBuilderModel.prototype.setForms = function ( __forms )
{
	const self = this;

	self.forms = null;
	self.forms = [];

	_.each( __forms, function ( __form ) {
		let __form_obj = new $RbForm( __form );
		self.addForm( __form_obj );
	});

	self.setStatus($RbModelBuilderModel.prototype.STATUS.LOADED);

};

$RbModelBuilderModel.prototype.setApplications = function ( __applications )
{
	const self = this;

	self.applications = null;
	self.applications = [];

	_.each(__applications, function (__application) {
		let __app_obj = new $RbApplication(__application);
		self.addApplication(__app_obj);
	});

	self.setStatus($RbModelBuilderModel.prototype.STATUS.LOADED);

};

$RbModelBuilderModel.prototype.addDataSource = function ( __table )
{
    const self = this;
    __table.setModelInfo(self.path, "JSON");
    self.datasources.push(__table);

	self.setStatus($RbModelBuilderModel.prototype.STATUS.EDITED);
};

$RbModelBuilderModel.prototype.removeDataSource = function ( __table )
{
	const self = this;

	self.datasources = _.reject(self.datasources, function ( ___tbl ) {
		return ___tbl.id === __table.id;
	});

	self.relations = _.reject( self.relations, function ( ___relation ) {
		return ___relation.source.datasource === __table.id || ___relation.target.datasource === __table.id;
	});

	self.setStatus($RbModelBuilderModel.prototype.STATUS.EDITED);
};

$RbModelBuilderModel.prototype.getIdDataSource = function ( __table ) {
	const self = this;
	let test_num_id = 1;
	let id = '';
	while(test_num_id < 100){
		let test_id = __table.table + '_' + test_num_id++;
		if(!self.testIdDataSource({id: test_id})){
			return test_id;
		}
	}
	return null;
};

$RbModelBuilderModel.prototype.testIdDataSource = function ( __test ) {
	const self = this;
	return _.findWhere( self.datasources, __test);
};

$RbModelBuilderModel.prototype.addForm = function ( __form )
{
	const self = this;
	__form.designer = self.designer;
	self.forms.push(__form);
	self.setStatus($RbModelBuilderModel.prototype.STATUS.EDITED);
};

$RbModelBuilderModel.prototype.addApplication = function ( __application )
{
	const self = this;
	self.applications.push( __application );
	self.setStatus($RbModelBuilderModel.prototype.STATUS.EDITED);
};


$RbModelBuilderModel.prototype.getDataSource = function ( __options )
{
	const self = this;
	let __out = _.findWhere(self.datasources, __options);
	if(typeof __out === 'undefined'){
		__out = null;
	}
	return __out;
};

$RbModelBuilderModel.prototype.generateModelObject = function ()
{
    const self = this;
    return {
        id: self.id,
	    saved_id: self.saved_id,
        description: self.description,
        default: self.default,

	    applications: _.map( self.applications, function ( __application )
	    {
		    return __application.toJSONimage();
	    }),

	    forms: _.map( self.forms, function ( __form )
	    {
		    return [ "+", __form.id ,__form.id ];
	    }),

        datasources: _.map( self.datasources, function ( __ds )
        {
            return ["+", __ds.id,__ds.id];
        }),

        relations: _.map( self.relations, function ( __rel )
        {
            /**
             * TODO - Realtions class, serialize to JSON
             */
	        return __rel.toJSONimage();
        }),

	    listvalues: _.map( self.listvalues, function ( __lv )
	    {
		    return __lv;
	    }),

	    comboboxes: _.map( self.comboboxes, function ( __cb )
	    {
		    return __cb;
	    }),

	    lists: _.map( self.lists, function ( __l )
	    {
		    return __l;
	    }),

	    sequences: _.map( self.sequences, function ( __s )
	    {
		    return __s;
	    }),

	    rowvalidators: _.map( self.rowvalidators, function ( __rv )
	    {
		    return __rv;
	    }),

	    rowfilters: _.map( self.rowfilters, function ( __rf )
	    {
		    return __rf;
	    }),

	    hierarchymodels: _.map( self.hierarchymodels, function ( __hm )
	    {
		    return __hm;
	    }),

	    datamaps: _.map( self.datamaps, function ( __dm )
	    {
		    return __dm;
	    }),

	    gadgets: _.map( self.gadgets, function ( __g )
	    {
		    return __g;
	    }),

	    bindings: _.map( self.bindings, function ( __b )
	    {
		    return __b;
	    })

    };

};

$RbModelBuilderModel.prototype.createForm = function ( )
{
	const self = this;

	let __form_obj = new $RbForm(
		{
			"id": "form_" + self.forms.length,
			"title": "FORM_" + self.forms.length,
			"layout": $RbFormLayout.prototype.FORM_LAYOUTS.SINGLE_DATASOURCE.type
		}
	);

	self.forms.push( __form_obj );

};

$RbModelBuilderModel.prototype.createApplication = function (  )
{
	const self = this;

	self.applications.push(new $RbApplication(
		{
			"id": "application"+self.applications.length,
			"title": "APPLICATION_"+self.applications.length
		}
	));

};

$RbModelBuilderModel.prototype.removeApplication = function ( ___application )
{
	const self = this;
	self.applications = _.without( self.applications, ___application );
};

$RbModelBuilderModel.prototype.removeForm = function ( ___form )
{
	const self = this;
	self.forms = _.without( self.forms, ___form );
};

$RbModelBuilderModel.prototype.generateDSObject = function ()
{
    const self = this;

    return {
        id: self.id,
        description: self.description,
        type: "JSON",
        "datasources": _.map(self.datasources, function (__ds) {
            return __ds.toJSONimage();
        }),
	    applications: _.map(self.applications, function (__application) {
		    return __application.toJSONimage();
	    }),
	    forms: _.map(self.forms, function (__form) {
		    return __form.toJSONimage();
	    })
    };

};


$RbModelBuilderModel.prototype.setReferences = function ( ___references_info ) {
	const self = this;
	let ___relations = [];

	_.each( ___references_info, function ( ___reference ) {

		let ___sourceDatasources = _.where( self.datasources, { table: ___reference.TABLE_NAME } );
		let ___targetDatasources = _.where( self.datasources, { table: ___reference.REFERENCED_TABLE_NAME } );

		if( ___sourceDatasources && ___targetDatasources ){
			_.each( ___sourceDatasources, function ( ___sourceDatasource ) {
				_.each( ___targetDatasources, function ( ___targetDatasource ) {
					___relations.push({
						"source":{
							"datasource": ___sourceDatasource.id,
							"column": ___reference.COLUMN_NAME
						},
						"target":{
							"datasource": ___targetDatasource.id,
							"column": ___reference.REFERENCED_COLUMN_NAME
						}
					});
				} );
			});
		}
	});

	self.relations = self.initRelations( ___relations );
};

$RbModelBuilderModel.prototype.initRelations = function( ___relations_info )
{
	//const self = this;
	let ___relations = [];
	_.each(___relations_info, function ( ___relation ) {
		___relations.push(new $RbModelBuilderDataRelation( ___relation ));
	});
	return ___relations;
};

$RbModelBuilderModel.prototype.checkRelation = function( testRelation )
{
	const self = this;
	var out = true;
	if( testRelation.source.datasource === testRelation.target.datasource ){
		console.error("$RbModelBuilderModel.checkRelation error: link to yourself.");
		console.debug( testRelation );
		out = false;
	}

	_.each( self.relations, function ( relation ) {

		if( testRelation.source.datasource === relation.source.datasource
			&& testRelation.source.column === relation.source.column
			&& testRelation.target.datasource === relation.target.datasource
			&& testRelation.target.column === relation.target.column ){
			console.error("$RbModelBuilderModel.checkRelation error: duplicate link.");
			console.debug( testRelation );
			out = false;
		}

		if( testRelation.source.datasource === relation.target.datasource
			&& testRelation.target.datasource === relation.source.datasource ){
			console.error("$RbModelBuilderModel.checkRelation error: recursive link.");
			console.debug( testRelation );
			out = false;
		}

	});

	return out;
};

$RbModelBuilderModel.prototype.addRelation = function( ___relation_info )
{
	const self = this;

	let ___out = true;

	if(___relation_info && ___relation_info.source && ___relation_info.target) {
		let __source = ___relation_info.source.split('.');
		let __target = ___relation_info.target.split('.');

		if (__source.length === 2 && __target.length === 2) {

			let __relation = new $RbModelBuilderDataRelation({
				source: {
					"datasource": __source[0],
					"column": __source[1]
				},
				target: {
					"datasource": __target[0],
					"column": __target[1]
				}
			});

			if( self.checkRelation( __relation ) ){
				self.relations.push( __relation );
				___out = true;
			}else{
				___out =  false;
			}

		} else {
			console.error("$RbModelBuilderModel.addRelation error: wrong format relation data.");
			console.debug( ___relation_info );
			___out =  false;
		}
	}else{
		___out =  false;
	}

	if( ___out ){
		self.setStatus( $RbModelBuilderModel.prototype.STATUS.EDITED );
	}

	return ___out;

};

$RbModelBuilderModel.prototype.removeRelation = function( ___relation )
{
	const self = this;
	self.relations = _.without( self.relations, ___relation );
	self.setStatus( $RbModelBuilderModel.prototype.STATUS.EDITED );
	return true;
};

$RbModelBuilderModel.prototype.redrawRelations = function( __parent_offset )
{
	const self = this;
	_.each(self.relations, function (___relation) {

		let __src_ds = self.getDataSource( { "id": ___relation.source.datasource } );
		let __trg_ds = self.getDataSource( { "id": ___relation.target.datasource } );

		if( __src_ds && __trg_ds) {
			___relation.initPoints( __parent_offset, __src_ds.builder_info, __trg_ds.builder_info );
		}
	});
	return self;
};

/**
 * move dataSet panel and/or it`s relations on to of desktop
 * @param __model $RbModelBuilderDataRelation or $RbDataSource
 */
$RbModelBuilderModel.prototype.moveToTopDataRelations = function( __model )
{
	const self = this;

	if( $RbDataSource.prototype.isPrototypeOf( __model ) ){
		//console.info( "$RbDataSource" );

		/*
		 * set z-index = 0 for all relations
		 */
		_.each( self.relations, function ( ___rel )	{
			___rel.zIndex = 0;
		});

		/*
		 * set z-index = 0 for all datasets
		 */
		//angular.element( document.querySelectorAll( "[snacks-click-top]" ) ).css( { "z-index": 0 } );
		_.each( self.datasources, function ( ___ds ) {
			if( __model.id === ___ds.id ){
				___ds.builder_info.zIndex = 2;
			}else {
				___ds.builder_info.zIndex = 0;
			}
		});

		/*
		 * scan relation(s) and linked datasets and move to top
		 */
		_.each( self.relations, function ( ___rel )	{

			if( ___rel.source.datasource === __model.id || ___rel.target.datasource === __model.id ){

				___rel.zIndex = 1;

				let ___ds_src = _.findWhere( self.datasources, { id: ___rel.source.datasource } );
				if( ___ds_src ){
					___ds_src.builder_info.zIndex = 2;
				}

				let ___ds_trg = _.findWhere( self.datasources, { id: ___rel.target.datasource } );
				if( ___ds_trg ){
					___ds_trg.builder_info.zIndex = 2;
				}

				// var __context = $$rbCore.ngOptions.$document[0];
				// var ___element = __context.getElementById( __model.id );
				// angular.element( ___element ).css( { "z-index": 2 } );
				//console.info("*** MODEL top click *** " + __model.id);
			}
		} );

	}

	if( $RbModelBuilderDataRelation.prototype.isPrototypeOf( __model ) ){
		//console.info( "$RbModelBuilderDataRelation" );
	}

	return self;
};

/**
 * onModelObjectPropertyChange
 * the method is called after changing any property of any element of the model
 * @param options - an info about property changed
 */
$RbModelBuilderModel.prototype.onModelObjectPropertyChange = function(options)
{
	const self = this;

	// console.log('onModelObjectPropertyChange', options);
	/**
	 * ID changed ?
	 * - regenerate columns IDs
	 * - check relations
	 * - check forms
	 */
	if(options._model.id !== options.model.id){

		// regenerate columns IDs
		_.each(options.model.columns, function (column) {
			column.initDatasource(options.model)
		})

		// check relations
		_.each(self.relations, function (relation) {

			if(relation.source.datasource === options._model.id){
				relation.source.datasource = options.model.id
			}

			if(relation.target.datasource === options._model.id){
				relation.target.datasource = options.model.id
			}

		});

		_.each(self.forms, function (form) {
			form.datasources = _.map(form.datasources, function (ds) {
				return ds === options._model.id ? options.model.id : ds
			});
		});

		return true;
	}
	return false;
}

export default $RbModelBuilderModel;