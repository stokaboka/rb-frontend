/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

"use strict";

import $RbSiteMapForm from './rbSiteMapForm';

let $RbSiteMapSection = function( options ){
	const self = this;

	Object.assign(
		self,
		{
			id: '',
			title: null,
			tooltip: null,
			menu: true,
			toolbar: true,
			home: true,
			path: '',
			style: null,
			class: null
		},
		options
	);

	self.type = 'section';
	self.forms = [];

	_.each( options.forms, function( form ){
		self.addForm( form );
	});

	return self;
};

$RbSiteMapSection.prototype.addForm = function ( form ) {
	const self = this;
	let v_form = new $RbSiteMapForm( form );
	self.forms.push(v_form);
	return self;
};

export default $RbSiteMapSection;