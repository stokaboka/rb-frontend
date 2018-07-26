"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */


angular.module('rb.controls.table')
	.controller('rbTableFilterTypesController', $$$RbTableFilterTypesController)
	.directive('rbTableFilterInteger', $$$RbTableFilterIntegerDirective)
	.directive('rbTableFilterNumber', $$$RbTableFilterNumberDirective)
	.directive('rbTableFilterDate', $$$RbTableFilterDateDirective)
	.directive('rbTableFilterString', $$$RbTableFilterStringDirective)
	.directive('rbTableFilterText', $$$RbTableFilterTextDirective)
	.directive('rbTableFilter', $$$RbTableFilterDirective);

function $$$RbTableFilterTypesController( $scope ) {
	$scope.clickOnReverse = function () {
		$scope.service.changeColumnFilter( $scope.column, 'REVERSE' );
	};
}
$$$RbTableFilterIntegerDirective.$inject = [ '$scope' ];

function $$$RbTableFilterIntegerDirective() {
	return {
		require: 'ngModel',
		restrict: "E",
		template: '<div layout="row">' +
		'                <ng-md-icon icon="priority_high" class="rb-filter"  ng-attr-style="{{column.filter.reverse_style}}"  ng-click="clickOnReverse()">' +
		'                    <md-tooltip>Обратный или прямой порядок вычисления выражения</md-tooltip>' +
		'                </ng-md-icon>' +

		'                <div class="rb-grid rb-grid-table">' +

		'                   <div class="rb-grid rb-grid-table-row">'	+
		'                       <div class="rb-grid rb-grid-table-cell">' +
		'                           <input type="number"  ng-model="column.filter.value1" >' +
		'                       </div>' +
		'                    </div>' +

		'                   <div class="rb-grid rb-grid-table-row">'	+
		'                       <div class="rb-grid rb-grid-table-cell">' +
		'                           <input type="number"  ng-model="column.filter.value2" >' +
		'                       </div>' +
		'                    </div>' +

		'                </div>' +

		'                <md-tooltip>Границы интервала фильтра по числовым значаниям столбца</md-tooltip>' +
		'            </div>',
		replace: true,
		scope: {
			column: '=ngModel',
			service: '=?rbDataSource'
		},
		//controller: 'rbTableFilterTypes'
		link: function( $scope ) {
			$scope.clickOnReverse = function () {
				$scope.service.changeColumnFilter( $scope.column, 'REVERSE' );
			};
		}

	};
}
$$$RbTableFilterIntegerDirective.$inject = [];

function $$$RbTableFilterNumberDirective() {
	return {
		require: 'ngModel',
		restrict: "E",
		template: '<div layout="row">' +
		'                <ng-md-icon icon="priority_high" class="rb-filter"  ng-attr-style="{{column.filter.reverse_style}}"  ng-click="clickOnReverse()">' +
		'                    <md-tooltip>Обратный или прямой порядок вычисления выражения</md-tooltip>' +
		'                </ng-md-icon>' +

		'                <div class="rb-grid rb-grid-table">' +

		'                   <div class="rb-grid rb-grid-table-row">'	+
		'                       <div class="rb-grid rb-grid-table-cell">' +
		'                           <input type="number"  ng-model="column.filter.value1" >' +
		'                       </div>' +
		'                    </div>' +

		'                   <div class="rb-grid rb-grid-table-row">'	+
		'                       <div class="rb-grid rb-grid-table-cell">' +
		'                           <input type="number"  ng-model="column.filter.value2" >' +
		'                       </div>' +
		'                    </div>' +

		'                </div>' +

		'                <md-tooltip>Границы интервала фильтра по числовым значениям столбца</md-tooltip>' +

		'            </div>',
		replace: true,
		scope: {
			column: '=ngModel',
			service: '=?rbDataSource'
		},
		//controller: 'rbTableFilterTypes'
		link: function( $scope ) {
			$scope.clickOnReverse = function () {
				$scope.service.changeColumnFilter( $scope.column, 'REVERSE' );
			};
		}

	};
}
$$$RbTableFilterNumberDirective.$inject = [];

function $$$RbTableFilterDateDirective() {
	return {
		require: 'ngModel',
		restrict: "EA",
		template: '<div layout="row">' +
		'                <ng-md-icon icon="priority_high" class="rb-filter"  ng-attr-style="{{column.filter.reverse_style}}"  ng-click="clickOnReverse()">' +
		'                    <md-tooltip>Обратный или прямой порядок вычисления выражения</md-tooltip>' +
		'                </ng-md-icon>' +

		'                <div class="rb-grid rb-grid-table">' +

		'                   <div class="rb-grid rb-grid-table-row">'	+
		'                       <div class="rb-grid rb-grid-table-cell">' +
		'                           <md-datepicker ng-model="column.filter.value1"></md-datepicker>' +
		'                       </div>' +
		'                    </div>' +

		'                   <div class="rb-grid rb-grid-table-row">'	+
		'                       <div class="rb-grid rb-grid-table-cell">' +
		'                           <md-datepicker ng-model="column.filter.value2"></md-datepicker>' +
		'                       </div>' +
		'                    </div>' +

		'                </div>' +

		'                <md-tooltip>Границы интервала фильтра по датам</md-tooltip>' +

		'            </div>',
		replace: true,
		scope: {
			column: '=ngModel',
			service: '=?rbDataSource'
		},
		//controller: 'rbTableFilterTypesController',
		link: function( $scope ) {
			$scope.clickOnReverse = function () {
				$scope.service.changeColumnFilter( $scope.column, 'REVERSE' );
			};
		}

	};
}
$$$RbTableFilterDateDirective.$inject = [];

function $$$RbTableFilterStringDirective() {
	return {
		require: 'ngModel',
		restrict: "E",
		template: '<div layout="row">' +
		'                <ng-md-icon icon="priority_high" class="rb-filter"  ng-attr-style="{{column.filter.reverse_style}}"  ng-click="clickOnReverse()">' +
		'                    <md-tooltip>Обратный или прямой порядок вычисления выражения</md-tooltip>' +
		'                </ng-md-icon>' +
		'                <div ng-if="column.combobox != null">' +
		'                    <rb-data-combobox combobox-column-filter="{{column}}" label="column.title" placeholder="{{column.title}}">' +
		'                       <md-tooltip md-direction="right">Список возможных значений для {{column.title}}</md-tooltip>' +
		'                   </rb-data-combobox>' +
		'                    <md-tooltip>Выберите значение из списка или "Все записи"</md-tooltip>' +
		'                </div>' +
		'                <div ng-if="column.combobox === null" >' +
		'                    <textarea  rows="2" ng-model="column.filter.mask" class="long" style="width: 80%;"></textarea>' +
		'                    <md-tooltip>Маска для поиска. % - включает в поиск любые символы</md-tooltip>' +
		'                </div>' +
		'            </div>',
		replace: true,
		scope: {
			column: '=ngModel',
			service: '=?rbDataSource'
		},
		//controller: 'rbTableFilterTypes'
		link: function( $scope ) {
			$scope.clickOnReverse = function () {
				$scope.service.changeColumnFilter( $scope.column, 'REVERSE' );
			};
		}

	};
}
$$$RbTableFilterStringDirective.$inject = [];

function $$$RbTableFilterTextDirective() {
	return {
		require: 'ngModel',
		restrict: "E",
		template: '<div layout="row">' +
		'                <ng-md-icon icon="priority_high" class="rb-filter"  ng-attr-style="{{column.filter.reverse_style}}"  ng-click="clickOnReverse()">' +
		'                    <md-tooltip>Обратный или прямой порядок вычисления выражения</md-tooltip>' +
		'                </ng-md-icon>' +
		'                <div >' +
		'                    <textarea  rows="2" ng-model="column.filter.mask" style="width: 80%;"></textarea>' +
		'                    <md-tooltip>Маска для поиска по значениям в столбце</md-tooltip>' +
		'                </div>' +
		'            </div>',
		replace: true,
		scope: {
			column: '=ngModel',
			service: '=?rbDataSource'
		},
		//controller: 'rbTableFilterTypes'
		link: function( $scope ) {
			$scope.clickOnReverse = function () {
				$scope.service.changeColumnFilter( $scope.column, 'REVERSE' );
			};
		}

	};
}
$$$RbTableFilterTextDirective.$inject = [];

function $$$RbTableFilterDirective( rbCore ){
	return {
		restrict: "E",
		template: '<div class="rb-table-filter">' +
		'    <div class="rb-table-cell" ng-repeat="v_column in service.columns | filter: { visible: true }" ng-class="v_column.filter.active_class">' +
		'        <div ng-switch on="v_column.filter.db_type" ng-show="v_column.filter_enabled" >' +
		'            <rb-table-filter-integer ng-switch-when="INT" ng-model="v_column" rb-data-source="service"></rb-table-filter-integer>' +
		'            <rb-table-filter-number ng-switch-when="NUMBER" ng-model="v_column" rb-data-source="service"></rb-table-filter-number>' +
		'            <rb-table-filter-date ng-switch-when="DATE" ng-model="v_column" rb-data-source="service"></rb-table-filter-date>' +
		'            <rb-table-filter-string ng-switch-when="STRING" ng-model="v_column" rb-data-source="service"></rb-table-filter-string>' +
		'            <rb-table-filter-string ng-switch-when="ENUM" ng-model="v_column" rb-data-source="service"></rb-table-filter-string>' +
		'            <rb-table-filter-text ng-switch-when="TEXT" ng-model="v_column" rb-data-source="service"></rb-table-filter-text>' +
		'        </div>' +
		'    </div>' +
		'    <div class="rb-table-cell" ng-show="reloadButton">' +
		'        <md-button class="md-icon-button md-primary rb-no-margin" ng-click="search()" aria-label="Найти">' +
		'            <ng-md-icon icon="search"><md-tooltip>Обновить таблицу</md-tooltip></ng-md-icon>' +
		'        </md-button>' +
		'    </div>' +
		'</div>',
		replace: true,
		scope: {
			service: '=?rbDataSource',
			reloadButton: '=?rbShowReloadButton'
		},

		link: function( scope ) {

			scope.reverseFilter = function ( __column ) {
				scope.service.changeColumnFilter(__column, 'REVERSE');
			};

			scope.search = function () {
				rbCore.model.search( scope.service );
			};

		}
	};
}
$$$RbTableFilterDirective.$inject = [ 'rbCore' ];