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
		template: '<div class="rb-tree-table-header">\n' +
		'    <div class="rb-tree-table-cell" ng-repeat="column in model.columns  | filter: {visible: true}">\n' +
		'        {{column.title}}\n' +
		'    </div>\n' +
		'</div>',
		replace: true,
		controller: "rbTreeTableCtrl",

		scope: {
			model: '=rbTreeModel'
		}
	}
}
$$$RbTreeTableHeaderDirective.$inject = [];
