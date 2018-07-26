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
 * info object for create ComboBox control with data binding
 * @param __combobox
 * @returns {$RbComboBox}
 */

"use strict";

import $RbBinding from '../core/rbBinding';

let $RbComboBox = function ( options ) {
    const self = this;

	self.type = "combobox";

	Object.assign(
	    self,
        {
            id: '',
	        datasource: '',
	        title: '',
	        database: '',
	        database_engine: '',
	        table: '',
	        label: '',
	        placeholder: '',
	        binding: null
        },
		options
    );

	if( self.binding ){
		self.binding =  new $RbBinding().init( self.binding );
    }else{
		self.binding =  new $RbBinding();
    }

    // self.id = __options.hasOwnProperty('id') ?  __options['id'] : 'combobox';
    // self.datasource = __options.hasOwnProperty('datasource') ?  __options['datasource'] : '';
    // self.title = __options.hasOwnProperty('title') ?  __options['title'] : '';
    // self.database = __options.hasOwnProperty('database') ?  __options['database'] : '';
    // self.database_engine = __options.hasOwnProperty('database_engine') ?  __options['database_engine'] : '';
    // self.table = __options.hasOwnProperty('table') ?  __options['table'] : '';
    // self.label = __options.hasOwnProperty('label') ?  __options['label'] : '';
    // self.placeholder = __options.hasOwnProperty('placeholder') ?  __options['placeholder'] : '';
    //
    // self.binding = new $RbBinding();
    // if(__options.hasOwnProperty('binding')){
    //     self.binding.init(__options.binding);
    // }

    self.id = self.table;

    self.autoload = true;

    /**
     * load all records
     * @type {number}
     */
    self.page_length = 0;

    self.columns = self.binding.getSourceColumns();

    return self;
};

$RbComboBox.prototype.initColumn = function(__column) {
	const self = this;
	self.binding.initColumn(__column);
};

$RbComboBox.prototype.getDescription = function() {
	const self = this;
	let ___out = [4];
	___out[0] = self.id;
	___out[1] = self.title;
	___out[2] = self.table;
	___out[3] = self.binding.getDescription();
	return ___out.join(', ');
};

$RbComboBox.prototype.toJSONimage = function() {
    const self = this;
    let __keys = ['datasource', 'title', 'label', 'database', 'database_engine', 'table', 'placeholder', 'binding'];
	let ___out = {};
    _.each(__keys, function (__key) {
        if (self[__key]) {

            switch (__key) {
                case 'binding':
                    ___out[__key] = self[__key].toJSONimage();
                    break;
                default :
                    ___out[__key] = self[__key];
            }
        }
    });
    return ___out;
};

export default $RbComboBox;