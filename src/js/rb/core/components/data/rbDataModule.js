"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

angular.module('rb.data', [])
	.directive('rowSource', $$$RbRowSourceDirective)
	.directive('rowBinding', $$$RbRowBindingDirective);

function $$$RbRowSourceDirective(){
	return {
		restrict: "A",
		link: function($scope, $element, $attrs, $ctrl) {
		}
	};
}
$$$RbRowSourceDirective.$inject = [];

function $$$RbRowBindingDirective(){
	return {
		restrict: "A",
		link: function($scope, $element, $attrs, $ctrl) {
		}
	};
}
$$$RbRowBindingDirective.$inject = [];
