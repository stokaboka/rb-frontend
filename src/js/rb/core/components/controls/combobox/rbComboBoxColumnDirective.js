"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

angular.module('rb.controls.combobox')
	.directive('comboboxColumn', $$$RbComboBoxColumnDirective);

function $$$RbComboBoxColumnDirective() {
	return {
		restrict: "A",
		link: function($scope, $element, $attrs, $ctrl) {
		}
	};
}
$$$RbComboBoxColumnDirective.$inject = [];