"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

angular.module('rb.controls.table')
	.controller('rbTableToolsController', $$$rbTableToolsController)
	.directive('rbTableTools', $$$RbTableToolsDirective);

function $$$rbTableToolsController( $scope, $parse, $mdDialog, user, rbCore )
{

	$scope.isShowReports = function () {
		if($scope.service) {
			return $scope.show_report && $scope.service.report_enabled;
		}else{
			return false;
		}
	};

	$scope.isShowHistory = function () {
		if($scope.service) {
			return $scope.show_history && $scope.service.history_enabled;
		}else{
			return false;
		}
	};

	$scope.isShowCreateBtn = function () {
		if($scope.service) {
			return $scope.user.logged && $scope.service.insert_enabled;
		}else{
			return false;
		}
	};

	$scope.isShowEditBtn = function () {
		if($scope.service) {
			return $scope.user.logged && $scope.service.update_enabled;
		}else{
			return false;
		}
	};

	$scope.isShowDeleteBtn = function () {
		if($scope.service) {
			return $scope.user.logged && $scope.service.delete_enabled;
		}else{
			return false;
		}
	};

	$scope.user = user;
	$scope.show_history = !!$scope.historySource;

	$scope.show_pager = true;
	$scope.show_report = true;

	$scope.__do_Search_Table = function () {
		rbCore.model.search($scope.service);
	};

	$scope.__do_Print_Table = function () {
		rbCore.model.search($scope.service);
	};

	$scope.do_Report_Table = function () {
		rbCore.model.load_as_file($scope.service, {"include_columns": true, "all_rows": true, "only_visible": true, "only_printable": true, "filter_description": true});
	};

	$scope.__do_Show_History_Dialog = function(__event, __data_source) {
		$mdDialog.show({
			controller: "RbDialogHistoryController",
			//templateUrl: 'tmpl/common/history.html',
			template: '<md-dialog aria-label="История изменения" class="dialogdemoBasicUsage">' +
			'    <md-content>' +
			'        <md-subheader class="md-sticky-no-effect dialog-title">История изменений</md-subheader>' +
			'        <br/>' +
			'        <rb-table ng-attr-row-source="{{history}}"></rb-table>' +
			'' +
			'    </md-content>' +
			'    <div class="md-dialog-actions" layout="row">' +
			'        <span flex></span>' +
			'        <md-button ng-click="hide()" aria-label="OK" class="md-raised md-primary">OK</md-button>' +
			'        <md-button ng-click="cancel()" aria-label="Close" class="md-raised">Close</md-button>' +
			'    </div>' +
			'</md-dialog>',
			parent: angular.element(document.body),
			targetEvent: __event,
			locals: {history: __data_source}
		})
			.then(function(answer) {
			}, function() {
			});
	};

	$scope.__do_Create_Record = function (event) {
		if($scope.service) {
			rbCore.model.create($scope.service, event);
		}
	};

	$scope.__do_Edit_Record = function (event) {
		if($scope.service) {
			rbCore.model.edit($scope.service, $scope.service.current_row, event);
		}
	};

	$scope.__do_Delete_Record = function () {
		if($scope.service) {
			rbCore.model.delete($scope.service);
		}
	};

	$scope.$watch($parse('service.total_rows'), function(value) {
		if(value === 0){
			$scope.show_history = false;
			$scope.show_delete = false;
			$scope.show_pager = false;
			$scope.show_report = false;
		}else{
			if($scope.historySource) {
				$scope.show_history = true;
			}
			$scope.show_delete = true;
			$scope.show_pager = !!($scope.service && value > $scope.service.page_length);
			$scope.show_report = true;
		}
		//$scope.show_pager = true;
	});

}
$$$rbTableToolsController.$inject = ['$scope', '$parse', '$mdDialog', 'user', 'rbCore'];

/**
 * TODO rewrite toolbar buttons: array ob buttons definitions, draw in cycle
 * @returns {{restrict: string, template: string, controller: string, replace: boolean, scope: {service: string, historySource: string}}}
 */
function $$$RbTableToolsDirective( )
{
	return {
		restrict: "E",
		template:
		'<div layout="row" layout-align="start center" style="padding: 0; width: 100%;">'+
		'   <md-button class="md-icon-button md-primary rb-no-margin" ng-click="__do_Search_Table()" aria-label="Refresh" ng-show="service.filter_enabled">'+
		'       <ng-md-icon icon="search"><md-tooltip>Refresh</md-tooltip></ng-md-icon>'+
		'   </md-button>'+
		'   <md-button class="md-icon-button md-primary rb-no-margin" ng-click="do_Report_Table()" aria-label="Load" ng-show="isShowReports()">'+
		'       <ng-md-icon icon="file_download"><md-tooltip>Load XLSX file</md-tooltip></ng-md-icon>'+
		'   </md-button>'+
		'   <md-button class="md-icon-button md-primary rb-no-margin" ng-click="__do_Show_History_Dialog($event, historySource)" aria-label="History"  ng-show="isShowHistory()">'+
		'       <ng-md-icon icon="history"><md-tooltip>Show the history</md-tooltip></ng-md-icon>'+
		'   </md-button>'+
		'   <md-button class="md-icon-button md-primary rb-no-margin" ng-click="__do_Create_Record($event)" aria-label="New" ng-show="isShowCreateBtn()">'+
		'       <ng-md-icon icon="add_circle_outline"><md-tooltip>New record</md-tooltip></ng-md-icon>'+
		'   </md-button>'+
		'   <md-button class="md-icon-button md-primary rb-no-margin" ng-click="__do_Edit_Record($event)" aria-label="Edit" ng-show="isShowEditBtn()">'+
		'       <ng-md-icon icon="edit"><md-tooltip>Edit record</md-tooltip></ng-md-icon>'+
		'   </md-button>'+
		'   <md-button class="md-icon-button md-primary rb-no-margin" ng-click="__do_Delete_Record()" aria-label="Delete" ng-show="isShowDeleteBtn()">'+
		'       <ng-md-icon icon="highlight_off"><md-tooltip>Delete selected records</md-tooltip></ng-md-icon>'+
		'   </md-button> '+
		'   <span class="rb-status" ng-class="{\'rb-ok\': service.status.success, \'rb-error\': service.status.error}">{{service.status.message}}</span> ' +
		'   <div flex></div>'+
		'   <rb-table-pager rb-data-source="service" ng-show="show_pager"></rb-table-pager>'+
		'</div>',

		controller: 'rbTableToolsController',

		replace: true,
		scope: {
			service: '=?rbDataSource',
			historySource: '=?historySource'
		}

	};
}
$$$RbTableToolsDirective.$inject = [];
