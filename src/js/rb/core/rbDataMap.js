/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

import {$RbListValues} from "../ui/rbListValues";

/**
 * Created by stokaboka on 12.08.2016.
 */

let $RbDataMap = function( options ){
    const self = this;

	self.type = "datamap";

	Object.assign(
		self,
		{
			db_type_a: null,
			db_type_b: null,
			map: []
		},
		options
	);

    // self.db_type_a = null;
    // self.db_type_b = null;
    // self.map = [];
    //
    // if(!_.isUndefined(__options)){
    //     self.db_type_a = __options.hasOwnProperty("db_type_a") ? __options["db_type_a"] : null;
    //     self.db_type_b = __options.hasOwnProperty("db_type_b") ? __options["db_type_b"] : null;
    //     self.map = __options.hasOwnProperty("map") ? __options["map"] : [];
    // }

};

$RbDataMap.prototype.getValueAB = function(__value_a){
    const self = this;
    let __value = _.findWhere(self.map, {a: __value_a});
    if(typeof __value !== 'undefined'){
        return __value.b;
    }else{
        return __value_a;
    }
};

$RbDataMap.prototype.getValueBA = function(__value_b){
    const self = this;
    let __value = _.findWhere(self.map, {b: __value_b});
    if(typeof __value !== 'undefined'){
        return __value.a;
    }else{
        return __value_b;
    }
};

$RbDataMap.prototype.add = function(__item){
    const self = this;
	if(_.isUndefined(__item)){
		__item = {a: null, b: null, d: null}
	}
    self.map.push(__item);
};

$RbDataMap.prototype.release = function(__item){
    const self = this;
    self.map = _.reject(self.map, function (__i) {
        if(__i.a === __item.a && __i.b === __item.b)
            return true;
    });
};

$RbDataMap.prototype.getDescription = function() {
	const self = this;

	return  _.map(self.map, function (item) {
		return item.a ? item.a : ' ' + '>'
		+ item.b ? item.b : ' '
		+ item.d ? '('+item.d+')' : '';
	}).join(', ');
};

$RbDataMap.prototype.toJSONimage = function() {
    const self = this;

    let ___out = {
        db_type_a: self.db_type_a,
        db_type_b: self.db_type_b,
        map: self.map
    };

    return ___out;
};

export default $RbDataMap;