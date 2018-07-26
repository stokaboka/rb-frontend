"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

angular.module('rb.controls.treetable')
	.directive('rbTreeTableRow', $$$RbTreeTableRowDirective);

function $$$RbTreeTableRowDirective($compile) {
	return {
		restrict: "E",
		templateUrl: "tmpl/rb/tree_table_row.html",
		replace: true,
		controller: "rbTreeTableCtrl",

		scope: {
			row: '=rbTreeRow',
			model: '=rbTreeModel',
			test: '=rbTreeTest'
		},

		//$$tlb: true,

		//compile: function (el) {
		compile: function () {
			var watch = 'row.items';
			return function(scope, elem){

				scope.onTreeNodeClick = function (__row) {
					scope.model.onNodeClick(__row);
				};

				scope.onRowClick = function (__row) {
					scope.model.onRowClick(__row);
				};

				scope.onRowDoubleClick = function (__row) {
					scope.model.onRowDoubleClick(__row);
				};

				function updatePrior(newValue) {
					if(newValue){
						var incEl = '<rb-tree-table-row ng-repeat="row in row.items track by $index" rb-tree-model="model" rb-tree-row="row"  rb-tree-test="$index"></rb-tree-table-row>';
						var contentTr = angular.element(incEl);
						elem.after(contentTr);
						$compile(contentTr)(scope);
						scope.row.added_to_dom = true;
						scope.row.dom_element = contentTr;
					}else{
						if(scope.row.dom_element) {
							scope.row.dom_element.remove();
						}
					}
				}

				scope.$watch(watch, updatePrior);
			};
		}

	}
}
$$$RbTreeTableRowDirective.$inject = ['$compile'];