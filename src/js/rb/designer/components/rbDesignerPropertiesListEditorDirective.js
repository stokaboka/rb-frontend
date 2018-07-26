"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */
angular.module('rb.designer')
	.directive('rbDesignerPropertiesListEditor', $$$RedButtonDesignerPropertiesListEditorDirective);

function $$$RedButtonDesignerPropertiesListEditorDirective(rbCore, RedButtonDesignerService)
{
	return {
		restrict: "E",
		require: 'ngModel',
		template: '<div> ' +
							'<div class="rb-designer-table"> ' +
	                            '<div class="rb-table-row" ' +
	                                'ng-repeat="prop in properties track by $index" '+
	                                'layout="row"  ' +
	                                'layout-align="start center"> ' +
	                                '<div class="rb-table-cell rb-designer-no-border rb-designer-property-editor__label rb-designer-font-normal" ' +
										'ng-style="getPropertyLabelStyle(model, prop)"> ' +
										'{{prop.label}}' +
									'</div> ' +
	                                '<rb-designer-property-editor ' +
	                                    'rb-designer-property="prop" ' +
	                                    'ng-model="model" ' +
	                                    'ng-parent-model="parentmodel" ' +
	                                    'rb-data-source="datasource" ' +
	                                    'rb-data-source-column="column" ' +
	                                    'rb-data-source-row="row"> ' +
	                                '</rb-designer-property-editor> ' +
								'</div> ' +
                            '</div> ' +
                       '</div>',
		replace: true,
		scope: {
			model: '=ngModel',
			parentmodel: '=ngParentModel',
			datasource: '=?rbDataSource',
			row: "=?rbDataSourceRow",
			column: "=?rbDataSourceColumn",
			property: "=rbDesignerProperty"
		},
		controller: "rbDesignerMetaComponentController",
		link: function (scope, element, attrs, ctrl) {
		}
	};
}
$$$RedButtonDesignerPropertiesListEditorDirective.$inject = ["rbCore", "RedButtonDesignerService"];