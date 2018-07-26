/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

"use strict";

/**
 * Created by stokaboka on 20.02.2017.
 */

import $RbBinding from '../core/rbBinding';
import $RbComboBox from "./rbComboBox";

let $RbList = function (__options) {
	const self = this;

	self.type = "list";

	self.id = __options.hasOwnProperty('id') ?  __options['id'] : 'list';
	self.datasource = __options.hasOwnProperty('datasource') ?  __options['datasource'] : '';
	self.title = __options.hasOwnProperty('title') ?  __options['title'] : '';
	self.database = __options.hasOwnProperty('database') ?  __options['database'] : '';
	self.database_engine = __options.hasOwnProperty('database_engine') ?  __options['database_engine'] : '';
	self.table = __options.hasOwnProperty('table') ?  __options['table'] : '';
	self.label = __options.hasOwnProperty('label') ?  __options['label'] : '';
	self.placeholder = __options.hasOwnProperty('placeholder') ?  __options['placeholder'] : '';

	//self.binding = __options.hasOwnProperty('binding') ?  __options['binding'] : new $RbBinding();

	self.binding = new $RbBinding();
	if(__options.hasOwnProperty('binding')){
		self.binding.init(__options.binding);
	}

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

$RbList.prototype.initColumn = function(__column) {
	const self = this;
	self.binding.initColumn(__column);
};

$RbList.prototype.getDescription = function() {
	const self = this;
	let ___out = [4];
	___out[0] = self.id;
	___out[1] = self.title;
	___out[2] = self.table;
	___out[3] = self.binding.getDescription();
	return ___out.join(', ');
};

$RbList.prototype.toJSONimage = function() {
	const self = this;
	let __keys = ['datasource', 'title', 'database', 'database_engine', 'table', 'placeholder', 'binding'];
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

export default $RbList;