"use strict";
/**
 * Created by stokaboka on 18.04.2016.
 */

angular.module('rb.controls.sidebar')
	.controller('rbControlsSideBarCtrl', $$$RbControlsSideBarController)
	.directive('rbControlsSideBar', $$$RbControlsSideBarDirective);

function $$$RbControlsSideBarController() {
}

$$$RbControlsSideBarController.$inject = [];

function $$$RbControlsSideBarDirective( $localStorage ) {
	return {
		restrict: "EA",
		template:

		'<div class="rb-sidebar" layout="column" layout-align="left top" ng-style="style">' +
			'<div class="rb-sidebar-header" layout="row" layout-align="left center">' +
				'<span class="rb-sidebar-header-text" ng-show="show">{{title}}</span>' +
				//'<md-button ng-click="btnClick()">' +
					'<ng-md-icon icon="{{showIcon}}" size="24" ng-click="btnClick()"></ng-md-icon>' +
				//'</md-button>' +
			'</div>' +
			'<ng-transclude flex layout="column" layout-align="left top" ng-show="show"></ng-transclude>' +
		'</div>',

		replace: true,
		transclude: true,
		scope: {
			title: '@?',
			id: '@?rbElementId'
		},
		link: function( $scope )
		{

			let __lsKey = "RB_SIDE_BAR__",
				__sideBarShowIcon = "chevron_right",
				__sideBarHideIcon = "chevron_left";

			let __collapsedStyle = {
				"width": "24px"
			};

			let __expandedStyle = {
				"width": "auto"
			};

			if( !$scope.id ){
				$scope.id = "DEFAULT";
			}

			__lsKey = __lsKey +  $scope.id;

			let stateChangedHandler = function () {
				$scope.showIcon = $scope.show ? __sideBarHideIcon : __sideBarShowIcon;
				$scope.style = $scope.show ? __expandedStyle : __collapsedStyle;
				$localStorage[ __lsKey ] = $scope.show;
			};


			$scope.show = $localStorage[ __lsKey ];
			if( typeof $scope.show === 'undefined' ){
				$scope.show = true;
			}

			$scope.btnClick = function () {
				console.log("+++++++++++++++");
				$scope.show = !$scope.show;
				stateChangedHandler();
			};

			stateChangedHandler();

		}
	}
}
$$$RbControlsSideBarDirective.$inject = [ '$localStorage' ];
