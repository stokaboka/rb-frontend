"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

angular.module('rb.controls.treetable')
	.directive('rbTreeTableCell', $$$RbTreeTableCellDirective);

function $$$RbTreeTableCellDirective($compile) {
	return {
		restrict: "E",
		templateUrl: "tmpl/rb/tree_table_cell.html",
		replace: false,
		controller: "rbTreeTableCtrl",

		scope: {
			model: '=rbTreeModel',
			row: '=rbTreeRow',
			column: '=rbTreeColumn',
			first: '=rbTreeColumnFirst'
		},

		//compile: function (el) {
		compile: function () {
			return function(scope, elem){

				scope.onTreeNodeClick = function (__row) {
					scope.model.onNodeClick(__row);
				};

				scope.show_data = true;

				scope.style = {
					level: ''
				};

				if(scope.first){
					scope.style.level = {"padding-left": ((scope.row.level-1) * 10) + "px"};
				}

				if(scope.column.gadget){
					var incEl = scope.column.gadget.compile([{name: scope.column.gadget.value_attr, value:"{{row.data[column.db_name]}}"}]);
					var contentTr = angular.element(incEl);
					elem.append(contentTr);
					$compile(contentTr)(scope);

					if(scope.column.gadget.replace){
						scope.show_data = false;
					}
				}

			};
		}
	}
}
$$$RbTreeTableCellDirective.$inject = ['$compile'];