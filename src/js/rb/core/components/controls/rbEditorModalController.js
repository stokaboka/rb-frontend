"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

angular.module('rb.controls')
	.controller('RbEditorModalCtrl', $$$RbEditorModalCtrl);

function $$$RbEditorModalCtrl( $scope, $mdDialog, rbCore )
{
	$scope.file_uploader_field = '';

	$scope.rbModel = rbCore.model;

	$scope.search_mask_change = function(){
		rbCore.model.listvalues.search();
	};

	$scope.hide_listvalues = function(){
		rbCore.model.listvalues.visible = false;
	};

	$scope.show_listvalues = function(){
		//$rootScope.listvalues.set_current_row(0);
		rbCore.model.listvalues.visible = true;
	};

	$scope.show_hide_listvalues = function(){
		if(rbCore.model.listvalues.visible)$scope.hide_listvalues();
		else $scope.show_listvalues();
	};

	$scope.fileToUploadChanged = function(__event){
		var files = __event.target.files;
		var __target_field = __event.target.getAttribute("target_field");
		rbCore.model.upload(files, __target_field);
	};

	$scope.openDatePicker = function($event, __column) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.hide_listvalues();

		if(typeof __column['is_open'] === 'undefined'){
			__column['is_open'] = true;
		}else{
			__column['is_open'] = !__column['is_open'];
		}
	};

	$scope.ok = function () {
		var ___rez = rbCore.model.transaction.validate();
		if(___rez) {
			rbCore.model.listvalues.visible = false;
			$mdDialog.hide();
		}
	};

	$scope.cancel = function () {
		rbCore.model.listvalues.visible = false;
		$mdDialog.cancel();
	};
}

$$$RbEditorModalCtrl.$inject = ["$scope", "$mdDialog", 'rbCore'];