"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

angular.module('rb.controls.treetable')
	.directive('rbTreeTableHeader', $$$RbTreeTableHeaderDirective);

function $$$RbTreeTableHeaderDirective(){
	return {
		restrict: "E",
		templateUrl: "tmpl/rb/tree_table_header.html",
		replace: true,
		controller: "rbTreeTableCtrl",

		scope: {
			model: '=rbTreeModel'
		}
	}
}
$$$RbTreeTableHeaderDirective.$inject = [];