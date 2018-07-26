/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

"use strict";

angular.module('rb.controls.combobox')
	.directive('rbArrayCombobox', $$$RbComboBoxArrayDirective);

function $$$RbComboBoxArrayDirective() {
	return {
		restrict: "E",
		//templateUrl: "tmpl/controls/arrayComboBox.html",
		template: '<md-select ng-model="selectedItem" style="margin-top: 3px; margin-bottom: 0px; font-size: 14px;" aria-label="label">\n' +
		'    <md-option  value="{{item}}" ng-click="onClick(-1)">\n' +
		'        {{selectedItem.label}}\n' +
		'    </md-option>\n' +
		'    <md-option ng-repeat="item in data.items" ng-value="item" ng-click="onClick($index, item)">\n' +
		'        {{item[labelField]}}\n' +
		'    </md-option>\n' +
		'</md-select>',
		replace: true,

		scope: {
			hiChangeHandler: "@",
			hiDataArray: '=',
			hiSelectedItem: '@'
		},

		link: function($scope, $elem, $attrs) {
			$scope.data = {"items": []};
			$scope.data.items = JSON.parse($attrs.hiDataArray);

			var __defItem = {"value": 0, "label": "Значение не выбрано"};

			if($attrs.hiSelectedItem){
				var __si = JSON.parse($attrs.hiSelectedItem);
				$scope.selectedItem = _.findWhere($scope.list_items, __si);
				if(typeof $scope.selectedItem === "undefined")
					$scope.selectedItem = __defItem;
			}else{
				$scope.selectedItem = __defItem;
			}


			if(!$attrs.hiDefaultLabel) $attrs["hiDefaultLabel"] = $scope.selectedItem["label"];

			$scope.onClick = function(__index, __value){
				if($scope.hiChangeHandler) {
					var __fn = $scope.$parent[$scope.hiChangeHandler];
					if(__fn){
						$scope.$parent.$apply(function(){
							__fn(__index, __value);
						});
					}
				}
			};

		}
	};
}

$$$RbComboBoxArrayDirective.$inject = [];