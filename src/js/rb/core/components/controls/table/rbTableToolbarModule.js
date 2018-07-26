"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */


angular.module('rb.controls.table')
	.directive('rbTableToolbar', $$$RbTableToolbarDirective);

function $$$RbTableToolbarDirective(rbCore, user){
	return {
		restrict: "EA",
		template: '<div layout="row" layout-align="start center">' +

		'    <rb-table-pager ng-attr-row-source="{{service_id}}"></rb-table-pager>' +
		'    <rb-search ng-attr-row-source="{{service_id}}"></rb-search>' +
		'    <rb-create-record-button style="margin-left: 5px;"  ng-attr-row-source="{{service_id}}" ng-show="user.logged"></rb-create-record-button>' +
		'    <rb-delete-records-button style="margin-left: 5px;" ng-attr-row-source="{{service_id}}" ng-show="user.logged"></rb-delete-records-button>' +

		'    <ng-transclude style="margin-left: 5px;"></ng-transclude>' +

		'</div>',
		replace: true,
		transclude: true,

		scope: {
			title: '@',
			rowSource: '@'
		},

		link: function($scope, $elem, $attrs) {
			$scope.user = user;
			$scope.service_id = null;
			if($attrs.rowSource) {
				$scope.service_id = $attrs.rowSource;
			}
			$scope.$watch('rowSource', function(newValue){
				$scope.service_id = newValue;
			});
		}
	};
}
$$$RbTableToolbarDirective.$inject = ['rbCore', 'user'];
