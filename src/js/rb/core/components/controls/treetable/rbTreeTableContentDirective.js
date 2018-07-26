"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

angular.module('rb.controls.treetable')
	.directive('rbTreeTableContent', $$$RbTreeTableContentDirective);

function $$$RbTreeTableContentDirective() {
	return {
		restrict: "E",
		templateUrl: "tmpl/rb/tree_table_content.html",
		replace: true,
		controller: "rbTreeTableCtrl",
		multiElement: true,

		scope: {
			service: '=?rbDataSource',
			model: '=rbTreeModel'
		},

		link: function (scope) {
			scope.root = null;
			scope.$watch("model", function (newVal) {
				if(newVal){
					scope.root = scope.model.root;
				}
			});
		}
	}
}
$$$RbTreeTableContentDirective.$inject = [];