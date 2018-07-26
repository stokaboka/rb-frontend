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

let $RbLoader = function ( options ){
	const self = this;
	self.$http = options.$http;
	self.$q = options.$q;
	self.metod = options.hasOwnProperty( "metod" ) ? options.metod : "POST";

	self.busy = false;
};

$RbLoader.prototype.load = function ( ___url, ___data ) {
	const self = this;
	let deffered = self.$q.defer();

	if( typeof ___data === 'undefined' ){
		___data = null;
	}

	self.busy = true;

	self.$http({
		method: self.metod,
		url: ___url,
		data: ___data
	}).then(function( data ) {
		self.busy = false;
		deffered.resolve( data.data, data.status );
	}).catch(function(data) {
		self.busy = false;
		deffered.reject( data.data, data.status );
	});

	return deffered.promise;
};

export default $RbLoader;