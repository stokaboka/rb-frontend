/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

"use strict";

angular.module('redButton',
	[
		 'rb.core'
		,'rb.common'
		,'rb.snacks'
		,'rb.sequencer'
		,'rb.listValues'
		,'rb.fileSelector'

		,'rb.data'

		,'rb.controls'
		,'rb.controls.table'

		,'rb.controls.search'
		,'rb.controls.sidebar'
		,'rb.controls.header'
		,'rb.controls.treetable'
		,'rb.controls.pagination'
		,'rb.controls.combobox'
	]);

angular.module('rb.core', []);
angular.module('rb.common', []);

angular.module('rb.snacks', []);
angular.module('rb.sequencer', []);
angular.module('rb.listValues', []);
angular.module('rb.fileSelector', []);

angular.module('rb.controls', []);
angular.module('rb.controls.table', []);

angular.module('rb.controls.search', []);
angular.module('rb.controls.sidebar', []);
angular.module('rb.controls.header', []);
angular.module('rb.controls.treetable', []);
angular.module('rb.controls.pagination', []);
angular.module('rb.controls.combobox', []);