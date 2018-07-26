/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

"use strict";
angular.module('rb.designer')
	.directive('rbDesignerPanel', $$$RedButtonDesignerPanelDirective);

function $$$RedButtonDesignerPanelDirective(user)
{
	return {
		restrict: "E",
		template:
			'<div class="rb-designer-panel" layout="column">' +
				'<md-toolbar  class="md-hue-2" style="position: relative;">' +
					'<div class="md-toolbar-tools">' +
						'<label class="rb-toolbar-label rb-designer-font" style="font-weight: bold">Data Model Designer</label>' +

						'<label class="rb-toolbar-label rb-designer-font">ID:</label>' +
						'<input class="rb-designer-font" ng-model="designer.model.id"/>' +

						'<label class="rb-toolbar-label rb-designer-font">Description:</label>' +
						'<input class="rb-designer-font" style="width: 100%" ng-model="designer.model.description"/>' +

						'<md-button class="md-icon-button" style="width: 64px" aria-label="Save" ng-show="user.logged" ng-click="saveModel()">' +
							'<ng-md-icon ng-attr-icon="save" class="rb-designer-toolbar-icon"></ng-md-icon>' +
						'</md-button>' +

						'<label class="rb-toolbar-label rb-designer-font">Status:</label>' +
						'<span class="rb-toolbar-info rb-designer-font">{{designer.model.status}}</span>' +

						'<span class="rb-toolbar-label rb-designer-font">Arrange:</span>' +
						'<rb-combo-box class="rb-color-white" rb-items="designer.alignmentLayouts" rb-change-handler="arrangeElements( index, value )"></rb-combo-box>'+

						'<span class="rb-toolbar-info rb-designer-font">{{designer.status.message}}</span>' +
					'</div>' +
				'</md-toolbar>' +

				'<md-content id="rb_designer_desktop" style="width:100%; height:100%; overflow: auto;">' +

						'<rb-designer-data-relation ' +
							'ng-show="designer.visible.relations" ' +
							'ng-repeat="relation in designer.model.relations | filter:{visible: true}  track by $index" ' +
							'ng-model="relation">' +
						'</rb-designer-data-relation>' +

						'<rb-designer-meta-component ng-model="designer.models" rb-designer-structure="designer.STRUCTURE.models" rb-selected-model="designer.model"> </rb-designer-meta-component>' +
						'<rb-designer-meta-component ng-model="designer.databases" rb-designer-structure="designer.STRUCTURE.database"> </rb-designer-meta-component>' +
						'<rb-designer-meta-component ng-model="designer.database.tables" rb-designer-structure="designer.STRUCTURE.table"> </rb-designer-meta-component>' +

						'<rb-designer-meta-component ng-model="designer.model.applications" rb-designer-structure="designer.STRUCTURE.application"> </rb-designer-meta-component>' +
						'<rb-designer-meta-component ng-model="designer.model.forms" rb-designer-structure="designer.STRUCTURE.form"> </rb-designer-meta-component>' +

						'<rb-designer-meta-component ng-model="designer.model.datasources" rb-designer-structure="designer.STRUCTURE.datasource"> </rb-designer-meta-component>' +

						'<rb-designer-data-sources ' +
//							'ng-repeat="ds in designer.model.datasources | filter:{builder_info: {display: true}} track by $index " ' +
							'ng-repeat="ds in designer.model.datasources track by $index " ' +
							'ng-model="ds" >' +
						'</rb-designer-data-sources>' +

						'<rb-designer-data-relation-menu ' +
							'ng-model="designer.relation" ' +
							'ng-show="designer.visible.relationMenu">' +
						'</rb-designer-data-relation-menu>' +

					'</md-content>' +
			'</div>',
		replace: true,
		scope:{},
		controller: "rbDesignerMetaComponentController",
		link: function( scope ) {
			scope.user = user;
		}
	};
}

$$$RedButtonDesignerPanelDirective.$inject = ['user'];