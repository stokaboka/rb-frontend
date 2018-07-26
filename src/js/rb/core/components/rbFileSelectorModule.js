"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

angular.module('rb.fileSelector')
	.directive('fileSelectorOnChange', $$$RbfileSelectorOnChangeDirective);

function $$$RbfileSelectorOnChangeDirective(){
	return {
		restrict: "A",

		link: function (scope, element, attrs) {
			var onChangeFunc = element.scope()[attrs.fileSelectorOnChange];
			element.bind('change', onChangeFunc);
		}
	};
}
$$$RbfileSelectorOnChangeDirective.$inject = [ ];
