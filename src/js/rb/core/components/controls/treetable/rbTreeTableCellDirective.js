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
		template: '<div layout="row" layout-align="start center" ng-style="style.level">\n' +
		'    <div ng-if="first" layout="row" layout-align="start center">\n' +
		'        <ng-md-icon ng-if="model.show_hier_arrow" icon="{{row.expanded_icon}}" size="24" style="cursor: pointer;" ng-style="row.expanded_style" ng-click="onTreeNodeClick(row)" rb-visible="row.is_node">\n' +
		'            <md-tooltip md-direction="right">Развернуть или свернуть</md-tooltip>\n' +
		'        </ng-md-icon>\n' +
		'        <ng-md-icon icon="{{row.node_icon}}" size="20" style="cursor: pointer;" ng-style="row.node_style" ng-click="onTreeNodeClick(row)">\n' +
		'            <md-tooltip md-direction="right">Развернуть или свернуть</md-tooltip>\n' +
		'        </ng-md-icon>\n' +
		'    </div>\n' +
		'\n' +
		'    <div flex ng-switch on="column.db_type" ng-show="show_data" >\n' +
		'\n' +
		'        <div ng-switch-when="DATE" class="rb-item-format rb-date">\n' +
		'            {{row.data[column.db_name] | date:\'dd.MM.yyyy\'}}\n' +
		'        </div>\n' +
		'        <div ng-switch-when="NUMBER" class="rb-item-format rb-number">\n' +
		'            {{row.data[column.db_name] | number}}\n' +
		'        </div>\n' +
		'        <div ng-switch-when="INT" class="rb-item-format rb-number">\n' +
		'            {{row.data[column.db_name] | number:0}}\n' +
		'        </div>\n' +
		'        <div ng-switch-default>\n' +
		'            {{row.data[column.db_name]}}\n' +
		'        </div>\n' +
		'\n' +
		'    </div>\n' +
		'</div>',
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
