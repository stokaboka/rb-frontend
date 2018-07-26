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

import $RbColumnOrder from "./rbColumnOrder";

let $RbRowOrder = function () {
	const self = this;
	self.type = "orderby";

	self.items = [];
};

$RbRowOrder.prototype.add = function(__item){
	const self = this;
	self.items.push(__item);
};

$RbRowOrder.prototype.release = function(__item){
	const self = this;
	self.items = _.without(self.map, __item);
};

$RbRowOrder.prototype.getDescription = function() {
	const self = this;
	return _.map(self.items, function (___elem) {
		return ___elem.getDescription();
	})
	.join(' ');
};

$RbRowOrder.prototype.toJSONimage = function() {
	const self = this;
	let ___out = _.map(self.items, function (___elem) {
		return ___elem.toString();
	});

	return ___out;
};

let $RbRowOrderItem = function ( options ) {
    const self = this;
	self.type = "orderby_items";

    if(typeof options === 'string'){
        let ___x = options.split(' ');
        switch (___x.length){
            case 1 :
	            self.column = ___x[0];
	            self.dir = '';
	            break;
	        case 2 :
		        self.column = ___x[0];
		        self.dir = ___x[1];
		        break;
	        default:
		        self.column = null;
		        self.dir = null;
        }
    }else {
    	Object.assign(
    		self,
		    {
			    column : null,
			    dir: ''
		    },
		    options
	    );
	    // self.column = ___options.hasOwnProperty('column') ? ___options.column : null;
	    // if (self.column) {
		 //    self.dir = ___options.hasOwnProperty('dir') ? ___options.dir : 'ASC';
	    // } else {
		 //    self.dir = '';
	    // }
    }
    return self;
};

$RbRowOrderItem.prototype.toString = function() {
	const self = this;
	let ___out = null;

	if(self.column) {
		___out = self.column;
		if (self.dir) {
			___out = ___out + ' ' + self.dir;
		}
	}

	return ___out;
};

$RbRowOrderItem.prototype.getDescription = function() {
	const self = this;
	return self.toString();
};

$RbRowOrderItem.prototype.toJSONimage = function() {
    const self = this;
    return self.toString();
};

export default $RbRowOrder;