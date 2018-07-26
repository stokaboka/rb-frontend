/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

/**
 * Created by stokaboka on 12.08.2016.
 */

"use strict";

import $RbRowOrder from "./rbRowOrder";

let $RbRowFilter = function (options ) {
    const self = this;

    self.type = 'row_filter';

    Object.assign(
    	self,
	    {
		    expression: null,
		    columns: null,
		    column_binding: []
	    },
	    options
    );

    // self.expression = ___options.hasOwnProperty('expression') ? ___options.expression : null;
    // self.columns = ___options.hasOwnProperty('columns') ? ___options.columns : null;
    // self.column_binding = ___options.hasOwnProperty('column_binding') ? ___options.column_binding : [];

    return self;
};

$RbRowFilter.prototype.getDescription = function() {
	const self = this;
	return self.expression;
};

$RbRowFilter.prototype.toJSONimage = function() {
    const self = this;
	return {
	    expression: self.expression,
	    columns: self.columns,
	    column_binding: self.column_binding
    };
};


$RbRowFilter.prototype.add = function(__item){
	const self = this;
	if(_.isUndefined(__item)){
		__item = {column: null, filter_property: null}
	}
	self.column_binding.push(__item);
};

$RbRowFilter.prototype.release = function(__item){
	const self = this;
	self.column_binding = _.without(self.column_binding, __item);
};

export default $RbRowFilter;