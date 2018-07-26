/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

"use strict";
angular.module('rb.designer')
	.directive('rbDesignerDataSources', $$$RedButtonDesignerDataSourcesDirective);

function $$$RedButtonDesignerDataSourcesDirective(  )
{
	return {
		restrict: "E",
		require: 'ngModel',
		template: '<div ' +
						'id="{{model.id}}" ' +
						'class="rb-designer-block" ' +
						'snacks-floating=".rb-designer-block-ds-header" ' +
						'snacks-auto-position ' +
						'snacks-click-top ' +
						'snacks-click-top-handler="onClickTop" ' +
						'snacks-on-drag-complete="onDragComplete" ' +
						'snacks-on-dragged="onDragged" ' +
						'ng-style="model.builder_info.style">' +
                            '<div class="rb-designer-block-ds-header" layout="row" ng-style="designer.STRUCTURE.datasource.style.header"> ' +

                                    '<div class="rb-designer-block-ds-header" >' +
										'<span class="rb-designer-block-ds-header rb-designer-font-accent">{{model.id}}</span> - ' +
										'<span flex class="rb-designer-block-ds-header rb-designer-font">{{model.database}}({{model.database_engine}}).{{model.table}}</span> ' +
									'</div>' +
                                    '<div flex class="rb-designer-block-ds-header" ></div>' +
                                    '<ng-md-icon class="rb-designer-block-icon rb-designer-block-header-icon" ' +
											'ng-style="designer.STRUCTURE.datasource.style.header" ' +
											'size="20" ' +
											'icon="{{designer.ICONS.EDITOR.EDIT}}" ' +
											'aria-label="Properties" ' +
											'ng-click="showPropertiesEditorDialog({event:$event, model:model, datasource:model})">' +
										'<md-tooltip>Edit properties</md-tooltip>' +
									'</ng-md-icon>' +
                                    '<ng-md-icon class="rb-designer-block-icon rb-designer-block-header-icon" ' +
											'ng-style="designer.STRUCTURE.datasource.style.header" ' +
											'size="20" ' +
											'icon="{{expanded_icon}}" ' +
											'ng-click="changeExpanded()">' +
										'<md-tooltip ng-show="expand_icon_tooltip">{{expand_icon_tooltip}}</md-tooltip>' +
									'</ng-md-icon>' +
                                    '<div flex class="rb-designer-block-ds-header" ></div>' +
                                    '<ng-md-icon class="rb-designer-block-icon rb-designer-block-header-icon" ' +
											'ng-style="designer.STRUCTURE.datasource.style.header" ' +
											'size="20" ' +
											'icon="{{designer.ICONS.PANEL.EXCLUDE_TABLE}}" ' +
											'aria-label="Exclude" ' +
											'ng-click="excludeDataSource()">' +
										'<md-tooltip>Exclude from model</md-tooltip>' +
									'</ng-md-icon>' +

                            '</div>' +
                            '<div ng-show="expanded">' +
                                '<div  class="rb-table">' +
                                    '<div class="rb-table-header">' +
                                        '<div class="rb-table-cell" ' +
		'                                   ng-repeat="header_column in designer.STRUCTURE.column.columns  track by $index" >{{header_column.title}}' +
		'                               </div>' +
                                        '<div class="rb-table-cell">*</div>' +
                                    '</div>' +
                                    '<div ' +
                                        'class="rb-table-row rb-table-selectable-row rb-designer-datasource-column" ' +
                                        'ng-repeat="model_column in model.columns  track by $index" ' +
                                        'id="{{model_column.identifier}}" ' +
				                        'snacks-drag-and-drop=".rb-designer-panel" ' +
					                    'snacks-drag-and-drop-target="[row-identifier]" ' +
					                    'snacks-drag-and-drop-on-complete="onTableColumnDragged(event, data)" ' +
					                    'snacks-drag-and-drop-data="model_column.identifier" ' +
					                    'snacks-drag-and-drop-title="model_column[designer.STRUCTURE.column.title_column]" ' +
                                        'row-identifier="{{model_column.identifier}}" ' +
                                        'ng-model="model_column"> ' +
                        					'<div class="rb-table-cell" ' +
					                        'ng-repeat="str_column in designer.STRUCTURE.column.columns  track by $index" ' +
					                        'snacks-drag-and-drop-data="{{model_column.identifier}}" ' +
					                        'row-identifier="{{model_column.identifier}}">{{model_column[str_column.name]}}</div> ' +
					                        '<ng-md-icon class="rb-designer-block-icon rb-designer-block-action-icon rb-table-cell" size="20" icon="{{designer.ICONS.EDITOR.EDIT}}" ng-click="showPropertiesEditorDialog( { event:$event, model:model_column, column:model_column, datasource:model } )"><md-tooltip>Edit properties</md-tooltip></ng-md-icon> ' +
                                     '</div> ' +
                                '</div>' +
                            '</div>' +
                        '</div>',
		replace: true,
		scope:{
			model: '=ngModel'
		},
		controller: "rbDesignerMetaComponentController"

	}
}
$$$RedButtonDesignerDataSourcesDirective.$inject = [ ];