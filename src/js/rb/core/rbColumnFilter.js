/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

/**
 * Created by stokaboka on 12.08.2016.
 */

// import {$RbSequence} from "./rbSequence";

/**
 * FILTER column class
 */
let $RbColumnFilter = function (options) {
    const self = this;

    self.type = "columnfilter";
	self.reverse_style = 'fill: lightgrey';

	Object.assign(
		self,
		{
			db_name: '',
			db_type: '',
			value: null,
			value1 : null,
			value2 : null,
			mask : '',
			reverse : false,
			expression : null
		},
		options
	);

	if(self.value != null){
	   self.value1 = self.value;
	   self.value2 = self.value;
	}

    self.init();
    return self;
};

$RbColumnFilter.prototype.init = function () {
    const self = this;
    if(self.db_type) {
        self.db_type = self.db_type.toUpperCase();
    }

    if(self.isEmpty()){
        self.reverse = false;
    }

    switch (self.db_type) {
        case 'INT' :
            self.value1 = parseInt(self.value1);
            self.value2 = parseInt(self.value2);
            break;
        case 'NUMBER' :
            self.value1 = parseFloat(self.value1);
            self.value2 = parseFloat(self.value2);
            break;
        case 'STRING' :
        case 'TEXT' :
	    case 'ENUM' :
            break;
        case 'DATE' :
            let __d1 = moment(self.value1);
            let __d2 = moment(self.value2);
            if(__d1.isValid() && __d2.isValid()){
                self.value1 = __d1.toDate();
                self.value2 = __d2.toDate();
            }else
            if(__d1.isValid() && !__d2.isValid()){
                self.value1 = __d1.toDate();
                self.value2 = null;
            }else
            if(!__d1.isValid() && __d2.isValid()){
                self.value1 = null;
                self.value2 = __d2.toDate();
            }
            break;
        default :
    }

    if(isNaN(self.value))
        self.value = null;
    if(isNaN(self.value1))
        self.value1 = null;
    if(isNaN(self.value2))
        self.value2 = null;

    if(self.reverse){
        self.reverse_class = 'rb-active';
	    self.reverse_style = 'fill: orangered';
    }else{
        self.reverse_class = 'rb-inactive';
	    self.reverse_style = 'fill: lightgrey';
    }

    if(self.isEmpty()){
        self.active_class = 'rb-column-filter-inactive';
    }else{
        self.active_class = 'rb-column-filter-active';
    }

    return self;
};

/**
 * TODO !!!!!!!!!!!!!!!! check metod isEmpty !!!!!!!!!!!!!!
 * @returns {boolean}
 */
$RbColumnFilter.prototype.isEmpty = function () {
    const self = this;
    if(self.value1 !== null){
        return false;
    }else if(self.value2 !== null){
        return false;
    }else if(self.mask !== null && self.mask.length > 0){
        return false;
    }else{
        return true;
    }
};

$RbColumnFilter.prototype.toObject = function () {
    const self = this;
    let ___out = {
        db_name: self.db_name,
        db_type: self.db_type,
	    value: self.value,
        value1: self.value1,
        value2: self.value2,
        mask: self.mask,
        reverse: self.reverse,
        expression: self.expression
    };

    if(typeof ___out.value === 'string'){
        if(!___out.value){
	        ___out.value = null;
        }
    }

	return ___out;
};

$RbColumnFilter.prototype.getDescription = function() {
	const self = this;
    if(self.value){
        return self.expression + ' ' + self.value;
    }else if(self.mask){
	    return 'LIKE '+self.mask;
    }else if(self.value1 && self.value2){
	    return 'BETWEEN '+self.value1 + ' ' + self.value2;
    }else if(self.value1 && !self.value2){
	    return '>='+self.value1;
    }else if(!self.value1 && self.value2) {
	    return '<=' + self.value2;
    }else {
        return self.isEmpty() ? 'EMPTY' : '???';
    }
};

$RbColumnFilter.prototype.toJSONimage = function () {
    const self = this;
    return self.toObject();
};

export default $RbColumnFilter;