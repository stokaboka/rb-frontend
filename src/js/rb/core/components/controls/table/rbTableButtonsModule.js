"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */


angular.module('rb.controls.table')
	.directive('rbCreateRecordButton', $$$RbCreateRecordButtonDirective)
	.directive('rbDeleteRecordsButton', $$$RbDeleteRecordButtonDirective)
	.directive('rbFileDownloadButton', $$$RbFileDownloadButtonirective);

function $$$RbCreateRecordButtonDirective(rbCore){
	return {
		restrict: "EA",
		template: '<div><md-button class="md-raised"  aria-label="Создать">Создать<md-tooltip>Добавить новую запись</md-tooltip></md-button></div>',
		replace: true,

		scope: {
			rowSource: '@'
		},

		link: function($scope, $elem, $attrs) {
			$elem.bind('click', function(event){
				if($attrs.rowSource){
					var __service = rbCore.model.get_registered_service($attrs.rowSource, {scope: $scope});
					if(__service) {
						rbCore.model.create(__service, event);
					}
				}
			});
		}
	};
}
$$$RbCreateRecordButtonDirective.$inject = ['rbCore'];

function $$$RbDeleteRecordButtonDirective(rbCore) {
	return {
		restrict: "EA",
		template: '<div><md-button class="md-raised  md-warn"  aria-label="Удалить" >Удалить<md-tooltip>Удалить выбранные записи</md-tooltip></md-button></div>',
		replace: true,

		scope: {
			rowSource: '@'
		},

		link: function($scope, $elem, $attrs, $ctrl) {

			$elem.bind('click', function(event){
				if($attrs.rowSource){
					var __service = rbCore.model.get_registered_service($attrs.rowSource, {scope: $scope});
					if(__service) {
						rbCore.model.delete(__service);
					}
				}
			});
		}
	};
}
$$$RbDeleteRecordButtonDirective.$inject = ['rbCore'];

function $$$RbFileDownloadButtonirective(rbCore) {
	return {
		restrict: "A",
		template: '<button class="btn btn-default btn-sm" type="button" data-toggle="tooltip" title="Загрузить файл"><span class="glyphicon glyphicon-download"></span></button>',
		replace: true,

		scope: {
			fileId: '='
		},

		link: function($scope, $elem, $attrs, $ctrl) {

			$elem.bind('click', function(){
				rbCore.model.dowloadFile($scope.fileId);
			});
		}
	};
}
$$$RbFileDownloadButtonirective.$inject = ['rbCore'];
