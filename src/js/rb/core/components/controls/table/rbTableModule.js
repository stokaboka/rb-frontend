"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */


angular.module('rb.controls.table')
	.controller('RbDialogHistoryController', $$$RbDialogHistoryController)
	.controller('RbTableController', $$$RbTableController)
	.directive('rbTable', $$$RbTableDirective);
	//.directive('rbTablePanel', $$$RbTablePanelDirective);

function $$$RbDialogHistoryController($scope, $mdDialog, history)
{
	$scope.history = history;
	$scope.hide = function() {
		$mdDialog.hide();
	};
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
}
$$$RbDialogHistoryController.$inject = ['$scope', '$mdDialog', 'history'];

function $$$RbTableController($rootScope, $scope, $attrs, $parse, $mdDialog, rbCore, user)
{
	let self = this;
	let service_id = '';
	$scope.service = null;
	$scope.user = user;
	// if($scope.historySource) {
	//     $scope.show_history = true;
	// }else{
	//     $scope.show_history = false;
	// }
	// $scope.show_delete = true;
	// $scope.show_pager = true;
	// $scope.show_report = true;

	$scope.$on('rd_load_complete', function(){
		if(!$scope.service){
			$scope.service = rbCore.model.get_registered_service(service_id, {scope: $scope});
			// if($scope.service){
			//     $scope.show_pager = $scope.service.pager_enabled;
			// }
		}
	});

	self.init = function(__service_id){
		if( __service_id ) {
			service_id = __service_id;
			if( rbCore.model ) {
				$scope.service = rbCore.model.get_registered_service( service_id, {scope: $scope} );
			}
		}
	};

	$scope.__do_Search_Table = function () {
		rbCore.model.search($scope.service);
	};

	$scope.__do_Print_Table = function () {
		rbCore.model.search($scope.service);
	};

	$scope.do_Report_Table = function () {
		rbCore.model.load_as_file($scope.service, {include_columns: true, all_rows: true, only_visible: true, filter_description: true});
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
			'        <md-button ng-click="cancel()" aria-label="Cancel" class="md-raised">Cancel</md-button>' +
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

	$scope.__do_Delete_Record = function () {
		if($scope.service) {
			rbCore.model.delete($scope.service);
		}
	};

	$scope.__edit_row = function( __index, __event ){
		rbCore.model.$log.debug('---AgatControlsServiceTableController __edit_row');

		rbCore.model.edit($scope.service, __index, __event);
	};

	$scope.__select_row = function(__index){
		rbCore.model.$log.debug('---AgatControlsServiceTableController __select_row');
		rbCore.model.select_row( $scope.service, __index );
		if($scope.rbOnSelectRow){
			$scope.rbOnSelectRow( {param1: __index} );
		}
	};

}
$$$RbTableController.$inject = ["$rootScope", '$scope', '$attrs', '$parse', '$mdDialog', 'rbCore', 'user'];

function $$$RbTableDirective(  )
{
	return {
		restrict: "EA",
		template:'<div class="rb-panel"  flex layout-padding>' +
		'    <panel-header rb-data-source="service" panel-header-label="{{service.title}}">' +
		'        <rb-table-tools rb-data-source="service" history-source="historySource"></rb-table-tools>' +
		'    </panel-header>' +
		'    <div class="rb-table">' +
		'        <rb-table-header rb-data-source="service" rb-mark-records="true"></rb-table-header>' +
		'        <rb-table-filter rb-data-source="service" rb-show-reload-button="true" ng-show="service.filter_enabled"></rb-table-filter>' +
		'        <rb-table-rows rb-data-source="service" rb-mark-records="true" rb-on-select-row="rbOnSelectRow" rb-on-edit-row="rbOnEditRow" ></rb-table-rows>' +
		'    </div>' +
		'    <rb-table-tools rb-data-source="service" history-source="historySource"></rb-table-tools>' +
		'</div>',
		replace: true,
		controller: 'RbTableController',

		scope: {
			rowSource: '@',
			historySource: "@",
			rbOnSelectRow: '&',
			rbOnEditRow: '&'
		},

		link: function($scope, $elem, $attrs, $ctrl) {
			$scope.selected_index = 0;
			if($attrs.rowSource){
				$ctrl.init( $attrs.rowSource );
			}

			$scope.$watch('rowSource', function(newValue){
				$ctrl.init( newValue );
			});
		}
	};
}
$$$RbTableDirective.$inject = [];