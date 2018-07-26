/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */


/**
 * Created by stokaboka on 27.03.2017.
 */

"use strict";

let $RbModelBuilderView = function ( options ) {
	const self = this;

	// if ( typeof __options == 'undefined ') {
	// 	__options = {};
	// }

	Object.assign(
		self,
		{
			id: '',
			description: '',
			designer : null,
			path: '',
			type: 'JSON'
		},
		options
	);

	// self.id = __options.hasOwnProperty( "id" ) ? __options.id : "";
	// self.description = __options.hasOwnProperty( "description" ) ? __options.description : "";
	// self.designer = __options.hasOwnProperty( "designer" ) ? __options.designer : null;
	// self.path = __options.hasOwnProperty( "path" ) ? __options.path : "";
	// self.type = __options.hasOwnProperty( "type" ) ? __options.type.toUpperCase() : 'JSON';

	self.type = self.type.toUpperCase();

	self.status = '';
};

$RbModelBuilderView.prototype.init = function ( ){
	const self = this;
	return self;
};

export default $RbModelBuilderView;