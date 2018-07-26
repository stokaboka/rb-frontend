"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

angular.module('rb.controls.table')
	.directive('rbTableHeader', $$$RbTableHeaderDirective);

function $$$RbTableHeaderDirective(  )
{
	return {

		restrict: "E",
		template:
			'<div class="rb-table-header">' +
			'	<div class="rb-table-cell" ng-repeat="v_column in service.columns  | filter: { visible: true }" ng-class="v_column.filter.active_class">' +
			'		<div layout="row" layout-align="left center">' +
			'			<div flex>{{v_column.title}}</div>' +
			'				<div layout="row" layout-align="center center" ng-show="v_column.order_enabled">' +
			'					<div layout="column" layout-align="center center">' +
			'						<ng-md-icon icon="{{v_column.order.iconUp}}"  ng-class="v_column.order.classUp" ng-click="sortASC(v_column)">' +
			'							<md-tooltip>Сортировка по возрастанию</md-tooltip>' +
			'						</ng-md-icon>' +
			'						<ng-md-icon icon="{{v_column.order.iconDown}}" ng-class="v_column.order.classDown" ng-click="sortDESC(v_column)">' +
			'							<md-tooltip>Сортировка по убыванию</md-tooltip>' +
			'						</ng-md-icon>' +
			'					</div>' +
			'				<div ng-show="v_column.order.num>0">{{v_column.order.num}}<md-tooltip>Очередность столбца в сортировке набора данных</md-tooltip></div>' +
			'			</div>' +
			'		</div>' +
			'	</div>' +
			'<div class="rb-table-cell" ng-show="markRecords">*</div>' +
			'</div>',

		replace: true,

		scope: {
			service: '=?rbDataSource',
			markRecords: '=?rbMarkRecords'
		},

		link: function( $scope ) {
			$scope.sortASC = function( __column ){
				$scope.service.changeOrder( __column, 'ASC' );
			};
			$scope.sortDESC = function( __column ){
				$scope.service.changeOrder( __column, 'DESC' );
			};
		}
	};
}
$$$RbTableHeaderDirective.$inject = [];
