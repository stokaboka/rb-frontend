"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

	angular.module('rb.listValues')
		.directive('listValues', $$$RblistValuesDirective)
		.directive('listvaluesInputColumn', $$$RblistvaluesInputColumnDirective)
		.directive('listvaluesButtonColumn', $$$RblistvaluesButtonColumnDirective);

	function $$$RblistValuesDirective(rbCore){
		return {
			restrict: "EA",
			template: '<div aria-label="Список значений"  id="listValuesPanelID" ng-show="model.listvalues.visible" ng-class="model.listvalues.class" ng-style="model.listvalues.style"  ng-cloak style="background-color: #E3EEF7;">' +

			'    <form id="ListValuesSearchForm" name="ListValuesSearchForm" role="form"  ng-submit="" >' +

			'        <md-toolbar style="min-height: 40px;">' +
			'            <div class="md-toolbar-tools" style="height: 40px;">' +
			'                <h4>{{model.listvalues.ds.title}}</h4>' +
			'                <span flex></span>' +
			'                <!--<md-button  style="margin-top: -5px; margin-right: 5px;" aria-hidden="true" ng-click="hide()"><md-icon>close</md-icon></md-button>-->' +
			'                <ng-md-icon icon="close" style="cursor: pointer;" ng-click="hide()"></ng-md-icon>' +
			'            </div>' +
			'        </md-toolbar>' +

			'        <md-dialog-content>' +
			'            <div class="md-dialog-content" style="padding-left: 5px; padding-right: 5px;">' +

			'                <md-input-container class="md-block" style="margin: 0px; min-height: 20px; height: 26px;">' +
			'                    <label>Поиск в списке значений</label>' +
			'                    <input id="ListValuesSearchMaskText" name="ListValuesSearchMaskText"  placeholder="строка поиска - введите от 3 до 30 символов, % и _ символы замены" ng-model="search_mask" ng-minlength="3" ng-maxlength="30">' +
			'                    <!--<div ng-messages="ListValuesSearchForm.ListValuesSearchMaskText.$error" role="alert" multiple>-->' +
			'                        <!--<div ng-message="maxlength" class="my-message">строка поиска не должна быть более 30 символов</div>-->' +
			'                        <!--<div ng-message="minlength" class="my-message">строка поиска должна быть 3 или более символов</div>-->' +
			'                    <!--</div>-->' +
			'                </md-input-container>' +

			'                <rb-table row-source="{{model.listvalues.ds.id}}"></rb-table>' +

			'            </div>' +
			'        </md-dialog-content>' +

			'        <md-dialog-actions layout="row" style="padding-left: 5px; padding-right: 5px;">' +
			'            <!--<rb-table-pager flex rb-data-source="model.listvalues.ds"></rb-table-pager>-->' +
			'            <span flex></span>' +
			'            <md-button class="md-raised md-primary" aria-label="OK" type="submit" ng-click="bind()">OK<md-tooltip md-direction="right">Выбрать запись</md-tooltip></md-button>' +
			'            <md-button class="md-raised" aria-label="Cancel" ng-click="hide()" >Cancel</md-button>' +
			'        </md-dialog-actions>' +

			'    </form>' +

			'</div>',
			replace: true,
			scope:{},

			link: function($scope, $elem, $attrs, $ctrl) {
				$scope.search_mask = '';

				//$scope.listvalues = rbCore.model.listvalues;

				$scope.$on('rd_load_complete', function(){
					$scope.model = rbCore.model;
				});

				$scope.model = rbCore.model;

				$scope.show = function () {
					rbCore.model.listvalues.show();
				};

				$scope.hide = function () {
					$scope.search_mask = '';
					rbCore.model.listvalues.hide();
				};

				$scope.bind = function () {
					$scope.search_mask = '';
					rbCore.model.listvalues.bind();
					$scope.$applyAsync();
				};

				$scope.$watch("search_mask", function(newValue, oldValue) {
					if(rbCore.model && rbCore.model.listvalues) {
						rbCore.model.listvalues.search($scope.search_mask);
					}
				});

				$scope.search = function(){
					if(rbCore.model && rbCore.model.listvalues) {
						rbCore.model.listvalues.search($scope.search_mask);
					}
				};
			}
		};
	}
	$$$RblistValuesDirective.$inject = ['rbCore'];

	function $$$RblistvaluesInputColumnDirective(rbCore) {
		return {
			restrict: "A",
			link: function(scope, element, attrs) {
				element.bind('focus', function(evt) {
					if(attrs.listvaluesInputColumn) {
						rbCore.model.listvalues.init(listvaluesInputColumn, evt);
						rbCore.model.listvalues.show();
					}
				});
			}
		};
	}
	$$$RblistvaluesInputColumnDirective.$inject = ['rbCore'];

	function $$$RblistvaluesButtonColumnDirective(rbCore) {
		return {
			restrict: "A",
			link: function(scope, element, attrs) {

				element.bind('click', function(evt) {
					if(attrs.listvaluesButtonColumn) {
						rbCore.model.listvalues.init(attrs.listvaluesButtonColumn, evt);
						rbCore.model.listvalues.show();
					}
				});
			}
		};
	}
	$$$RblistvaluesButtonColumnDirective.$inject = ['rbCore'];

