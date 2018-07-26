/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

"use strict";

import $RbSiteMapSection from './rbSiteMapSection';

let $RbSiteMap = function( options ){
	const self = this;

	Object.assign(
		self,
		{
			home: "",
			path: "",
			sections: [],
			form: []
		},
		options
	);


	self.sections = _.map( self.sections,  function ( section ) {
		return new $RbSiteMapSection( section );
	});

	return self;
};

$RbSiteMap.prototype.addSection = function ( section ) {
	const self = this;
	let v_section = new $RbSiteMapSection( section );
	self.sections.push(v_section);
	return self;
};

export default $RbSiteMap;