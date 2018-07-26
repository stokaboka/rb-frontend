"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */
angular.module('rb.designer')
	.directive('rbDesignerPropertiesEditor', $$$RedButtonDesignerPropertiesEditorDirective);

function $$$RedButtonDesignerPropertiesEditorDirective(rbCore, RedButtonDesignerService)
{
	return {
		restrict: "E",
		//require: 'ngModel',
		template: '<div layout="row"  layout-align="start start"> ' +
							'<ng-md-icon  class="rb-table-cell rb-designer-block-icon rb-designer-block-action-icon" size="20" ' +
								'icon="{{property_edit_icon}}" ng-click="changePropertyEditorMode()"> ' +
								'<md-tooltip ng-show="property_edit_tooltip">{{property_edit_tooltip}}</md-tooltip> ' +
							'</ng-md-icon> ' +
							'<ng-md-icon  class="rb-table-cell rb-designer-block-icon rb-designer-block-action-icon" size="20" ' +
								'icon="{{property_create_clear_icon}}" ng-click="createClearPropertyValue()" ng-show="property_edit"> ' +
								'<md-tooltip ng-show="property_create_clear_tooltip">{{property_create_clear_tooltip}}</md-tooltip> ' +
							'</ng-md-icon> ' +
							'<div ng-hide="property_edit"> ' +
							' {{model.id}} '+
							'</div> ' +
                            '<ng-transclude ng-show="property_editor_visible"></ng-transclude> ' +
                        '</div> ',
		replace: true,
		transclude: true,
		scope:{
			model: '=ngModel',
			parentmodel: '=ngParentModel',
			property: "=rbDesignerProperty",
			type: "=rbObjectType",
			datasource: '=?rbDataSource',
			row: "=?rbDataSourceRow",
			column: "=?rbDataSourceColumn",
			control: "=?rbComponentControl",
			onRbPropertyChange: '&'
		},
		controller: "rbDesignerMetaComponentController",
		link: function(scope, element, attrs, ctrl) {
			scope.initPropertyEditor();
		}
	};
}
$$$RedButtonDesignerPropertiesEditorDirective.$inject = ["rbCore", "RedButtonDesignerService"];