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

import $RbRowValidatorProcessor from "./rbRowValidatorProcessor";

let $RbRowValidator = function(options ){
    const self = this;

    self.datasource = null;
    self.result = true;
	self.negative = false;
    self.message = '';

	self.type = 'row_validator';

    Object.assign(
        self,
        {
	        metod: $RbRowValidator.prototype.VALIDATORS.NONE,
	        column : '',
            column1 : '',
	        column2 : '',
	        operator : '',
	        list : []
        },
	    options
    );

	/**
     * for compatibility with prv version
	 */
    // self.metod = ___options.hasOwnProperty('metod') ? ___options.metod : ___options.hasOwnProperty('type') ? ___options.type : $RbRowValidator.prototype.VALIDATORS.NONE;
    //
    // switch (self.metod){
    //     case $RbRowValidator.prototype.VALIDATORS.COMPARE :
    //         self.column1 = ___options.hasOwnProperty('column1') ? ___options.column1 : '';
    //         self.column2 = ___options.hasOwnProperty('column2') ? ___options.column2 : '';
    //         self.operator = ___options.hasOwnProperty('operator') ? ___options.operator : '';
    //         break;
    //     case $RbRowValidator.prototype.VALIDATORS.REQUIRED :
    //         self.column = ___options.hasOwnProperty('column') ? ___options.column : '';
    //         break;
    //     case $RbRowValidator.prototype.VALIDATORS.IN_LIST :
    //         self.column = ___options.hasOwnProperty('column') ? ___options.column : '';
    //         self.list = ___options.hasOwnProperty('list') ? ___options.list : [];
    //         break;
    //     default :
    // }
    return self;
};

$RbRowValidator.prototype.validate = function (___row_data) {
    const self = this;
    self.result = true;
	self.negative = false;
    self.message = '';
    switch (self.metod){
        case $RbRowValidator.prototype.VALIDATORS.COMPARE :
            if(___row_data.hasOwnProperty(self.column1) && ___row_data.hasOwnProperty(self.column2)) {
                if (___row_data[self.column1] && ___row_data[self.column2]) {
                    switch (self.operator) {
                        case '<' :
                            self.result = ___row_data[self.column1] < ___row_data[self.column2];
                            break;
                        case '<=' :
                            self.result = ___row_data[self.column1] <= ___row_data[self.column2];
                            break;
                        case '==' :
                            self.result = ___row_data[self.column1] === ___row_data[self.column2];
                            break;
                        case '===' :
                            self.result = ___row_data[self.column1] === ___row_data[self.column2];
                            break;
                        case '>=' :
                            self.result = ___row_data[self.column1] >= ___row_data[self.column2];
                            break;
                        case '>' :
                            self.result = ___row_data[self.column1] > ___row_data[self.column2];
                            break;
	                    case '!=' :
		                    self.result = ___row_data[self.column1] !== ___row_data[self.column2];
		                    break;
                    }
                    if(!self.result){
                        let ___column1 = self.datasource.getColumn(self.column1);
	                    let ___column2 = self.datasource.getColumn(self.column2);
                        if(___column1 && ___column2) {
                            switch (self.operator) {
                                case '<' :
                                    self.message = 'Значение [' + ___column1.title + '] должно быть меньше значения [' + ___column2.title + ']';
                                    break;
                                case '<=' :
                                    self.message = 'Значение [' + ___column1.title + '] должно быть меньше или равно значению [' + ___column2.title + ']';
                                    break;
                                case '==' :
                                    self.message = 'Значение [' + ___column1.title + '] должно быть равно значению [' + ___column2.title + ']';
                                    break;
                                case '===' :
                                    self.message = 'Значение [' + ___column1.title + '] должно быть равно значению [' + ___column2.title + ']';
                                    break;
                                case '>=' :
                                    self.message = 'Значение [' + ___column1.title + '] должно быть больше или равно значению [' + ___column2.title + ']';
                                    break;
                                case '>' :
                                    self.message = 'Значение [' + ___column1.title + '] должно быть больше значения [' + ___column2.title + ']';
                                    break;
	                            case '!=' :
		                            self.message = 'Значение [' + ___column1.title + '] не должно быть равно значению [' + ___column2.title + ']';
		                            break;
                            }
                        }else{
                            if(!___column1)
                                self.model.$log.error('$RbRowValidator: column ['+self.column1+'] expected');
                            if(!___column2)
                                self.model.$log.error('$RbRowValidator: column ['+self.column2+'] expected');
                        }
                    }
                }
            }else{
                if(!___row_data.hasOwnProperty(self.column1))
                    self.model.$log.error('$RbRowValidator: column ['+self.column1+'] expected');
                if(!___row_data.hasOwnProperty(self.column2))
                    self.model.$log.error('$RbRowValidator: column ['+self.column2+'] expected');
            }
            break;
        case $RbRowValidator.prototype.VALIDATORS.REQUIRED :
            if(___row_data.hasOwnProperty(self.column)) {
                self.result = !!___row_data[self.column];
            }else{
                self.model.$log.error('$RbRowValidator: column ['+self.column+'] expected');
            }
            if(!self.result){
                let ___column = self.datasource.getColumn(self.column);
                if(___column) {
                    self.message = 'Значение [' + ___column.title + '] не может быть пустым';
                }else{
                    self.model.$log.error('$RbRowValidator: column ['+self.column+'] expected');
                }
            }
            break;
        case $RbRowValidator.prototype.VALIDATORS.IN_LIST :
            if(___row_data.hasOwnProperty(self.column)) {
	            let ___fnd_rez = _.find(self.list, function (___val) {
                    return ___val === ___row_data[self.column];
                });
                if(typeof ___fnd_rez === 'undefined'){
                    return false;
                }else{
                    self.result = !!___fnd_rez;
                }
                if(!self.result){
	                let ___column = self.datasource.getColumn(self.column);
                    if(___column) {
                        self.message = 'Значение [' + ___column.title + '] не допускается';
                    }else{
                        self.model.$log.error('$RbRowValidator: column ['+self.column+'] expected');
                    }
                }
            }else{
                self.model.$log.error('$RbRowValidator: column ['+self.column+'] expected');
            }
            break;
        default :
    }
	self.negative = !self.result;
};

$RbRowValidator.prototype.VALIDATORS = {
    NONE: 'NONE',
    COMPARE: 'COMPARE',
    REQUIRED: 'REQUIRED',
    IN_LIST: 'IN_LIST'
};

$RbRowValidator.prototype.getDescription = function() {
	const self = this;
	let ___out = self.metod + ' ';

	switch (self.metod){
		case $RbRowValidator.prototype.VALIDATORS.COMPARE :
			___out = ___out + self.column1 + ' ' + self.operator + ' ' + self.column2;
			break;
		case $RbRowValidator.prototype.VALIDATORS.REQUIRED :
			___out = ___out + self.column;
			break;
		case $RbRowValidator.prototype.VALIDATORS.IN_LIST :
			___out = ___out + self.column + ' ' + self.list;
			break;
		default :
	}

	return ___out
};

$RbRowValidator.prototype.toJSONimage = function() {
    const self = this;
	let ___out = {
        metod: self.metod
    };
    switch (self.metod){
        case $RbRowValidator.prototype.VALIDATORS.COMPARE :
            ___out["column1"] = self.column1;
            ___out["column2"] = self.column2;
            ___out["operator"] = self.operator;
            break;
        case $RbRowValidator.prototype.VALIDATORS.REQUIRED :
            ___out["column"] = self.column;
            break;
        case $RbRowValidator.prototype.VALIDATORS.IN_LIST :
            ___out["column"] = self.column;
            ___out["list"] = self.list;
            break;
        default :
    }

    return ___out;
};

export default $RbRowValidator;