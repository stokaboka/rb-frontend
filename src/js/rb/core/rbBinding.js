/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */
/**
 * Created by stokaboka on 12.08.2016.
 */
/**
 * Data Binding info
 * @param __binding
 * @returns {$RbBinding} array of $RbBindingItem
 */

import $RbBindingItem from './rbBindingItem';
import $RbColumn from './rbColumn';
import {$RbListValues} from "../ui/rbListValues";

let $RbBinding = function (__bindingItem) {
    const self = this;
    self.type = "binding";
    self.items = [];
    if(typeof __bindingItem !== 'undefined'){
        let __bindingItem = new $RbBindingItem(__bindingItem);
        self.items.push(new $RbBindingItem(__bindingItem));
    }
    return self;
};

$RbBinding.prototype.init = function(__binding){
    const self = this;
	if(__binding){
	    self.items = [];
	    if (__binding.hasOwnProperty('items')) {
		    _.each(__binding.items, function (___item) {
			    self.add(new $RbBindingItem(___item));
		    });
	    }

    }
    return self;
};

$RbBinding.prototype.add = function (__bindingItem) {
    const self = this;
    self.items.push(new $RbBindingItem(__bindingItem));
    return self;
};

$RbBinding.prototype.release = function (__bindingItem) {
	const self = this;
	self.items = _.without(self.items, __bindingItem);
	return self;
};

$RbBinding.prototype.bind = function (__source_row, __target_row) {
    const self = this;
    let __binding_result = 0;
    _.each(self.items, function( item ){

	    let ___target_field = item.trg.column;
	    let ___source_field = item.src.column;

        if( __target_row.hasOwnProperty( ___target_field ) && __source_row.hasOwnProperty( ___source_field ) ){
            __target_row[ ___target_field ] = __source_row[ ___source_field ];
            __binding_result++;
        }else{
            console.error('Binding: target field [' + ___target_field + '] or source field ['+ ___source_field+ '] expected');
        }
    });
    return __binding_result === self.items.length;
};

$RbBinding.prototype.getColumns = function(___srctrg){
    const self = this;
	return _.map(self.items, function (_binding) {
	    return new $RbColumn({db_name: _binding[___srctrg], db_type: "STRING"});
    });
};

$RbBinding.prototype.getSourceColumns = function(){
    const self = this;
    return self.getColumns("source");
};

$RbBinding.prototype.getTargetColumns = function(){
    const self = this;
    return self.getColumns("target");
};

$RbBinding.prototype.initColumn = function(__column){
	const self = this;
	_.chain(self.items)
		.where({target: __column.db_name})
		.each(function (____binding_item) {
			____binding_item["target_type"] = __column.db_type;
		});
};

$RbBinding.prototype.parseBinding = function( __value ){

	let regexp = /^datasource___(.+)\.column___(.+$)/gmi;
	let parts = regexp.exec( __value );
	let partsIndex = {
		datasource: 1,
		column: 2
	};

	if(parts && parts.length && parts.length === 3){
		return {
			datasource: parts[1],
			column: parts[2]
		}
	}else{
		return {
			datasource: __value,
			column: __value
		}
	}

};

$RbBinding.prototype.prepareItem = function( item ){
	if( item ) {
		return Object.assign(
			{},
			item,
			{
				src: $RbBinding.prototype.parseBinding(item["source"]),
				trg: $RbBinding.prototype.parseBinding(item["target"])
			}
		);
	}else{
		return null;
	}
};

$RbBinding.prototype.prepareItems = function( ){
	const self = this;
	return _.map( self.items, $RbBinding.prototype.prepareItem( item ) );
};

$RbBinding.prototype.getDescription = function() {
	const self = this;
	let ___out = _.map(self.items, function (_binding) {
		return _binding.getDescription()
	});

	return '[' + ___out.join(' ') + ']';
};

$RbBinding.prototype.toJSONimage = function() {
    const self = this;
	let ___out = {items: []};
    _.each(self.items, function(_binding){
        if(_binding) {
            ___out.items.push(_binding.toJSONimage());
        }
    });
    return ___out;
};

export default $RbBinding;