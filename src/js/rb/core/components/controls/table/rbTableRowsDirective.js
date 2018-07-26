"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */


angular.module('rb.controls.table')
	.directive('rbTableRows', $$$RbTableRowsDirective);

function $$$RbTableRowsDirective(){
	return {
		restrict: "E",
		template: '<div ' +
		'        class="rb-table-row"' +
		'        ng-repeat="v_row in service.dataset track by $index"' +
		'        ng-class="v_row.current"  style="cursor: pointer;"' +
		'        ng-dblclick="__edit_row($index, $event)"' +
		'        ng-click="__select_row($index, $event)">' +
		'    <rb-table-cells' +
		'            ng-repeat="v_column in service.columns  | filter: { visible: true }" ' +
		'            rb-data-source-column="v_column" ' +
		'            rb-data-source-row="v_row">' +
		'    </rb-table-cells>' +
		'    <div class="rb-table-cell" ng-class="v_row.current">' +
		'        <input type="checkbox" ng-model="v_row[\'select\']">' +
		'    </div>' +
		'</div>',
		replace: true,
		scope: {
			service: '=?rbDataSource',
			markRecords: '=?rbMarkRecords',
			rbOnSelectRow: '&',
			rbOnEditRow: '&'
		},

		link: function($scope, $elem, $attrs, $ctrl) {
		}
	};
}
$$$RbTableRowsDirective.$inject = [];
