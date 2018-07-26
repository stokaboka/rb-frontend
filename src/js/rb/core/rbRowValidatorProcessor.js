/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */
/**
 * Created by stokaboka on 22.03.2017.
 */

"use strict";

import $RbRowValidator from './rbRowValidator';
import $RbRowOrder from "./rbRowOrder";

let $RbRowValidatorProcessor = function(__datasource, __validators)
{
	const self = this;
	self.type = "validator_processor";

	if( angular.isUndefined( __validators ) ){
		__validators = [];
	}

	self.items = [];

	self.datasource = null;

	self.init(__datasource, __validators);

	return self;
};

$RbRowValidatorProcessor.prototype.init = function (__datasource, __validators) {
	const self = this;
	self.datasource = __datasource;
	self.items = [];
	_.each(__validators, function (___validator) {
		self.add(new $RbRowValidator(___validator));
	});
	return self;
};

$RbRowValidatorProcessor.prototype.validate = function (__row_data) {
	const self = this;
	let __out = true;

	self.datasource.clearColumnsMessages();

	for (let ___i = 0; ___i < self.items.length; ___i++)
	{

		let ___validator = self.items[___i];

		___validator.validate(__row_data);

		if (___validator.negative) {
			if (___validator.column) {
				let ___column = self.datasource.getColumn(___validator.column);
				if (___column)
					___column.setMessage(___validator.message);
			}
			if (___validator.column1) {
				let ___column = self.datasource.getColumn(___validator.column1);
				if (___column)
					___column.setMessage(___validator.message);
			}
			if (___validator.column2) {
				let ___column = self.datasource.getColumn(___validator.column2);
				if (___column)
					___column.setMessage(___validator.message);
			}

			__out = false;
		}

	}

	return __out;

};

$RbRowValidatorProcessor.prototype.add = function(__item)
{
	const self = this;

	if( angular.isUndefined( __item ) ) {
		__item = new $RbRowValidator({});
	}

	__item.datasource = self.datasource;
	self.items.push(__item);
	return self;
};

$RbRowValidatorProcessor.prototype.release = function(__item)
{
	const self = this;
	self.items = _.without(self.items, __item);
	return self;
};

$RbRowValidatorProcessor.prototype.getDescription = function() {
	const self = this;
	return _.map(self.items, function (___item) {
		return ___item.getDescription();
	}).join(' ');
};

$RbRowValidatorProcessor.prototype.toJSONimage = function()
{
	const self = this;

	return _.map(self.items, function (___item) {
		return ___item.toJSONimage();
	});

};

export default $RbRowValidatorProcessor;