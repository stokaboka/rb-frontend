"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

angular.module('rb.controls.combobox')
	.directive('rbComboBox', $$$RbComboBoxDirective);

function $$$RbComboBoxDirective() {
	return {
		restrict: "E",
		template: '<md-select ng-model="selectedItem" style="margin-top: 3px; margin-bottom: 0px; font-size: 14px;" aria-label="label">' +
		'    <md-option ng-repeat="item in items" ng-value="item" ng-click="onClick( $index, item )">' +
		'        {{item}}' +
		'    </md-option>' +
		'</md-select>',
		replace: true,

		scope: {
			items: '=rbItems',
			selectedItem: '=?rbSelectedItem',
			rbChangeHandler: "&?"
		},

		link: function($scope, $elem, $attrs) {

			$scope.onClick = function(__index, __value){
				if($scope.rbChangeHandler) {
					$scope.rbChangeHandler( { index: __index, value: __value } );
				}
			};

		}
	};
}

$$$RbComboBoxDirective.$inject = [];