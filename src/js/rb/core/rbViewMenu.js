/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

"use strict";

let $RbViewMenu = function ( options ) {
	const self = this;
	self.type = 'menu';
	self.items = [];
};


let $RbViewMenuItem = function ( options ) {
	const self = this;
	self.type = 'menuitem';
	self.action = '';
	self.label = '';
};

$RbViewMenuItem.prototype.ACTIONS = {

	HREF: 'HREF',
	MENU: 'MENU',
	FORM: 'FORM'

};

export default $RbViewMenu;