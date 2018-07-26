/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */
"use strict";

import $RbModelBuilderModel from '../rbModelBuilderModel';

angular.module('rb.designer')
	.controller('rbDesignerMetaComponentController', $$$RedButtonDesignerMetaComponentController);

function $$$RedButtonDesignerMetaComponentController($rootScope, scope, element, attrs, $localStorage, $mdDialog, RedButtonDesignerService)
{
	scope.designer = RedButtonDesignerService;

	scope.expanded = true;

	attrs.$observe('snacksFloatingStorageInfo', function(value){
		if( value ){
			let storageInfo = Object.assign(
				{ expanded: scope.expanded },
				$localStorage[ value ]
			);
			scope.expanded = storageInfo.expanded;
		}
	});

	scope.expanded_icon = scope.designer.ICONS.PANEL.COLLAPSED;
	scope.expand_icon_tooltip = "Show/Hide panel";

	scope.properties = [];
	scope.editor = null;

	scope.property_edit = false;
	scope.property_editor_visible = false;
	scope.property_edit_tooltip = "Edit property";
	scope.property_edit_icon = scope.designer.ICONS.EDITOR.EDIT;

	scope.property_create_clear_tooltip = "Create property";
	scope.property_create_clear_icon = scope.designer.ICONS.EDITOR.CREATE;

	// scope.property_label_style = {};

	scope.propertyDescription = '';

	let __draggedEventCounter = 0;

	scope.getPropertyLabelStyle = function( model, property ){

		if( model && property ) {
			if ( typeof model[property.name] === "object" && model[property.name]) {
				return {'font-weight': 'bold'};
			} else {
				return {'font-weight': 'normal'};
			}
		}else{
			return null;
		}
	};

	scope.getPropertyLabelClass = function( model, property ){

		if( model && property ) {
			if ( typeof model[property.name] === "object" && model[property.name]) {
				return 'rb-designer-font-bold';
			} else {
				return 'rb-designer-font-normal';
			}
		}else{
			return null;
		}
	};


	scope.setModelPropertyDescription = function () {
			if(scope.model) {
				if(scope.model.getDescription) {
					scope.propertyDescription = scope.model.getDescription();
				}
			}
		};

	if(scope.model) {
		scope.model["element_id"] = element[0].id;
		scope.setModelPropertyDescription();
		if( scope.model.builder_info ) {
			scope.expanded = scope.model.builder_info.expanded;
		}
	}

	scope.changePropertyEditorState = function (info) {
		scope.setModelPropertyDescription();
		if(scope.onRbPropertyChange) {
			scope.onRbPropertyChange({info: info});
		}
	};

	scope.saveModel = function () {
		scope.designer.saveModel();
	};

	scope.arrangeElements = function ( index, layout ) {
		scope.designer.arrangeElements( layout );
	};

	scope.onDragged = function ()
	{
		__draggedEventCounter++;
		// if(__draggedEventCounter % 5 == 0) {
		// 	scope.designer.redrawRelations(scope);
		// }
		scope.designer.redrawRelations(scope);
	};

	scope.onDragComplete = function ()
	{

		if(typeof scope.model !== "undefined") {
			if (typeof scope.model.builder_info !== "undefined") {
				scope.model.builder_info.x = element[0].offsetLeft;
				scope.model.builder_info.y = element[0].offsetTop;
			}
		}

		scope.designer.redrawRelations( scope );
		scope.designer.model.setStatus( $RbModelBuilderModel.prototype.STATUS.EDITED );

	};

	scope.onClickTop = function ( __event ){
		scope.designer.onClickTopHandler( __event, scope.model );
	};

	scope.onDatabasesSelect = function ( __database )
	{
		scope.designer.loadTables( __database );
	};

	scope.onTableSelect = function (event, data)
	{
		data.x = event.offsetX;
		data.y = event.offsetY;
		scope.designer.includeTableToModel(data);
	};

	scope.changeExpanded = function ()
	{
		scope.expanded = !scope.expanded;
		if(scope.expanded){
			scope.expanded_icon = scope.designer.ICONS.PANEL.COLLAPSED;
		}else{
			scope.expanded_icon = scope.designer.ICONS.PANEL.EXPANDED;
		}

		if( scope["model"] ) {
			if( _.isUndefined( scope.model.builder_info ) ){
				scope.model["builder_info"] =
					{
						expanded: scope.expanded
					};
			}else {
				scope.model.builder_info.expanded = scope.expanded;
			}
			scope.designer.redrawRelations(scope);
		}

		if(attrs.snacksFloatingStorageInfo){

			$localStorage[ attrs.snacksFloatingStorageInfo] = Object.assign(
				{},
				$localStorage[ attrs.snacksFloatingStorageInfo ],
				{ expanded: scope.expanded }
			);

		}

	};

	scope.changePropertyEditorMode = function ()
	{
		scope.property_edit = !scope.property_edit;
		if(scope.property_edit){
			scope.property_edit_icon = scope.designer.ICONS.EDITOR.OK;
			scope.property_edit_tooltip = "Close property editor";
		}else{
			scope.property_edit_icon = scope.designer.ICONS.EDITOR.EDIT;
			scope.property_edit_tooltip = "Edit property";
		}

		scope.changePropertyEditorState({
			event: 'OPEN_CLOSE_EDITOR',
			value: scope.property_edit
		});

		scope.property_editor_visible = scope.property_edit && scope.model != null;

	};

	scope.createClearPropertyValue = function ()
	{
		if(scope.propertyTester()){
			scope.model = null;
		}else{
			if(scope.property && scope.property.producer) {
				scope.property.producer({scope: scope});
			}else{
				console.log("Producer not defined");
			}
		}

		scope.initPropertyEditor();

		scope.changePropertyEditorState({
			event: 'CREATE_CLEAR_PROPERTY',
			value: scope.model
		});

	};

	scope.propertyTester = function ()
	{
		return scope.model !== null;
	};

	scope.$watch("model", function ( newVal )
	{
		scope.property_editor_visible = scope.property_edit && newVal;

		if ( newVal )
		{

			scope.model["element_id"] = element[0].id;

			if( newVal.hasOwnProperty("type") && scope.designer.STRUCTURE.hasOwnProperty( newVal.type ) )
			{
				scope.properties =  scope.designer.STRUCTURE[newVal.type].editor.properties;
				scope.editor = scope.designer.STRUCTURE[newVal.type].editor;

				if(!_.isUndefined(scope.editor.onLink)){
					scope.editor.onLink({scope: scope});
				}

			}
		}

		scope.changePropertyEditorState({
			event: 'MODEL_CHANGED',
			value: newVal
		});

	});

	//onPropertyChange

	scope.initPropertyEditor = function ()
	{
		if( scope.propertyTester() ){
			scope.property_create_clear_tooltip = "Clear property";
			scope.property_create_clear_icon = scope.designer.ICONS.EDITOR.CLEAR;
		}else{
			scope.property_create_clear_tooltip = "Create property";
			scope.property_create_clear_icon = scope.designer.ICONS.EDITOR.CREATE;
		}
	};

	scope.onModelSelect = function ( __model )
	{
		scope.designer.loadModel( __model );
	};

	scope.excludeDataSource = function ()
	{
		if(scope["model"]) {
			scope.designer.excludeTableFromModel(scope.model);
		}
	};

	scope.onTableColumnDragged = function(event, data)
	{
		scope.designer.createRelation(data, scope);
	};

	scope.showEditorDialog = function (__options, __template, __controller)
	{

		let __locals =
			{
				model: __options.hasOwnProperty("model") ? __options.model : null,
				parentmodel: __options.hasOwnProperty("parentmodel") ? __options.parentmodel : null,
				row: __options.hasOwnProperty("row") ? __options.row : null,
				datasource: __options.hasOwnProperty("datasource") ? __options.datasource : null,
				column: __options.hasOwnProperty("column") ? __options.column : null,
				designer: scope.designer
			};

		let __event = __options.hasOwnProperty("event") ? __options.event : null;

		scope._model = Object.assign({}, scope.model)

		$mdDialog.show(
			{
				controller: __controller,
				template: __template,
				parent: angular.element( document.body ),
				targetEvent: __event,
				locals: __locals,
				bindToController: true
			}
		).then(function(answer) {
				let needRedrawRelations = scope.designer.model.onModelObjectPropertyChange(
					{
						model: scope.model ? scope.model : null,
						_model: scope._model ? scope._model: null ,
						parentmodel: scope.parentmodel ? scope.parentmodel : null,
						datasource: scope.datasource ? scope.datasource : null,
						row: scope.row ? scope.row : null,
						column: scope.column ? scope.column : null,
						property: scope.property ? scope.property : null
					}
				)
			if (needRedrawRelations){
				scope.designer.redrawRelations(scope)
			}
		}, function() {
		});
	};

	scope.showLayoutEditorDialog = function (__options)
	{
		let __template = '<md-dialog class="rb-designer-block">\
                                        <md-toolbar class="rb-designer-property-editor-header"><span>{{title}}</span></md-toolbar>\
                                        <md-dialog-content>\
                                            <rb-designer-form-layout-editor ng-model="model"></rb-designer-form-layout-editor>\
                                        </md-dialog-content>\
                                        <md-dialog-actions >\
                                            <span flex></span>\
                                            <md-button class="md-raised md-primary" ng-click="hide()" aria-label="OK"> <ng-md-icon icon="done" size="40"  ></ng-md-icon>OK</md-button>\
                                            <md-button class="md-raised" ng-click="cancel()" aria-label="Cancel"><ng-md-icon icon="close" size="40" ></ng-md-icon>Cancel</md-button>\
                                        </md-dialog-actions>\
                                    </md-dialog>';
		scope.showEditorDialog( __options, __template, "rbDesignerPropertiesEditorController" );
	};

	scope.showPropertiesEditorDialog = function(__options)
	{
		let __template = '<md-dialog class="rb-designer-block">\
                                        <md-toolbar class="rb-designer-property-editor-header"><span>{{title}}</span></md-toolbar>\
                                        <md-dialog-content>\
                                            <rb-designer-properties-list-editor ng-model="model" rb-data-source="datasource" rb-data-source-column="column" ></rb-designer-properties-list-editor>\
                                        </md-dialog-content>\
                                        <md-dialog-actions >\
                                            <span flex></span>\
                                            <md-button class="md-raised md-primary" ng-click="hide()" aria-label="OK"> <ng-md-icon icon="done" size="40"  ></ng-md-icon>OK</md-button>\
                                            <md-button class="md-raised" ng-click="cancel()" aria-label="Cancel"><ng-md-icon icon="close" size="40" ></ng-md-icon>Cancel</md-button>\
                                        </md-dialog-actions>\
                                    </md-dialog>';
		scope.showEditorDialog( __options, __template, "rbDesignerPropertiesEditorController" );
	};

	scope.designer = RedButtonDesignerService;
}
$$$RedButtonDesignerMetaComponentController.$inject = ["$rootScope", "$scope", "$element", "$attrs", "$localStorage", "$mdDialog", "RedButtonDesignerService"];