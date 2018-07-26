"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */
angular.module('rb.designer')
	.directive('rbDesignerPropertyEditor', $$$RedButtonDesignerPropertyEditorDirective);

function $$$RedButtonDesignerPropertyEditorDirective(rbCore, RedButtonDesignerService)
{
	return {
		template: '<div class="rb-table-row rb-designer-no-border">\
					<div ng-switch on="property.control" class="rb-table-cell rb-designer-no-border"> \
		                <input ng-switch-when="number" \
		                    type="number"  \
		                    ng-disabled="property.disabled" \
		                    ng-model="model[property.name]" \
		                    ng-required="property.required" \
		                    step="{{property.step}}" \
		                    min="{{property.min}}" \
		                    max="{{property.max}}" \
		                    g-style="property.style"> \
		                <input ng-switch-when="checkbox" \
		                    type="checkbox" \
		                    ng-disabled="property.disabled" \
		                    ng-model="model[property.name]"> \
		                <textarea  ng-switch-when="text" \
		                    rows="2" \
		                    cols="40"  \
		                    ng-disabled="property.disabled" \
		                    ng-model="model[property.name]">\
		                </textarea> \
		                <md-datepicker ng-switch-when="date" \
		                    ng-model="model[property.name]" >\
		                </md-datepicker>\
				        \
				        \
				        <span ng-switch-when="RbDataSourceOrderBy">RbDataSourceOrderBy</span>\
				        <span ng-switch-when="RbDataSourceGroupBy">RbDataSourceGroupBy</span>\
		                <span ng-switch-when="RbRowFilter">RbRowFilter</span>\
		                <span ng-switch-when="RbRowValidator">RbRowValidator</span>\
		                <span ng-switch-when="RbHierarchyConnection">RbHierarchyConnection</span>\
		                \
		                \
		                <div ng-switch-when="RbPropertiesEditor">\
		                    <rb-designer-properties-editor  \
		                        rb-component-control="property.control" \
		                        ng-model="model[property.name]" \
		                        ng-parent-model="model" \
		                        rb-designer-property="property" \
		                        rb-data-source="datasource" \
		                        rb-data-source-column="column" \
		                        rb-data-source-row="row" \
		                        on-rb-property-change="onPropertyChange(info)" >\
		                        <rb-designer-properties-list-editor \
		                            ng-model="model[property.name]" \
		                            ng-parent-model="model" \
		                            rb-designer-property="property" \
		                            rb-data-source="datasource" \
		                            rb-data-source-column="column" \
		                            rb-data-source-row="row">\
		                        </rb-designer-properties-list-editor>\
		                    </rb-designer-properties-editor>\
		                </div>\
		                \
				        \
						<rb-designer-objects-collection-editor \
							ng-switch-when="rbObjectsCollection" \
							ng-model="model[property.name]" \
							ng-parent-model="model" \
							rb-designer-property="property" \
							rb-object-type="property.type" \
							rb-data-source="datasource" \
							rb-data-source-column="column" \
							rb-data-source-row="row" \
							rb-label="{{property.label}}">\
						</rb-designer-objects-collection-editor>\
						\
						<rb-designer-property-values-list \
							ng-switch-when="rbPropertyValuesList" \
							ng-model="model[property.name]" \
							ng-parent-model="model" \
							rb-data-source="datasource" \
							rb-data-source-column="column" \
							rb-data-source-row="row"  \
							rb-designer-property="property">\
						</rb-designer-property-values-list>\
						\
						<input ng-switch-default \
							type="text" \
							ng-disabled="property.disabled" \
							ng-model="model[property.name]"> \
					</div>\
					<div ng-show="showPropertyDescription" class="rb-table-cell rb-designer-no-border">\
						<span>{{propertyDescription}}</span>\
					</div>\
				</div>',
		restrict: "E",
		require: 'ngModel',
		replace: true,
		scope: {
			model: '=ngModel',
			parentmodel: '=ngParentModel',
			datasource: '=?rbDataSource',
			row: "=?rbDataSourceRow",
			column: "=?rbDataSourceColumn",
			property: "=rbDesignerProperty"
		},
		link: function (scope, element, attrs, ctrl) {

			scope.designer = RedButtonDesignerService;
			scope.propertyDescription = '';
			scope.showPropertyDescription = false;


			if(!scope.property.hasOwnProperty('disabled')){
				scope.property['disabled'] = false
			}

			scope.onPropertyChange = function ( info ) {
				switch (info.event){
					case 'OPEN_CLOSE_EDITOR' :
						// scope.showPropertyDescription = !info.value;
						break;
					case 'CREATE_CLEAR_PROPERTY' :
						break;
					case 'MODEL_CHANGED' :
						break;
				}

				if(scope.model && scope.property && scope.model[scope.property.name] && scope.model[scope.property.name].getDescription) {
					scope.propertyDescription = scope.model[scope.property.name].getDescription();
				}

			};

			if(!_.isUndefined(scope.property.onLink)){
				scope.property.onLink({scope: scope});
			}


				let ___watch_property = "model." + scope.property.name;
				scope.$watch(___watch_property, function (newVal, OldVal) {
					if(scope.model) {
						if(scope.model[scope.property.name]){
							if(scope.model[scope.property.name].getDescription){
								scope.propertyDescription = scope.model[scope.property.name].getDescription();
							}
						}
						if(!_.isUndefined(scope.property.onChange)) {
							scope.property.onChange({
								designer: scope.designer,
								scope: scope,
								value: scope.model[scope.property.name]
							});
						}
					}
				});

		}
	}
};
$$$RedButtonDesignerPropertyEditorDirective.$inject = ["rbCore", "RedButtonDesignerService"];