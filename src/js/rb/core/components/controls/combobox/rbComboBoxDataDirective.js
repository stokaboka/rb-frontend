/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

"use strict";

angular.module('rb.controls.combobox')
	.directive('rbDataCombobox', $$$RbComboBoxDataDirective);

function $$$RbComboBoxDataDirective(){
	return {
		restrict: "EA",
		template: '<md-select ng-model="selectedItem" aria-label="label">' +
		'    <md-option  value="{{item}}" ng-click="onClick(-1)">' +
		'        {{defaultValueLabel}}' +
		'    </md-option>' +
		'    <md-option ng-repeat="item in service.dataset" ng-value="item" ng-click="onClick($index)">' +
		'       <span ng-repeat="bindingItem in dataBinding.items | filter: { visible: true }">' +
		'           {{item[bindingItem.src.column]}}' +
		'       </span> ' +
		'    </md-option>' +
		'</md-select>',
		replace: true,
		controller: 'RbControlsComboBoxController',

		scope: {
			table: '=',
			target: '=',
			label: '=',
			binding: '=',
			placeholder: '@',
			defaultValueLabel: '@'
		},

		link: function($scope, $elem, $attrs, $ctrl) {
			if(!$attrs.defaultValueLabel) $attrs["defaultValueLabel"] = "Все записи";
			$ctrl.init();
		}
	};
}
$$$RbComboBoxDataDirective.$inject = [];