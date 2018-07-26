"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */


angular.module('rb.controls.table')
	.controller('RbTablePagerController', $$$RbTablePagerController)
	.directive('rbTablePager', $$$RbTablePagerDirective);

function $$$RbTablePagerController($scope, $attrs, $parse, $interpolate, rbCore) {
	let self = this;
	let service_id = '';
	$scope.service = null;

	let __MODES = {
		PAGER: {
			id: 'PAGER',
			label: 'Все записи',
			visible: true,
			page: 1,
			//reset to default page length
			page_length: -1
		},
		ALL_ROWS: {
			id: 'ALL_ROWS',
			label: 'Группы записей',
			visible: false,
			page: false,
			page_length: 0
		}
	};

	$scope.page_mode = __MODES.PAGER;

	$scope.switchPagerMode = function () {
		switch($scope.page_mode.id){
			case __MODES.PAGER.id :
				$scope.page_mode = __MODES.ALL_ROWS;
				break;
			case __MODES.ALL_ROWS.id :
				$scope.page_mode = __MODES.PAGER;
				break;
			default:
				$scope.page_mode = __MODES.PAGER;
		}

		$scope.load($scope.page_mode.page);
	};

	$scope.$watch($parse('service'), function() {
		if($scope.service) {
			$scope.page_length = $scope.service.page_length;
			$scope.max_pages = $scope.service.max_pages;
			$scope.total_rows = $scope.service.total_rows;
			$scope.current_page = $scope.service.page;
		}
	});

	$scope.$watch($parse('service.total_rows'), function(value) {
		$scope.total_rows = value;
	});

	$scope.$watch($parse('service.page'), function(value) {
		$scope.page = value;
		$scope.current_page = value;
	});

	self.init = function(__service_id){
		if(__service_id) {
			service_id = __service_id;
			$scope.service = rbCore.model.get_registered_service(service_id, {scope: $scope});
		}
	};

	$scope.page_length = 10;
	$scope.total_rows = 0;
	$scope.current_page = 0;
	$scope.max_pages = 10;
	$scope.total_rows = 0;

	$scope.load = function(page){
		if($scope.service){
			$scope.current_page = page;
			rbCore.model.load($scope.service, {page: page, force: true, page_length: $scope.page_mode.page_length});
		}
	};

}

$$$RbTablePagerController.$inject = ['$scope', '$attrs', '$parse', '$interpolate', 'rbCore'];

function $$$RbTablePagerDirective(){
	return {
		restrict: "EA",
		template:'<div layout="row" layout-align="start center" >' +
		'<rb-pagination ng-show="page_mode.visible"' +
//		' style="margin: 0; min-width: 320px;" ' +
		' ng-model="current_page" ' +
		' total-items="total_rows" ' +
		' items-per-page="page_length" ' +
		' max-size="5" ' +
		' previous-text="&lsaquo;" next-text="&rsaquo;" ' +
		' boundary-links="true" ' +
		' first-text="&laquo;" last-text="&raquo;" ' +
		' ng-change="load(current_page)">'+
		'</rb-pagination>' +
		//'<md-button class="md-raised" ng-click="switchPagerMode()">{{page_mode.label}}</md-button>' +
		'</div>',
		replace: true,
		controller: 'RbTablePagerController',

		scope: {
			service: '=?rbDataSource'
		},

		link: function($scope, $elem, $attrs, $ctrl) {
		}
	};
}
$$$RbTablePagerDirective.$inject = [];
