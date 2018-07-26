/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

"use strict";

let $RbSiteMapForm = function( options ){
	const self = this;

	self.type = 'form';

	Object.assign(
		self,
		{
			id : '',
			title: null,
			route : null,
			templateUrl: null,
			controller: null,

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

	return self;
};

export default $RbSiteMapForm;