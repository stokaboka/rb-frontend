"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

angular.module('rb.controls.search')
	.directive('searchHelp', $$$RbSearchHelpDirective);

function $$$RbSearchHelpDirective(){
	return {
		restrict: "E",
		template: '<div><p class="muted search-help"><small>'+
		'<strong>%</strong> - Соответствует любому количеству символов, даже нулевых; <br>'+
		'<strong>_</strong> - Соответствует ровно одному символу'+
		'</small></p></div>',

		replace: true
	};
}
$$$RbSearchHelpDirective.$inject = [];
