"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */
/**
 * Created by stokaboka on 04.04.2017.
 */

import $RbFormLayout from './rbFormLayout';

let $RbForm = function ( options ) {
	const self = this;

	self.type = "form";

	Object.assign(
	self,
		{
			id: "",
			layout: $RbFormLayout.prototype.FORM_LAYOUTS.SINGLE_DATASOURCE.type,
			title: "",
			description: "",
			//template:  $RbFormLayout.prototype.FORM_LAYOUTS.SINGLE_DATASOURCE.template,
			template:  '',
			compiledTemplate: "",
			order: 0,
			enabled: true,
			datasources: [],
			numberOfBlocks: 0,
			parameters: [],
			actions: []
		},
		options
	);

	self.numberOfBlocks = Math.max( self.layout.numberOfBlocks, self.datasources.length );
	if( self.datasources.length < self.numberOfBlocks ){
		for( let i=0; i < ( self.numberOfBlocks - self.datasources.length ); i++ ){
			self.datasources.push( '' );
		}
	}

	// self.parameters = [];
	self.initParameters( $$rbCore.getPropertyValue(options, "parameters", []) );

	// self.actions = $$rbCore.getPropertyValue(options, "actions", []);

	self.render_options = null;

	self.rendered = false;

	self.application = null;
	self.path = null;

	self.initTemplate();
};

$RbForm.prototype.initTemplate = function (  ) {
	const self = this;

	if( $RbFormLayout.prototype.FORM_LAYOUTS[ self.layout ] ){

		self.template = $RbFormLayout.prototype.FORM_LAYOUTS[ self.layout ].template;

		self.compiledTemplate = self.template;

	}else{
		//self.template = '<div>Invalid Layout: ' + self.layout + '</div>';
		self.compiledTemplate = self.template;
	}

	_.each( self.datasources, function( ds ){
		self.compiledTemplate = self.compiledTemplate.replace( "%row-source%", ds );
	});

};

/**
 * init form parameters (address string parameters)
 * @param options
 * @returns {$RbForm}
 */
$RbForm.prototype.initParameters = function ( options ) {
	const self = this;

	/**
	 * TODO исправить после формирования форм в дизайнере: для отладки использован string, должен быть объект
	 */

	self.parameters = _.map(options, function (___param) {
		if( typeof ___param === 'string' ) {
			let ___tmp = ___param.split(".");
			return {
				datasource: ___tmp[0],
				parameter: ___tmp[1]
			}
		}else{
			return ___param;
		}
	});

	return self;
};

$RbForm.prototype.getParameter = function (___routeParams, ___datasource) {
	const self = this;

	let ___parameter = _.findWhere(self.parameters, {datasource: ___datasource});

	if( _.isUndefined( ___parameter ) )
	{
		return null;
	}else{
		return ___routeParams[___parameter.parameter]
	}
};

$RbForm.prototype.getAction = function (options) {
	const self = this;

	let ___action = _.findWhere( self.actions, options );
	if( _.isUndefined( ___action ) ){
		return null;
	}else{
		return ___action;
	}
};

$RbForm.prototype.preRendering = function (options) {
	const self = this;

	self.rendered = false;
	self.render_options = options;

	//console.log("Form preRendering " + self.id + " " + self.title);

	return self;
};

$RbForm.prototype.postRendering = function () {
	const self = this;

	self.rendered = true;
	self.render_options = null;
	//console.log("Form postRendering " + self.id + " " + self.title);
	return self;
};

$RbForm.prototype.extendObject = function ( ___form ) {
	const self = this;

	return self;
};

$RbForm.prototype.initApplication = function ( ___application ) {
	const self = this;

	if( !self.path) {
		self.application = ___application;
		self.path = "/model/" + self.application.model.id + "/app/" + self.application.id + "/form/" + self.id;

		// "/app/:app_name/form/:form_name*"
	}
	return self;
};

$RbForm.prototype.toJSONimage = function() {
	const self = this;
	const __keys = ['id', 'layout', 'numberOfBlocks', 'title', 'description', 'order', 'enabled', 'datasources', 'parameters', 'actions' ];
	let ___out = {
		component_type: 'form'
	};

	_.each(__keys, function ( __key ) {
		if ( typeof self[ __key ] !== 'undefined' ) {

			switch ( __key ) {

				case 'object_loopback':
					if ( self[ __key ] ) {
						___out[ __key ] = self[ __key ].toJSONimage();
					}
					break;
				default :
					___out[ __key ] = self[ __key ];

			}
		}
	});

	return ___out;

};

$RbForm.prototype.getDesignerTitle = function()
{
	const self = this;
	return self.id + ' - ' + self.title + ' - ' + self.description;
};

export default $RbForm;