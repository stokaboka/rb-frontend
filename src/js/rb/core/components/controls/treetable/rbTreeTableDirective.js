"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

angular.module('rb.controls.treetable')
	.directive('rbTreeTable', $$$RbTreeTableDirective);

function $$$RbTreeTableDirective(rbCore) {
	return {
		restrict: "E",
		template: '<div flex layout="column">\n' +
		'    <div flex layout="row">\n' +
		'        <panel-header rb-data-source="service" panel-header-label="{{service.title}}">\n' +
		'            <md-button class="md-icon-button md-primary rb-no-margin" ng-click="__do_Search()" aria-label="Найти">\n' +
		'                <ng-md-icon icon="search"><md-tooltip>Обновить таблицу</md-tooltip></ng-md-icon>\n' +
		'            </md-button>\n' +
		'        </panel-header>\n' +
		'    </div>\n' +
		'\n' +
		'    <div class="rb-tree-table">\n' +
		'        <rb-tree-table-content rb-tree-model="model"  rb-data-source="service" class="rb-tree-table-row-group"></rb-tree-table-content>\n' +
		'    </div>\n' +
		'</div>',
		replace: true,
		controller: "rbTreeTableCtrl",

		scope: {
			hiTitle:'@',
			hiOptions: '=',
			rowSource: '@'
		},

		link: function ($scope) {

			var ___options = {
				page:1,
				scope:$scope,
				search_by_id: null
			};

			var ___init_service = function () {
				$scope.service = rbCore.model.get_registered_service($scope.rowSource, ___options);
				___init();
			};

			$scope.$on('rd_load_complete', function(){
				if(!$scope.service){
					___init_service();
				}
			});

			var ___init = function () {
				if($scope.service) {
					$scope.model = $scope.service.hier_model;
					$scope.model.setOptions(___options);
					$scope.model.loadChildren();
				}
			};

			$scope.rbHierTableHeader = true;
			$scope.service = null;
			$scope.model = null;

			if($scope.rowSource){
				if(rbCore.model) {
					___init_service();
					// $scope.service = rbCore.model.get_registered_service($scope.rowSource, ___options);
					// ___init();
				}else{
					$scope.$watch(rbCore.model, function (newValue) {
						if(newValue){
							___init_service();
						}
					});
				}
			}else{
				$scope.$watch('rowSource', function(newValue){
					if(newValue){
						___init_service();
						// $scope.service = rbCore.model.get_registered_service(newValue, ___options);
						// ___init();
					}
				});
			}

			$scope.$watch('service', function(newValue){
				if(newValue) {
					___init();
				}
			});

			$scope.__do_Search = function () {
				if($scope.model) {
					$scope.model.loadChildren();
				}
			};
		}
	}
}
$$$RbTreeTableDirective.$inject = ['rbCore'];
