/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

import $RbBinding from '../../../rbBinding';

angular.module('rb.controls.combobox')
	.controller('RbControlsComboBoxController', $$$RbComboBoxDataController);

function $$$RbComboBoxDataController($scope, $attrs, rbCore, $timeout) {

	let __placeholder = $attrs.placeholder;

	let __static_rows = false;

	let __target_data_type = '';
	let __column = null;
	let __targetDataService = null;
	let ___selectedItemObject = {};

	$scope.dataBinding = null;

	$scope.valueSelected = 'btn-primary';

	$scope.service = null;
	$scope.rowSource = [];

	$scope.idField = '';
	$scope.labelField = '';

	$scope.defaultValueLabel = 'Все записи';

	$scope.diplayField = '';

	$scope.selectedItem = __placeholder;

	$scope.status = {
		isopen: false
	};

	let __setSelectedItem = function(____sio){
		let ___selectedItem = _.findWhere($scope.service.dataset, ____sio);
		if (___selectedItem !== undefined) {
			$scope.$applyAsync(function () {
				$scope.selectedItem = ___selectedItem;
			});
		}
	};

	$scope.toggled = function(open) {
	};

	$scope.toggleDropdown = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.status.isopen = !$scope.status.isopen;
	};

	$scope.onClick = function(__index){

		if($scope.dataBinding) {
			_.each($scope.dataBinding.items, function (item) {

				let ___bnd_target_type = item["target_type"];

				switch (__target_data_type){
					case 'filter':
						if(__targetDataService) {

							let ___target_column =
								_.findWhere(__targetDataService.columns, {db_name: item.trg.column}) ||
								_.findWhere(__targetDataService.columns, {id: item.target});

							if(___target_column) {
								if(__index < 0){
									___target_column.filter.mask = rbCore.model.getEmptyValueForDataType(___bnd_target_type);
								}else{
									___target_column.filter.mask = $scope.service.dataset[__index][item.src.column];
								}
							}else{
								/**
								 * not set target column - only show source column in combobox/list
								 */
								// rbCore.model.$log.debug("RbControlsComboBoxController: column ["+item.trg.column+"] of datasource ["+__column['datasource']+"] expected.");
							}


							rbCore.model.search( __targetDataService );
						}
						break;
					case 'transaction':
					default:
						if(__index < 0){
							rbCore.model.transaction.data[item.trg.column] = rbCore.model.getEmptyValueForDataType(___bnd_target_type);
						}else{
							rbCore.model.transaction.data[item.trg.column] = $scope.service.dataset[__index][item.src.column];
						}
				}
			});
		}
	};

	$scope.init_selectedItemStyleClass = function(__item_value){
		if(__item_value === null || __item_value === __placeholder ||  __item_value === $scope.defaultValueLabel || __item_value.length === 0){
			$scope.valueSelected = "btn-primary";
		}else{
			$scope.valueSelected = "btn-success";
		}
	};

	this.init = function() {

		if (!angular.isUndefined($attrs.defaultValueLabel)){
			$scope.defaultValueLabel = $attrs.defaultValueLabel;
		}

		if($attrs.comboboxColumn !== undefined){
			__column = JSON.parse($attrs.comboboxColumn);
			__target_data_type = 'transaction';
		}
		if($attrs.comboboxColumnFilter !== undefined){
			__column = JSON.parse($attrs.comboboxColumnFilter);
			__target_data_type = 'filter';
		}

		if (__column) {

			__targetDataService = rbCore.model.get_registered_service(__column['datasource']);

			if (__column.combobox !== undefined && __column.combobox) {

				let __combobox = __column.combobox;

				if(__combobox.datasource){
					$scope.service = rbCore.model.get_registered_service(__combobox.datasource, {scope: $scope, action: "S"});
				}else{
					$scope.service = rbCore.model.createDataSource(__combobox);
				}

				$scope.targetService = null;
				__placeholder = __combobox.placeholder;
				$scope.labelField = __combobox.label;
				$scope.dataBinding  = new $RbBinding().init( __combobox.binding );
			}
		}

		if($scope.dataBinding) {

			_.each($scope.dataBinding.items, function (item) {

				if ( item["visible"] || item["display"]) {
					if( item["target"] ) {
						$scope.diplayField = item["target"];
					}
				}

				switch (__target_data_type){
					case 'filter':
						if(__targetDataService) {

							let ___column =
								_.findWhere( __targetDataService.columns, {db_name: item.trg.column} ) ||
								_.findWhere( __targetDataService.columns, {id: item.target} ) ;

							if(___column) {
								___selectedItemObject[ item.src.column ] = ___column.filter.mask;
							}else{
								/**
								 * not set target column - only show source column in combobox/list
								 */
								// rbCore.model.$log.error("RbControlsComboBoxController: column ["+item.trg.column+"] of datasource ["+__column['datasource']+"] expected.");
							}
						}
						break;
					case 'transaction':
					default:
						if( rbCore.model.transaction.data[ item.trg.column ] ) {
							___selectedItemObject[item.src.column] = rbCore.model.transaction.data[item.trg.column];
						}
				}
			});

		}

		/**
		 * load data into combobox/list datasource
		 */
		if(!angular.isUndefined($scope.service) && $scope.service) {
			if (!__static_rows)

				if ($scope.service.status.loaded) {
					__setSelectedItem( ___selectedItemObject );
				}else{
					rbCore.model.load($scope.service, {
						page: 0,
						force: false,
						callback: function (___result) {
							if (___result && ___selectedItemObject !== undefined) {
								$timeout(__setSelectedItem, 250, true, ___selectedItemObject);
							}
						}
					});
				}
		}

	};
}

$$$RbComboBoxDataController.$inject = ['$scope', '$attrs', 'rbCore', '$timeout'];