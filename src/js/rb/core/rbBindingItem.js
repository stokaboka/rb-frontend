/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

/**
 * Created by stokaboka on 12.08.2016.
 */


import $RbBinding from "./rbBinding";

/**
 * Item object for data bindings
 * source / target pair for data binding
 * source - ID column of source data source
 * target - ID column of target data source
 * @param options
 * @returns {$RbBindingItem}
 */

let $RbBindingItem = function ( options ) {
    const self = this;

    Object.assign(
    	self,
	    {
		    source: '',
		    target: '',
		    target_type: '',
		    visible: true
	    },
	    options,
	    $RbBinding.prototype.prepareItem( options )
    );

    return self;
};

$RbBindingItem.prototype.getDescription = function() {
	const self = this;
	let _out = self.source + '>'+self.target;
	return self.visible ? _out : '(' + _out + ')';
};

$RbBindingItem.prototype.toJSONimage = function() {
    const self = this;
	return {
        source: self.source,
        target: self.target,
        target_type: self.target_type,
        visible: self.visible
    };
};

export default $RbBindingItem;