/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

/**
 * Created by stokaboka on 18.04.2016.
 */

"use strict";

import $RbModel from './rbModel';

let $RbModelLoader = function ( ___core ){
	const self = this;

	self.rbCode = ___core;
	self.model = ___core.model;
	self._loadingCount = 0;
	self._fileList = [];

	self.load_state = 0;

	return self;
};

$RbModelLoader.prototype.events = {
	load_models_started: 'rd_load_models_started',
	load_models_complete: 'rd_load_models_complete',
	load_models_error: 'rd_load_models_error',

	load_config_started: 'rd_load_config_started',
	load_config_complete: 'rd_load_config_complete',
	load_config_error: 'rd_load_config_error',

	load_dataset_started: 'rd_load_dataset_started',
	load_dataset_complete: 'rd_load_dataset_complete',
	load_dataset_error: 'rd_load_dataset_error',

	load_complete: 'rd_load_complete',
	load_error: 'rd_load_error'
};

/**
 * start loading process
 */
$RbModelLoader.prototype.start = function(){
	const self = this;
	self.model.send_event( $RbModel.prototype.events.STARTED, { data: self.model.modelUrl } );
	self.loadModelConfig( self.model.modelUrl )
};

$RbModelLoader.prototype.load = function ( ___url ) {
	const self = this;
	let deffered = self.model.$q.defer();

	self.model.$http({
		method: 'POST',
		url: ___url
	}).then(function( data ) {
		deffered.resolve( data.data, data.status );
	}).catch(function(data) {
		deffered.reject( data.data, data.status );
	});

	return deffered.promise;
};

$RbModelLoader.prototype.loadModelConfig = function ( ___url ) {
	const self = this;

	self.model.$rootScope.$broadcast($RbModelLoader.prototype.events.load_config_started, {data: self.model.modelUrl});

	self.load( ___url )
		.then(
			function (___data, ___status) {
				self.model.$rootScope.$broadcast($RbModelLoader.prototype.events.load_config_complete, {data: self.model.modelUrl});
				self.modelReady( ___data );
			},
			function (___data, ___status) {
				self.model.$log.error('ERROR MODEL LOADING: ' + self.model.modelUrl + ' - does it exist?');
				self.model.$rootScope.$broadcast($RbModelLoader.prototype.events.load_config_error, {data: self.model.modelUrl});
			}
		);

};

$RbModelLoader.prototype.modelReady = function (rbModelConfig) {
	const self = this;
	if(rbModelConfig === undefined){
		self.model.$log.error('ERROR MODEL LOADING: rbModelConfig undefined');
	}else {

		if( typeof rbModelConfig.default !== 'undefined' ){
			self.model.setDefaults( rbModelConfig.default );
		}

		if( typeof rbModelConfig.relations !== 'undefined' ){
			self.model.relations = rbModelConfig.relations;
		}

		if( typeof rbModelConfig.applications !== 'undefined' ){
			//self.model.applications = rbModelConfig.applications;
			self.model.setApplications( rbModelConfig.applications );
		}

		self._modelList = null;
		self._formsList = null;

		self._fileList = [];

		if( typeof rbModelConfig.datasources !== 'undefined' ) {
			self._modelList = rbModelConfig.datasources;
		}else{
			self.model.$log.error("Parameter [datasources] expected.");
		}

		if( typeof rbModelConfig.forms !== 'undefined' ) {
			self._formsList = rbModelConfig.forms;
		}

		if( self._modelList ){
			for (let i = 0; i < self._modelList.length; i++) {
				// Check that the file should be loaded on the client
				if (self._modelList[i][0] === '+') {
					self._modelList[i][1] = "/models/" + self.model.id + "/ds/" + self._modelList[i][2] + ".json";
					self._fileList.push(self._modelList[i]);
				}
			}
		}

		if( self._formsList ){
			for (let i = 0; i < self._formsList.length; i++) {
				// Check that the file should be loaded on the client
				if (self._formsList[i][0] === '+') {
					self._formsList[i][1] = "/models/" + self.model.id + "/forms/" + self._formsList[i][2] + ".json";
					self._fileList.push(self._formsList[i]);
				}
			}
		}

		self.load_state = 3;
		self.loadNext();

	}
};

$RbModelLoader.prototype.loadNext = function () {
	let item = this._fileList.shift(),
		self = this,
		url;

	/**
	 * item array format:
	 * 0  + enable - disable
	 * 1 js file url
	 * 2 object name
	 * 3 object type
	 */

	if ( item !== undefined ) {
		url = item[1];
		if( self.model ) {
			self.model.$rootScope.$broadcast( $RbModelLoader.prototype.events.load_dataset_started, { data: url } );
		}

		self.load( url )
			.then(
				function ( ___data, ___status ) {
					//self.model.createDataSource(___data);
					self.model.processModelComponent( ___data );
					self.model.$rootScope.$broadcast($RbModelLoader.prototype.events.load_dataset_complete, { data: url });
					self.loadNext();
				},
				function ( ___data, ___status ) {
					self.model.$log.error('ERROR LOADING: ' + url + ' - does it exist?');
					self.model.$rootScope.$broadcast($RbModelLoader.prototype.events.load_dataset_error, { data: url });
				}
			);

	}else{

		self.load_state = 4;
		if(self.model) {
			try {
				self.model.$rootScope.$broadcast($RbModelLoader.prototype.events.load_complete, {data: 'data model download is finished'});
				self.model.modelReady();
			}catch (e){
				console.error(e.message);
			}
		}
		if(self.onComplete){
			self.onComplete();
		}
	}

};

export default $RbModelLoader;