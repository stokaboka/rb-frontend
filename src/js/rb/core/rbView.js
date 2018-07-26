/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

"use strict";

import $RbViewForms from './rbViewForms';
import $RbViewMenu from './rbViewMenu';

let $RbView = function ( options ) {
	const self = this;

	Object.assign(
		self,
		{
			id: '',
			title: '',
			description: '',
			menu: null,
			forms: null
		},
		options
	);

	self.menu = self.initMenu( self.menu );
	self.forms = self.initForms( self.forms );

};

$RbView.prototype.initMenu = function ( __menu ) {
	const self = this;
	self.menu = new $RbViewMenu( __menu );
	return self;
};

$RbView.prototype.initForms = function ( __forms ) {
	const self = this;
	self.forms = new $RbViewForms( __forms );
	return self;
};

export default  $RbView;