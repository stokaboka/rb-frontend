"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

angular.module('rb.controls.treetable')
	.directive('rbTreeTableContent', $$$RbTreeTableContentDirective);

function $$$RbTreeTableContentDirective() {
	return {
		restrict: "E",
		template: '<div>\n' +
		'    <rb-tree-table-header rb-tree-model="model" ></rb-tree-table-header>\n' +
		'    <rb-table-filter rb-data-source="service" rb-reload-button="false"></rb-table-filter>\n' +
		'    <rb-tree-table-row ng-repeat="row in root.items track by $index" rb-tree-model="model" rb-tree-row="row" rb-tree-test="$index"></rb-tree-table-row>\n' +
		'</div>',
		replace: true,
		controller: "rbTreeTableCtrl",
		multiElement: true,

		scope: {
			service: '=?rbDataSource',
			model: '=rbTreeModel'
		},

		link: function (scope) {
			scope.root = null;
			scope.$watch("model", function (newVal) {
				if(newVal){
					scope.root = scope.model.root;
				}
			});
		}
	}
}
$$$RbTreeTableContentDirective.$inject = [];
