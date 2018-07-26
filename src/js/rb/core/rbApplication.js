/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

"use strict";

let $RbApplication  = function ( options ) {
	const self = this;

	self.type = "application";

	Object.assign(
		self,
		{
			id: "",
			title: "",
			description: "",
			enabled: true,
			order: 0,
			forms: []
		},
		options
	);

};

$RbApplication.prototype.add = function() {
	const self = this;
	self.forms.push( { id: null, enabled: true, order: 0 } );
	return self;
};

$RbApplication.prototype.release = function( ___options ) {
	const self = this;
	self.forms = _.without( self.forms, ___options );
	return self;
};


$RbApplication.prototype.toJSONimage = function() {
	const self = this;
	let __keys = ['id', 'title', 'description', 'enabled', 'order', 'forms' ];
	let ___out = {
		component_type: 'application'
	};

	_.each(__keys, function (__key) {
		if (typeof self[__key] !== 'undefined') {

			switch (__key) {
				case 'object_loopback':
					if (self[__key]) {
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

export default $RbApplication;
