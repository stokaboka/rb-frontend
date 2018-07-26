"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */


angular.module('rb.controls.table')
	.directive('rbTableCells', $$$RbTableCellsDirective);

function $$$RbTableCellsDirective( $compile)
{
	return {
		restrict: "E",
		//templateUrl: "tmpl/rb/data_table/cells.html",
		template: '<div class="rb-table-cell"  ng-class="column.filter.active_class">' +
		'    <div ng-if="column.gadget == null">' +
		'        <div ng-switch on="column.db_type">' +
		'            <div ng-switch-when="FILE">' +
		'                <a href="files/{{row[column.db_name]}}" download="{{row[\'file_original\']}}"><span class="glyphicon glyphicon-download"></span> {{row[\'file_original\']}}</a>' +
		'            </div>' +
		'            <div ng-switch-when="DATE" class="rb-item-format rb-date">' +
		'                {{row[column.db_name] | date:\'dd.MM.yyyy\'}}' +
		'            </div>' +
		'            <div ng-switch-when="NUMBER" class="rb-item-format rb-number">' +
		'                {{row[column.db_name] | number}}' +
		'            </div>' +
		'            <div ng-switch-when="INT" class="rb-item-format rb-number">' +
		'                {{row[column.db_name] | number:0}}' +
		'            </div>' +
		'            <div ng-switch-default>' +
		'                <span ng-bind-html="row[column.db_name]"></span>' +
		'            </div>' +
		'        </div>' +
		'    </div>' +
		'    <div ng-if="column.gadget != null">' +
		'    </div>' +
		'</div>',
		replace: true,
		scope: {
			row: "=rbDataSourceRow",
			column: "=rbDataSourceColumn"
		},

		compile: function () {
			return function(scope, elem){

				if(scope.column.gadget){
					var incEl = scope.column.gadget.compile([{name: scope.column.gadget.value_attr, value:"{{row[column.db_name]}}"}]);
					var contentTr = angular.element(incEl);
					elem.append(contentTr);
					$compile(contentTr)(scope);

					if(scope.column.gadget.replace){
						scope.show_data = false;
					}
				}

			};
		}

	};
}
$$$RbTableCellsDirective.$inject = ['$compile'];
