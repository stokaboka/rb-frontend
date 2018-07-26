"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

angular.module('rb.controls.pagination')
	.directive('rbPagination', $$$RbPaginationDirective);

function $$$RbPaginationDirective( rbCore )
{
	return {
		restrict: "E",
		require: 'ngModel',
		template: '<div layout="row">' +
		'<md-button class="md-raised rb-controls-pagination-btn rb-controls-border-radius-left" ng-disabled="firstDisable" ng-show="boundaryLinks" ng-click="onchange({current_page: firstPage})">{{firstText}}</md-button>' +
		'<md-button class="md-raised rb-controls-pagination-btn rb-controls-no-border-radius" ng-disabled="previousDisable" ng-show="boundaryLinks" ng-click="onchange({current_page: previousPage})">{{previousText}}</md-button>' +
		'<md-button class="md-raised rb-controls-pagination-btn rb-controls-no-border-radius" ng-class="pager_button.class" ng-repeat="pager_button in pager_buttons" ng-click="onchange({current_page: pager_button.num})">{{pager_button.num}}</md-button>' +
		'<md-button class="md-raised rb-controls-pagination-btn rb-controls-no-border-radius" ng-disabled="nextDisable" ng-show="boundaryLinks" ng-click="onchange({current_page: nextPage})">{{nextText}}</md-button>' +
		'<md-button class="md-raised rb-controls-pagination-btn rb-controls-border-radius-right" ng-disabled="lastDisable" ng-show="boundaryLinks" ng-click="onchange({current_page: lastPage})">{{lastText}}</md-button>' +
		'</div>',

		replace: true,
		scope: {
			totalItems: '=',
			itemsPerPage: '=',
			maxSize: '=',
			previousText: '@',
			nextText: '@',
			firstText: '@',
			lastText: '@',
			onchange: '&ngChange',
			boundaryLinks: '=',
			model: '=ngModel'
		},

		compile: function($elem, $attrs){
			if (!$attrs.firstText) { $attrs.firstText = "&laquo;"; }
			if (!$attrs.previousText) { $attrs.previousText = "&lsaquo;"; }
			if (!$attrs.nextText) { $attrs.nextText = "&rsaquo;"; }
			if (!$attrs.lastText) { $attrs.lastText = "&raquo;"; }

			return function($scope, $elem, $attrs, $ctrl) {

				var ___num_pages = 0;
				var ___max_btns = 0;
				var ___start_page = 0;

				$scope.pager_buttons = [];

				$scope.firstDisable = true;
				$scope.previousDisable = true;
				$scope.nextDisable = true;
				$scope.lastDisable = true;

				$scope.firstPage = 1;
				$scope.previousPage = 1;
				$scope.nextPage = 1;
				$scope.lastPage = 1;

				if(!$scope.itemsPerPage){rbCore.model.$log.debug("rbPager: [itemsPerPage] expected");}
				if(!$scope.maxSize){rbCore.model.$log.debug("rbPager: [maxSize] expected");}

				$scope.currentPage = 1;

				var ___redraw = function () {

					$scope.pager_buttons = null;
					$scope.pager_buttons = [];

					if($scope.totalItems) {

						___num_pages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
						___max_btns = ($scope.maxSize > ___num_pages) ? ___num_pages : $scope.maxSize;

						var __middle_page = Math.floor(___max_btns / 2);

						if($scope.model < __middle_page){
							___start_page = $scope.model;
						}else if($scope.model >  (___num_pages - __middle_page)){
							___start_page = $scope.model - (___max_btns - (___num_pages - $scope.model)) + 1;
						}else {
							___start_page = $scope.model - Math.floor(___max_btns / 2);
						}

						___start_page = ___start_page < 1 ? 1 : ___start_page;
						___start_page = ___start_page > (___num_pages - ___max_btns + 1) ? (___num_pages - ___max_btns + 1) : ___start_page;

						for (var ___i = ___start_page; ___i < (___start_page + ___max_btns); ___i++) {
							$scope.pager_buttons.push({num: ___i, class: ___i === $scope.model ? "md-primary" : null});
						}

						$scope.previousPage = $scope.model > 1 ? ($scope.model - 1) : 1;
						$scope.nextPage = $scope.model < ___num_pages ?  $scope.model + 1 : ___num_pages;
						$scope.lastPage = ___num_pages;

						$scope.firstDisable = $scope.model <= 1;
						$scope.previousDisable = $scope.model <= $scope.previousPage;
						$scope.nextDisable = $scope.model >= $scope.nextPage;
						$scope.lastDisable = $scope.model >= $scope.lastPage;

					}else{
						$scope.firstDisable = true;
						$scope.previousDisable = true;
						$scope.nextDisable = true;
						$scope.lastDisable = true;

						$scope.firstPage = 1;
						$scope.previousPage = 1;
						$scope.nextPage = 1;
						$scope.lastPage = 1;
					}

				};

				$scope.$watch("totalItems", function (newVal, oldVal) {
					if(newVal && newVal !== oldVal) {
						___redraw();
					}
				});
				$scope.$watch("itemsPerPage", function (newVal, oldVal) {
					if(newVal && newVal !== oldVal) {
						___redraw();
					}
				});
				$scope.$watch("maxSize", function (newVal, oldVal) {
					if(newVal && newVal !== oldVal) {
						___redraw();
					}
				});

				function formatter() {
					___redraw();
				}

				$ctrl.$formatters.push(formatter);
			}

		}
	};
}
$$$RbPaginationDirective.$inject = ['rbCore'];