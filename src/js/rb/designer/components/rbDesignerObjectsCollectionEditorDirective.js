"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

angular.module('rb.designer')
	.directive('rbDesignerObjectsCollectionEditor', $$$RedButtonDesignerObjectsCollectionEditorDirective);

function $$$RedButtonDesignerObjectsCollectionEditorDirective($parse, rbCore, RedButtonDesignerService)
{
	return {
		restrict: "E",
		require: 'ngModel',
		template: '<div  >\
                                <div class="rb-table">\
                                    <div class="rb-table-header">\
                                        <div class="rb-table-cell" ng-repeat="header_column in properties  track by $index" >{{header_column.label}}</div>\
                                        <div class="rb-table-cell"><ng-md-icon icon="{{designer.ICONS.EDITOR.CREATE}}" size="20" ng-click="createItem($event)"><md-tooltip>Create Item</md-tooltip></ng-md-icon></div>\
                                    </div>\
                                    <div class="rb-table-row rb-table-selectable-row"  ng-repeat="item in model_items  track by $index">\
                                        <div class="rb-table-cell" ng-switch on="property.control" ng-repeat="property in properties  track by $index" >\
	                                        <rb-designer-property-editor \
	                                            rb-designer-property="property" \
	                                            ng-model="item" \
	                                            rb-data-source="datasource" \
	                                            rb-data-source-column="column" \
	                                            rb-data-source-row="row">\
	                                        </rb-designer-property-editor>\
                                        </div>\
                                        <div class="rb-table-cell"><ng-md-icon icon="{{designer.ICONS.EDITOR.CLEAR}}" size="20" ng-click="releaseItem($event, item)"><md-tooltip>Release Item</md-tooltip></ng-md-icon></div>\
                                    </div>\
                                </div>\
                        </div>',
		replace: true,
		scope:{
			model: '=ngModel',
			parentmodel: '=ngParentModel',
			datasource: '=?rbDataSource',
			row: "=?rbDataSourceRow",
			column: "=?rbDataSourceColumn",
			property: "=rbDesignerProperty",
			type: "=rbObjectType"
		},
		link: function(scope, element, attrs, ctrl)
		{

			scope.designer = RedButtonDesignerService;

			scope.model_items = null;

			scope.$watch("model", function (newVal, oldVal) {
				if (newVal) {

					if(scope.property.collection){
						scope.model_items = scope.model[scope.property.collection];
					}else{
						scope.model_items = scope.model;
					}

					scope.properties = [];
					scope.editor = {};
					if(scope.designer.STRUCTURE.hasOwnProperty(scope.type)) {
						scope.properties =  scope.designer.STRUCTURE[scope.type].editor.properties;
						scope.editor = scope.designer.STRUCTURE[scope.type].editor;

						if(!_.isUndefined(scope.editor.onLink)){
							scope.editor.onLink({scope: scope});
						}
					}
				}
			});

			scope.createItem = function(___event)
			{
				if(scope.property.collection) {
					if (scope.model) {
						scope.model.add();
					}
				}else{
					if (scope.parentmodel) {
						scope.parentmodel.add();
					}
				}
			};

			scope.releaseItem = function(___event, ___item)
			{
				var ___ch = false;
				if(scope.property.collection) {
					if (scope.model) {
						scope.model.release(___item);
						scope.model_items = scope.model[scope.property.collection];
						___ch = true;
					}
				}else{
					if (scope.parentmodel) {
						scope.parentmodel.release(___item);
						scope.model_items = scope.model;
						___ch = true;
					}
				}

			};

		}
	}
}
$$$RedButtonDesignerObjectsCollectionEditorDirective.$inject = ["$parse", "rbCore", "RedButtonDesignerService"];