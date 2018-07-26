"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

angular.module('rb.controls.combobox')
	.directive('comboboxColumnFilter', $$$RbComboBoxColumnFilterDirective);

function $$$RbComboBoxColumnFilterDirective() {
	return {
		restrict: "A",
		link: function($scope, $element, $attrs, $ctrl) {
		}
	};
}
$$$RbComboBoxColumnFilterDirective.$inject = [];