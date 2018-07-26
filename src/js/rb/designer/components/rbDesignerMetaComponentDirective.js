/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

"use strict";

angular.module('rb.designer')
	.directive('rbDesignerMetaComponent', $$$RedButtonDesignerMetaComponentDirective)
	.directive('rbDesignerMetaComponentItemRenderer', $$$RedButtonDesignerMetaComponentItemRendererDirective);

function $$$RedButtonDesignerMetaComponentItemRendererDirective() {
	return {
		restrict: "E",
		require: 'ngModel',
		template: "<div>{{renderedValue}}</div>",
		replace: true,
		//controller: "rbDesignerMetaComponentController",
		scope:{
			model: "=ngModel",
			renderer: '=rbMetaComponentRenderer'
		},
		link: function( scope ) {

			scope.renderedValue = '';

			let itemRenderer = function( itemData ) {
				if( Array.isArray( itemData )){
					return _.reduce( itemData, function ( memo, item ) {
						return memo + _.map( scope.renderer.displayProperties, function ( dProp ) {
							return item[ dProp ]
						}).join( scope.renderer.separator )
						//return memo + item.toString();
					}, '');
				}else if( itemData instanceof Object ){
					return itemData.toString();
				}
				return itemData;
			};

			scope.$watch('model', function (newVal, oldVal) {
				scope.renderedValue = itemRenderer( newVal );
			});
		}
	}
}

$$$RedButtonDesignerMetaComponentItemRendererDirective.$inject = [];

function $$$RedButtonDesignerMetaComponentDirective(rbCore, RedButtonDesignerService)
{
	return {
		restrict: "E",
		require: 'ngModel',
		template: "<div " +
						'class="rb-designer-table rb-designer-block"  ' +
						'snacks-floating=".rb-designer-block-header" ' +
						'snacks-floating-storage-info="{{structure.rbClass}}" ' +
						'snacks-floating-storage-info-position="{{structure.position}}" ' +
						'snacks-on-drag-complete="onDragComplete" ' +
						'snacks-auto-position ' +
						'snacks-click-top ' +
						'snacks-click-top-handler="onClickTop">' +
                            '<div class="rb-designer-block-header" layout="row" ng-style="structure.style.header" > ' +
                                '<div flex class="rb-table-cell rb-designer-block-header" >{{structure.title}}</div> ' +
                                '<div class="rb-table-cell rb-designer-block-icon rb-designer-block-header-icon" > ' +
									'<ng-md-icon ' +
											'size="20" icon="{{expanded_icon}}" ' +
											'ng-style="structure.style.header" ' +
											'ng-click="changeExpanded()"> ' +
										'<md-tooltip ng-show="expand_icon_tooltip"> {{expand_icon_tooltip}} </md-tooltip>' +
									'</ng-md-icon>' +
								'</div>' +
                            '</div>' +
                            '<div class="rb-designer-table-row"><div class="rb-designer-table-cell" ng-show="expanded">' +
                                '<div class="rb-table">' +
                                    '<div class="rb-table-header">' +
                                        '<div class="rb-table-cell" ng-repeat="header_column in structure.columns  track by $index" >{{header_column.title}}</div>' +
                                        '<ng-md-icon ng-repeat="action in structure.actions | filter:actions_level_header track by $index" ' +
                                            'class="rb-designer-block-icon rb-designer-block-action-icon rb-table-cell" ' +
                                            'size="20" icon="{{action.icon}}" ' +
                                            'ng-click="do_action( action.metod, $event, model )" >' +
                                            '<md-tooltip ng-show="action.tooltip"> {{action.tooltip}} </md-tooltip>' +
                                        '</ng-md-icon>' +
                                    '</div>' +
                                    '<div class="rb-table-row rb-table-selectable-row" ng-class="mdl.selected_style" ng-repeat="mdl in model  track by $index">' +
                                        '<div class="rb-table-cell" ng-class="mdl.selected_style" ' +
											'ng-repeat="column in structure.columns  track by $index" >' +
												'<div ng-if="column.renderer">' +
													'<rb-designer-meta-component-item-renderer ng-model="mdl[column.name]" rb-meta-component-renderer="column.renderer">' +
													'</rb-designer-meta-component-item-renderer> ' +
												'</div>' +
												'<div ng-if="!column.renderer">' +
													'{{mdl[column.name]}}' +
												'</div>' +
												//'{{mdl[column.name]}}' +
											'</div>' +

                                        '<ng-md-icon ' +
                                            'ng-repeat="action in structure.actions | filter:actions_level_row track by $index" ' +
                                            'class="rb-designer-block-icon rb-designer-block-action-icon rb-table-cell" ' +
                                            'size="20" icon="{{action.icon}}" ' +
                                            'ng-click="do_action( action.metod, $event, mdl )">' +
                                            '<md-tooltip ng-show="action.tooltip"> {{action.tooltip}} </md-tooltip>' +
                                        '</ng-md-icon>' +
                                    '</div>' +
                                '</div>' +
                            '</div></div>' +
                        '</div>',
		replace: true,
		controller: "rbDesignerMetaComponentController",
		scope:{
			model: "=ngModel",
			structure: "=rbDesignerStructure",
			selectedModel: "=rbSelectedModel"
		},
		link: function( scope ) {

			// '<rb-designer-meta-component-item-renderer ng-model="mdl[column.name]">' +
			// '</rb-designer-meta-component-item-renderer> ' +

			scope.designer = RedButtonDesignerService;

			scope.actions_level_row = { level: "row" };
			scope.actions_level_header = { level: "header" };

			scope.$watch("selectedModel", function (newVal ) {
				if( newVal ){
					_.each(scope.model, function ( ___model ) {
						if ( _.isUndefined( ___model.selected ) ) {
							___model.selected = false;
						}

						if( ___model["id"] === scope.selectedModel["id"] ){
							___model.selected = true;
							___model.selected_style = "rb-designer-selected-table-cell";
						}else{
							___model.selected = false;
							___model.selected_style = null;
						}

					});
				}
			});

			scope.do_action = function ( action_metod, event, mdl) {
				if( action_metod )
				{
					action_metod( scope, event, mdl );
				}
			};

		}
	};
}

$$$RedButtonDesignerMetaComponentDirective.$inject = ['rbCore', 'RedButtonDesignerService'];