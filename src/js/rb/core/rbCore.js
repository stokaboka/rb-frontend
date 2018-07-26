/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

/**
 * $RbCore
 */

"use strict";

import $RbLoader from './rbLoader';
import $RbModel from './rbModel';
import $RbModelLoader from './rbModelLoader';

let $RbCore = function( __options ){
	const self = this;

	self.class = {};

	self.ngOptions = __options.ngOptions;
	self.options = __options;

	self.model = null;
	self.rbModelId = null;
	self.rbModelPath = null;

	self.coreLoader = null;
	self.modelLoader = null;

	self.ready = {
		core: false,
		modules: false,
		controllers: false,
		directives: false,
		model: false
	};

	self.models = [];

	self.loader = new $RbLoader( self.ngOptions );

	if (!("path" in MouseEvent.prototype))
		Object.defineProperty(MouseEvent.prototype, "path", {
			get: function() {
				let path = [];
				let currentElem = this.target;
				while (currentElem) {
					path.push(currentElem);
					currentElem = currentElem.parentElement;
				}
				if (path.indexOf(window) === -1 && path.indexOf(document) === -1)
					path.push(document);
				if (path.indexOf(window) === -1)
					path.push(window);
				return path;
			}
		});

};

$RbCore.prototype.initModel = function ( __model_name ) {
	const self = this;
	self.rbModelId = __model_name;
	self.rbModelPath = 'models/' + __model_name + '/model.json';

	self.ngOptions.$localStorage["RB_CURRENT_MODEL"] = __model_name;

	return self;
};

$RbCore.prototype.checkReady = function () {
	const self = this;
	self.ready.core = self.ready.modules && self.ready.controllers && self.ready.directives;
};

$RbCore.prototype.loadModels = function () {
	const self = this;
	let __data = { "action": "indexModel", "model": null };

	self.loader.load( "api/model.json", __data )
		.then(
			function( __data) {
				self.models = __data.result;
				self.models = _.map( self.models, function ( m ) {
					return {
						id: m.id,
						title: m.id,
						toolbar: true,
						description: m.description,
						route: "model/" + m.id
					}
				});

				//console.log( self.models );
			},
			function( __data ) {
				console.log( "Error loading the list of models: " );
				console.log( __data );
			}
		);

	return self;
};

$RbCore.prototype.start = function () {
	const self = this;

	self.ready.modules = true;

	self.checkReady();

	self.loadModels();

	return self;

};

/**
 * load initialized model
 */
$RbCore.prototype.loadModel = function () {
	const self = this;

	self.model = null;

	if( self.rbModelId ) {

		self.model = new $RbModel(self.ngOptions)
			.setId(self.rbModelId)
			.setLoader(self.loader)
			.setModelUrl(self.rbModelPath);

		/**
		 * Load data model
		 */
		self.modelLoader = null;
		self.modelLoader = new $RbModelLoader( self ).start();

	}

	self.ngOptions.$rootScope.model = self.model;

	return self;
};

$RbCore.prototype.getPropertyValue = function ( ___options, ___name, ___default ) {
	if( typeof ___default === 'undefined')
	{
		___default = null;
	}
	return ___options.hasOwnProperty( ___name ) ? ___options[ ___name ] : ___default;
};

/**
 * calculate absolute element position
 * src: http://javascript.ru/ui/offset
 * @param elem
 * @returns {{top, left}|*}
 */
$RbCore.prototype.getOffset = function (elem) {
	function getOffsetSum(elem) {
		let top=0, left=0;
		while(elem) {
			top = top + parseInt(elem.offsetTop);
			left = left + parseInt(elem.offsetLeft);
			elem = elem.offsetParent
		}

		return {top: top, left: left}
	}

	function getOffsetRect(elem) {
		// (1)
		let box = elem.getBoundingClientRect();

		// (2)
		let body = document.body;
		let docElem = document.documentElement;

		// (3)
		let scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop || ( elem.scrollTop * -1 );
		let scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft || ( elem.scrollLeft * -1 );

		// (4)
		let clientTop = docElem.clientTop || body.clientTop || 0;
		let clientLeft = docElem.clientLeft || body.clientLeft || 0;

		// (5)
		let pT  = box.top +  scrollTop - clientTop;
		let pL = box.left + scrollLeft - clientLeft;

		return { "top": Math.round( pT ), "left": Math.round( pL ) };
	}

	if (elem.getBoundingClientRect) {
		// "правильный" вариант
		return getOffsetRect(elem);
	} else {
		// пусть работает хоть как-то
		return getOffsetSum(elem);
	}

};

export default $RbCore;