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

import $RbBinding from "../core/rbBinding";

let $RbDisplayGadget = function (options ) {
    const self = this;

	Object.assign(
	    self,
        {
	        type: '',
	        replace: false
        },
		options
    );

	self.gadget = self.type.toUpperCase();
	self.type = "gadget";

    // if(__options.hasOwnProperty('type')) {
    //     self.gadget = __options.type.toUpperCase();
    // }else{
    //     //self.model.$log.error('$RbDisplayGadget: [type] expected')
    // }
    //
    // self.replace = __options.hasOwnProperty('replace') ? __options['replace'] : false;

    self.column = null;
    self.element = null;
    return self;
};

$RbDisplayGadget.prototype.init = function(){
    const self = this;
    switch (self.gadget){
        case "PROGRESS_LINEAR" :
            self.value_attr = 'value';
            self.element = {
                tag: 'md-progress-linear',
                attributes: [
                    {name:'md-mode', value:"determinate"},
                    {name:'value', value:""}
                ]
            };
            break;
        case "ICON_COLOR" :
            self.value_attr = 'rb-icon-color-pair';
            self.element = {
                tag: 'rb-icon-color',
                attributes: [
                    {name:'rb-icon-color-pair', value:"help_outline:red"},
                    {name:'rb-separator', value:":"},
                    {name:'rb-icon-size', value:"24"}
                ]
            }
    }
    return self;
};

$RbDisplayGadget.prototype.compile = function( __attributes_values ){
    const self = this;
    let __out = '';
    if(self.element){

	    let __elem_attrs = _.chain(self.element.attributes)
            .each(function(__attr){
	            let ___attr_def = _.findWhere(__attributes_values, {name: __attr.name});
                if(typeof ___attr_def !== 'undefined'){
                    __attr.value = ___attr_def.value;
                }
            })
            .filter(function(__attr){
                return __attr.value.length > 0;
            })
            .map(function (__attr) {
                return __attr.name + '="' +  __attr.value + '"';
            })
            .value();
        __elem_attrs = __elem_attrs.join(' ');
        __out = '<' + self.element.tag + ' ' + __elem_attrs + '></' + self.element.tag + '>';
    }
    return __out;
};

$RbDisplayGadget.prototype.getDescription = function() {
	const self = this;

	return self.gadget;
};

$RbDisplayGadget.prototype.toJSONimage = function() {
    const self = this;

	return {
	    type: self.gadget,
        replace: self.replace
    };

};

export default $RbDisplayGadget;