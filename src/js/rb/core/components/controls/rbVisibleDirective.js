"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

angular.module('rb.controls')
	.directive('rbVisible', $$$RbVisibleDirective);

function $$$RbVisibleDirective(){
	return function (scope, element, attr) {
		scope.$watch(attr.rbVisible, function (visible) {
			element.css('visibility', visible ? 'visible' : 'hidden');
		});
	};
}
$$$RbVisibleDirective.$inject = [];