"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */


angular.module('rb.controls.header')
	.directive('panelHeader', $$$RbPanelHeaderDirective);

function $$$RbPanelHeaderDirective(){
	return {
		restrict: "E",
		template: '<div layout="row" layout-align="start center" style="padding: 0;">' +
		'               <span class="panel-header" style="margin-left: 10px; margin-right: 10px; margin-bottom: 0px;">{{service.title}}</span>'+
		// '               <md-progress-circular md-mode="indeterminate" class="md-warn" rb-visible="service.busy"  md-diameter="20"></md-progress-circular>'+
		'               <ng-transclude layout="row" layout-align="start center" style="margin-left: 5px; width: 100%;"></ng-transclude>'+
		'               <md-divider ></md-divider>' +
		'           </div>',
		replace: true,
		transclude: true,

		scope: {
			panelHeaderLabel: '@',
			service: '=?rbDataSource'
		},

		link: function($scope, $elem, $attrs) {
		}
	};
}
$$$RbPanelHeaderDirective.$inject = [];
