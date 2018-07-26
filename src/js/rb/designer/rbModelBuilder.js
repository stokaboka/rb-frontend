/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

"use strict";

import $RbDataSource from '../core/rbDataSource';
import $RbColumnFilter from '../core/rbColumnFilter';
import $RbColumnOrder from "../core/rbColumnOrder";

import $RbRowOrder from '../core/rbRowOrder';

import $RbRowFilter from '../core/rbRowFilter';

import $RbDataMap from '../core/rbDataMap';
import $RbFormLayout from '../core/rbFormLayout';
import $RbRowValidatorProcessor from '../core/rbRowValidatorProcessor';



import $RbModelBuilderDatabase from './rbModelBuilderDatabase';
import $RbModelBuilderModel from './rbModelBuilderModel';
import { $RbSequence } from '../core/rbSequence';
import $RbModelBuilderView from './rbModelBuilderView';
import $RbRowValidator from '../core/rbRowValidator';

import { $RbElementsPositionManager } from '../core/components/utils/rbElementsPositionManager';

import $RbDisplayGadget from '../ui/rbDisplayGadget';
import $RbList from '../ui/rbList';
import $RbComboBox from '../ui/rbComboBox';
import {$RbListValues} from '../ui/rbListValues';

let $RbModelBuilder = function ( __options )
{
    const self = this;
    // if(typeof __options === 'undefined'){
    //     __options = {};
    // }

	Object.assign(
		self,
		{

			$document: null,
			$rootScope: null,
			$http: null,
			$q: null,
			$cookies: null,
			$localStorage: null,
			$sessionStorage: null,
			$mdDialog: null,
			$location: null,
			$timeout: null,
			$log: null,

			status: {
				message: '',
				error: '',
				state: ''
			},

			redraw_timeout_ms: 200,

			//options: __options,
			url: 'api',

			network: {
				status : true,
				message: ''
			},

			api_metod: "model.json",

			databases: [],
			database: null,

			models: [],
			model: null,

			/**
			 * selected relation
			 * @type {null}
			 */
			relation: null,

			visible: {
				relations: true,
				relationMenu: false
			},

			debug: ''

		},
		__options
	);

    self.init();
    return self;
};

$RbModelBuilder.prototype.init = function()
{
    const self = this;

    self.alignmentLayouts = $RbElementsPositionManager.prototype.LAYOUTS;

	self.dataTypes =
	[
		{type: "NUMBER", label: "Number", icon: null, control: "number"},
		{type: "INT", label: "Integer", icon: null, control: "number"},
		{type: "STRING", label: "String", icon: null, control: "input"},
		{type: "TEXT", label: "Text", icon: null, control: "text"},
		{type: "BOOLEAN", label: "Boolean", icon: null, control: "checkbox"},
		{type: "JSON", label: "JSON", icon: null, control: "text"},
		{type: "DATE", label: "Date", icon: null, control: "date"}
	];

	self.formLayouts = $RbFormLayout.prototype.FORM_LAYOUTS;

	self.lovTypes =
		[
			{type: "listvalues", label: "List Of Values Dialog", icon: null},
			{type: "combobox", label: "Combo Box", icon: null},
			{type: "list", label: "List", icon: null}
		];

	self.gadgetTypes =
		[
			{type: "PROGRESS_LINEAR", label: "Linear Progress", icon: null},
			{type: "ICON_COLOR", label: "Color Icon", icon: null}
		];

	self.filterProperties =
		[
			{type: "value", label: "Exact Value", icon: null},
			{type: "value1", label: "Min Value", icon: null},
			{type: "value2", label: "Max Value", icon: null},
			{type: "mask", label: "Mask", icon: null}
		];

	self.orderList =
		[
			{type: $RbColumnOrder.prototype.ORDERS.ASC, label: $RbColumnOrder.prototype.LABELS.ASC, icon: $RbColumnOrder.prototype.ICONS.ASC},
			{type: $RbColumnOrder.prototype.ORDERS.DESC, label: $RbColumnOrder.prototype.LABELS.DESC, icon: $RbColumnOrder.prototype.ICONS.DESC},
			{type: $RbColumnOrder.prototype.ORDERS.NONE, label: $RbColumnOrder.prototype.LABELS.NONE, icon: $RbColumnOrder.prototype.ICONS.NONE}
		];

	self.rowValidatorMetodsArray =
		[
			{type: $RbRowValidator.prototype.VALIDATORS.COMPARE, label: "Compare columns value", icon: null},
			{type: $RbRowValidator.prototype.VALIDATORS.REQUIRED, label: "Required value", icon: null},
			{type: $RbRowValidator.prototype.VALIDATORS.IN_LIST, label: "List values comma separated", icon: null},
			{type: $RbRowValidator.prototype.VALIDATORS.NONE, label: "None", icon: null}
		];

	self.rowValidatorOperatorsArray =
		[
			{type: "<", label: "<", icon: null},
			{type: "<=", label: "<=", icon: null},
			{type: "==", label: "==", icon: null},
			{type: "===", label: "===", icon: null},
			{type: ">=", label: ">=", icon: null},
			{type: ">", label: ">", icon: null},
			{type: "!=", label: "!=", icon: null}
		];

	self.ICONS =
		{
			SIZE: 20,
			TOOLBAR: {},
			PANEL: {
				OPEN_MODEL: "file_download",
				INCLUDE_TABLE: "add_box",
				EXCLUDE_TABLE: "clear",
				EXPANDED: "tab",
				COLLAPSED: "tab_unselected"
			},
			EDITOR: {
				EDIT: "edit",
				DELETE: "delete",
				DOWNLOAD: "file_download",
				OK: "check_circle",
				CANCEL: "cancel",
				CLEAR: "remove_circle_outline",
				CREATE: "add_circle_outline",
				VIEW: "visibility"
			}
		};

	self.COLLECTIONS =
		{
			designerFormsCollection:
				{
					// source: объект в текущем scope - массив объектов для сосздания коллекции
					source: "designer.model.forms",
					// watch: наблюдение за изменяемой коллекцией
					watch: "designer.model.forms",
					// value: имя свойства объекта коллекции, значение которого присваивается объекту для источник значений выступает коллекция
					value: "id",
					// label: имя свойства объекта коллекции, значение которого отображается в визуальном элементе
					label: "title"
				},

			designerLOVtypesCollection:
				{
					source: "designer.lovTypes",
					watch: "designer.lovTypes",
					value: "type",
					label: "label"
				},

			designerDatabasesCollection:
				{
					source: "designer.databases",
					watch: "designer.databases",
					value: "name",
					label: "name"
				},

			modelDatabaseObjectSequencesCollection:
				{
					source: "model.database_object.sequences",
					watch:  "model.database_object",
					value: "sequence_id",
					label: "sequence_id"
				},

			parentModelDatabaseObjectSequencesCollection:
				{
					source: "parentmodel.database_object.sequences",
					watch: "parentmodel.database_object",
					value: "sequence_id",
					label: "sequence_id"
				},

			designerDataTypesCollection:
				{
					source: "designer.dataTypes",
					watch: "designer.dataTypes",
					value: "type",
					label: "label"
				},

			designerGadgetTypesCollection:
				{
					source: "designer.gadgetTypes",
					watch: "designer.gadgetTypes",
					value: "type",
					label: "label"
				},

			designerOrderCollection:
				{
					source: "designer.orderList",
					watch: "designer.orderList",
					value: "type",
					label: "label"
				},

			designerDatasourceCollection:
				{
					source: "designer.model.datasources",
					watch: "designer.model.datasources",
					value: "id",
					label: "id"
				},

			sourceColumnsCollection:
				{
					source: "column.link_datasource.columns",
					watch: "column.link_datasource",
					value: "id",
					label: "title"
				},

			columnsCollection:
				{
					source: "datasource.columns",
					watch: "datasource",
					value: "id",
					label: "title"
				},

			filterPropertiesCollection:
				{
					source: "designer.filterProperties",
					watch: null,
					value: "type",
					label: "label"
				},

			rowValidatorMetodsCollection:
				{
					source: "designer.rowValidatorMetodsArray",
					watch: null,
					value: "type",
					label: "label"
				},

			rowValidatorOperatorsCollection:
				{
					source: "designer.rowValidatorOperatorsArray",
					watch: null,
					value: "type",
					label: "label"
				},

			designerFormLayoutsCollection:
				{
					source: "designer.formLayouts",
					watch: null,
					value: "type",
					label: "label"
				}
		};

	self.PRODUCERS =
		{
			$RbListValues: function (__options)
			{
				__options.scope.model = new $RbListValues(
					{
						id: "listvalues_" + (__options.scope.designer.model.listvalues.length + 1)
					}
				);
			},

			$RbDataMap: function (__options)
			{
				__options.scope.model = new $RbDataMap({});
			},

			$RbDisplayGadget: function (__options)
			{
				__options.scope.model = new $RbDisplayGadget(
					{
						id: "gadget_" + (__options.scope.designer.model.gadgets.length + 1),
						type: "PROGRESS_LINEAR"
					}
				);
			},

			$RbSequence: function (__options)
			{
				if(__options.scope.column) {
					__options.scope.model = new $RbSequence(
						{target: __options.scope.column.db_name}
					);
				}
			},

			$RbComboBox: function (__options)
			{
				__options.scope.model = new $RbComboBox(
					{
						id: "combobox_" + (__options.scope.designer.model.comboboxes.length + 1)
					}
				);
			},

			$RbList: function (__options)
			{
				__options.scope.model = new $RbList(
					{
						id: "list_" + (__options.scope.designer.model.lists.length + 1)
					}
				);
			},

			$RbColumnFilter: function (__options)
			{
				__options.scope.model = new $RbColumnFilter();
			},

			$RbColumnOrder: function (__options)
			{
				let ___column_order_index = 1, __db_name = '', __db_type = '';

				if(__options.scope.column)
				{
					__db_name = __options.scope.column.db_name;
					__db_type = __options.scope.column.db_type;
				}

				if(__options.scope.datasource)
				{
					_.each(__options.scope.datasource.columns, function(column){
						if(column.default_order) ___column_order_index++;
						if(column.fixed_order) ___column_order_index++;
					});
				}

				__options.scope.model = new $RbColumnOrder(
					{
						id: "columnOrder_" + ___column_order_index,
						db_name: __db_name,
						db_type: __db_type,
						num: ___column_order_index + 1
					}
				);
			},

			// $RbArray: function (__options)
			// {
			// 	__options.scope.model = [];
			// },

			$RbRowOrder: function (__options)
			{
				__options.scope.model = new $RbRowOrder({});
			},

			$RbRowFilter: function (__options) {
				__options.scope.model = new $RbRowFilter({});
			},

			$RbRowValidatorProcessor: function (__options) {
				__options.scope.model = new $RbRowValidatorProcessor(__options.scope.datasource);
			},

			$RbRowValidator: function (__options) {
				__options.scope.model = new $RbRowValidator({});
			}
		};

	self.STRUCTURE =
		{
			application:
				{
					title: "Application",
					title_column: "title",
					style:
						{
							header: {
								"background-color": "#ff9800",
								"color": "#FFFFFF",
								"fill": "#FFFFFF"
							}
						},
					columns:
						[
							{name: "id", title: "ID"},
							{name: "title", title: "Title"},
							{name: "description", title: "Description"},
							{name: "enabled", title: "Enabled"},
							{name: "order", title: "Order"},
							{name: "forms", title: "Forms",
								renderer: {
									displayProperties: [ 'id', 'title' ],
									separator: ': '
								}
							}
						],
					editor: {
						properties: [
							{ name:'id', label: "ID", type: "string", control: "input" },
							{ name:'title', label: "Title",  type: "string", control: "input" },
							{ name:'description', label: "Description",  type: "string", control: "input" },
							{ name:'enabled', label: "Enabled",  type: "boolean", control: "checkbox" },
							{ name:'order', label: "Order",  type: "number", control: "input" },
							/**
							 * использование rbObjectsCollection:
							 * 1. collection: null
							 * 2. type: "forms" - ссылка на элемент в "STRUCTURE" описывающий структуру объекта коллекции
							 *    структура объекта определена в типе STRUCTURE.forms  и задана ниже: type: "forms"
							 * 3. это поле - массив, заполняется значениями с помощью контрола rbObjectsCollection
 							 */
							{ name:'forms', label: "Forms",  type: "forms", control: "rbObjectsCollection", collection: null }
						]
					},
					rbClass: "RedButtonDesignerApplication",
					position: { x: 260, y: 3},
					actions:
						[
							{
								label: "Create",
								icon: "add_box",
								metod: function (scope, event, options) {
									//console.log("Create an application");
									//console.log(options);
									scope.designer.createApplication();
								},
								tooltip: "Create an Application",
								level: "header"
							},
							{
								label: "Edit",
								icon: "mode_edit",
								metod: function (scope, event, options) {
									//console.log("Edit an application ");
									//console.log(options);
									scope.showPropertiesEditorDialog( { event:event, model:options } )
								},
								tooltip: "Edit an Application",
								level: "row"
							},
							{
								label: "Delete",
								icon: "remove_circle_outline",
								metod: function (scope, event, options) {
									//console.log("Delete an application");
									//console.log(options);
									scope.designer.removeApplication( options );
								},
								tooltip: "Delete the Application",
								level: "row"
							}
						]
				},
			/**
			 * тип описывающий объект коллекции
			 * в данном случае используется для описание объекта коллекции поля STRUCTURE.application.forms
			 * это описание типа используется для редактирования объекта, но не для создания
			 * создаваемый объект должен иметь заданную здесь структуру
			 * это утверждение справедливо ко всем остальным элементам STRUCTURE
			 */
			forms:
				{
					style: {
						header: {
							"background-color": "blue",
							"color": "#FFFFFF",
							"fill": "#FFFFFF"
						}
					},
					title: "Forms",
					title_column: "",
					allow_delete: true,
					columns: [
						{name: "id", title: "Form ID" },
						{name: "enabled", title: "Enabled" },
						{name: "order", title: "Order" }
					],
					editor: {
						properties: [
							{name: "id", label: "Form name", type: "string",
								control: "rbPropertyValuesList",
								collection: self.COLLECTIONS.designerFormsCollection
							},
							{name: "enabled", label: "Enabled", type: "boolean", control: "checkbox"},
							{name: "order", label: "Order", type: "number", control: "input"}
						]
					}
				},
			form:
				{
					title: "Forms",
					title_column: "title",
					style:
						{
							header: {
								"background-color": "#ff9800",
								"color": "#FFFFFF",
								"fill": "#FFFFFF"
							}
						},
					columns:
						[
							{name: "id", title: "ID"},
							{name: "title", title: "Title"},
							{name: "description", title: "Description"},
							{name: "layout", title: "Layout"}
						],
					editor: {
						properties: [
							{ name:'id', label: "ID", type: "string", control: "input"},
							{ name:'title', label: "Title",  type: "input"},
							{ name:'description', label: "Description",  type: "string", control: "input"},
							{ name:'layout', label: "Layout",  type: "string",
								control: "rbPropertyValuesList",
								collection: self.COLLECTIONS.designerFormLayoutsCollection
							}
						]
					},
					rbClass: "RedButtonDesignerForms",
					position: { x: 720, y: 3},
					actions:
						[
							{
								label: "Create",
								icon: "add_box",
								metod: function (scope, event, options) {
									//console.log("Create a Form");
									//console.log(options);
									scope.designer.createForm();
								},
								tooltip: "Create a Form",
								level: "header"
							},
							{
								label: "Edit",
								icon: "mode_edit",
								metod: function (scope, event, options) {
									//console.log("Edit a form");
									//console.log(options);
									scope.showPropertiesEditorDialog( { event:event, model:options } )
								},
								tooltip: "Edit a form",
								level: "row"
							},
							{
								label: "Edit Layout",
								icon: "view_quilt",
								metod: function (scope, event, options) {
									//console.log("Edit Layout");
									//console.log(options);
									scope.showLayoutEditorDialog( { event:event, model:options } )
								},
								tooltip: "Edit Layout",
								level: "row"
							},
							{
								label: "Preview",
								icon: "visibility",
								metod: function (scope, event, options) {
									//console.log("Form Preview");
									//console.log(options);
								},
								tooltip: "Form Preview",
								level: "row"
							},
							{
								label: "Delete",
								icon: "remove_circle_outline",
								metod: function (scope, event, options) {
									//console.log("Form Delete");
									//console.log(options);
									scope.designer.removeForm( options );
								},
								tooltip: "Delete a Form",
								level: "row"
							}
						]
				},
			database:
				{
					title: "Databases",
					title_column: "name",
					rbClass: "RedButtonDesignerDatabases",
					position: { x: 3, y: 160},
					style: {
						header:
							{
							"background-color": "#444444",
							"color": "#FFFFFF",
							"fill": "#FFFFFF"
						}
					},
					columns:
						[
						{name: "name", title: " DB Name"},
						{name: "schema", title: "Scheme"},
						{name: "icon", title: "Icon"},
						{name: "vendor", title: "Vendor"}
					],
					actions:
						[
							{
								label: "Download Tables",
								icon: "file_download",
								metod: function (scope, event, options) {
									scope.designer.loadTables( options );
								},
								tooltip: "Download Tables",
								level: "row"
							},
							// {
							// 	label: "Add Tables",
							// 	icon: "add_box",
							// 	metod: function (scope, event, options) {
							// 		/**
							// 		 * TODO add all tables to model
							// 		 */
							// 		scope.designer.includeAllTablesToModel( options );
							// 	},
							// 	tooltip: "Add Tables to Model",
							// 	level: "row"
							// },
							{
								label: "Download References",
								icon: "share",
								metod: function (scope, event, options) {
									scope.designer.loadReferences( options );
								},
								tooltip: "Download References",
								level: "row"
							}
						]
				},
			models:
				{
					title: "Models",
					title_column: "id",
					rbClass: "RedButtonDesignerModels",
					position: { x: 3, y: 3},
					style: {
						header: {
							"background-color": "#2196f3",
							"color": "#FFFFFF",
							"fill": "#FFFFFF"
						}
					},
					columns: [
						{name: "id", title: "ID"},
						{name: "description", title: "Description"}
					],
					editor: {
						properties: [
							{ name:'id', label: "ID", type: "string", control: "input"},
							{ name:'description', label: "Description",  type: "string", control: "input"}
						]
					},
					actions:
						[
							{
								label: "Create",
								icon: "add_box",
								"metod": function (scope, event, options) {
									//console.log("Create Model");
									//console.log(options);
									scope.designer.createModel();
								},
								tooltip: "Create Model",
								level: "header"
							},
							{
								label: "Download Model",
								icon: "file_download",
								metod: function (scope, event, options) {
									//console.log('Download Model');
									//console.log(options);
									scope.designer.loadModel( options );
								},
								tooltip: "Download Model",
								level: "row"
							},
							{
								label: "Edit Model",
								icon: "mode_edit",
								metod: function (scope, event, options) {
									//console.log("Edit Model");
									//console.log(options);
									if( options.selected ) {
										scope.showPropertiesEditorDialog({event: event, model: options});
									}else{
										scope.designer.status.message = "Model not selected";
										////console.log("Model not selected");
									}
								},
								tooltip: "Edit Model",
								level: "row"
							}
							,
							{
								label: "Delete Model",
								icon: "remove_circle_outline",
								metod: function (scope, event, options) {
									//console.log("Delete Model");
									//console.log(options);
									if( options.selected ) {
										scope.designer.deleteModel( options );
									}else{
										scope.designer.status.message = "Model not selected";
										////console.log("Model not selected");
									}
								},
								tooltip: "Delete Model",
								level: "row"
							}
						]
				},
			/**
			 * Tables of database
			 */
			table:
				{
					title: "Tables / Collections",
					title_column: "table",
					rbClass: "RedButtonDesignerTables",
					position: { x: 3, y: 340},
					style: {
						header: {
							"background-color": "#444444",
							"color": "#FFFFFF",
							"fill": "#FFFFFF"
						}
					},
					columns: [
						{name: "table", title: " Name"},
						{name: "comments", title: "Comment"}
					],
					actions:
						[
							{
								label: "Add Table",
								icon: "add_box",
								metod: function (scope, event, options) {
									//console.log("Add Table to Model");
									//console.log(options);

									options.x = event.clientX;
									options.y = event.clientY;

									scope.designer.includeTableToModel( options );
								},
								tooltip: "Add Table to Model",
								level: "row"
							}
						],
					editor: {
						properties: [
							{ name:'id', label: "ID", type: "string", control: "input"},
							{ name:'title', label: "Title",  type: "string", control: "input"},
							{ name:'database', label: "Database",  type: "string", control: "input"},
							{ name:'database_engine', label: "Database Engine",  type: "string", control: "input"},
							{ name:'table', label: "Table",  type: "string", control: "input"},
							{ name:'update_table', label: "Update Table",  type: "string", control: "input"},
							{ name:'headers', label: "Headers",  type: "boolean", control: "checkbox"},
							{ name:'row_filter', label: "Filter", type: "$RbRowFilter", control: "RbPropertiesEditor", producer: self.PRODUCERS.$RbRowFilter},

							{ name:'insert_enabled', label: "Insert enabled",  type: "boolean", control: "checkbox"},
							{ name:'update_enabled', label: "Update enabled",  type: "boolean", control: "checkbox"},
							{ name:'delete_enabled', label: "Delete enabled",  type: "boolean", control: "checkbox"},
							{ name:'filter_enabled', label: "Filter enabled",  type: "boolean", control: "checkbox"},
							{ name:'order_enabled', label: "Order enabled",  type: "boolean", control: "checkbox"},
							{ name:'pager_enabled', label: "Pager enabled",  type: "boolean", control: "checkbox"},
							{ name:'report_enabled', label: "Report enabled",  type: "boolean", control: "checkbox"},
							{ name:'history_enabled', label: "History enabled",  type: "boolean", control: "checkbox"},

							{ name:'autoload', label: "Autoload",  type: "boolean", control: "checkbox"},
							{ name:'single_row', label: "Single Row",  type: "boolean", control: "checkbox"},
							{ name:'page_length', label: "Page Length",  type: "number", control: "input"},

							{ name:'validator_processor', label: "Validators",  type: "$RbRowValidator", control: "RbPropertiesEditor", producer: self.PRODUCERS.$RbRowValidatorProcessor},
							{ name:'hier_connection', label: "Hieracly Connection",  type: "$RbHierarchyConnection", control: "RbHierarchyConnection"}

						]
					}
				},

			/**
			 * список datasources.
			 */
			datasource: {
				title: "Data Sources",
				title_column: "name",
				rbClass: "RedButtonDesignerDatasources",
				position: { x: 300, y: 160},
				style: {
					header:
						{
							"background-color": "#91fac6",
							"color": "#666666",
							"fill": "#666666"
						}
				},
				columns:
					[
						{name: "id", title: "ID"},
						{name: "table", title: "Table"},
						{name: "title", title: "Title"},
						{name: "database", title: "Database"},
						{name: "database_engine", title: "Database Engine"}
					],
				actions:
					[
						/**
						 * TODO spotlight datasource window
						 */
						// {
						// 	label: "Show / Hide",
						// 	icon: self.ICONS.EDITOR.VIEW,
						// 	metod: function (scope, event, options) {
						// 		options.builder_info.display = !options.builder_info.display;
						// 	},
						// 	tooltip: "Show / Hide Data Sources",
						// 	level: "row"
						// }
					]
			},
			/**
			 * Столбцы источника данных (отображение таблицы в БД)
			 */
			column:
				{
					title: "Column / Object",
					title_column: "db_name",
					style: {
						header: {
							"background-color": "#444444",
							"color": "#FFFFFF",
							"fill": "#FFFFFF"
						}
					},
					id_column: "db_name",
					columns: [
						{name: "db_name", title: "Name"},
						{name: "title", title: "Title"},
						{name: "db_type", title: "Type"},
						{name: "data_length", title: "Length"},
						{name: "data_precision", title: "Precision"},
						{name: "data_scale", title: "Scale"},
						{name: "nullable", title: "Nullable"},
						{name: "comments", title: "Comment"}
					],
					editor: {
						properties: [
							{label:'Column Name', name: "db_name", type: "string", control: "input", disabled: true},
							{label:'Data Type', name: "db_type", type: "string", control: "input"},
							{label:'Title', name: "title", type: "string", control: "input"},
							{label:'Is Primary Key', name: "primary_key", type: "boolean", control: "checkbox"},
							{label:'Display Mask', name: "display_mask", type: "string", control: "input"},
							{label:'Filter Enabled', name: "filter_enabled", type: "boolean", control: "checkbox"},
							{label:'Order Enabled', name: "order_enabled", type: "boolean", control: "checkbox"},
							{label:'Editable', name: "editable", type: "boolean", control: "checkbox"},
							{label:'Query', name: "query", type: "boolean", control: "checkbox"},
							{label:'Update', name: "update", type: "boolean", control: "checkbox"},
							{label:'Visible', name: "visible", type: "boolean", control: "checkbox"},
							{label:'Printable', name: "printable", type: "boolean", control: "checkbox"},
							{label:'Default Value', name: "default", type: "string", control: "input"},

							{label:'Default Filter', name: "default_filter",
								type: "$RbColumnFilter",
								control: "RbPropertiesEditor",
								producer: self.PRODUCERS.$RbColumnFilter
							},
							{label:'Default Order', name: "default_order",
								type: "$RbColumnOrder",
								control: "RbPropertiesEditor",
								producer: self.PRODUCERS.$RbColumnOrder
							},

							{label:'Fixed Filter', name: "fixed_filter",
								type: "$RbColumnFilter",
								control: "RbPropertiesEditor",
								producer: self.PRODUCERS.$RbColumnFilter
							},
							{label:'Fixed Order', name: "fixed_order",
								type: "$RbColumnOrder",
								control: "RbPropertiesEditor",
								producer: self.PRODUCERS.$RbColumnOrder
							},

							{label:'Combobox', name: "combobox",
								type: "$RbComboBox",
								control: "RbPropertiesEditor",
								producer: self.PRODUCERS.$RbComboBox
							},
							{label:'List', name: "list",
								type: "$RbList",
								control: "RbPropertiesEditor",
								producer: self.PRODUCERS.$RbList
							},
							{label:'Sequence', name: "sequence",
								type: "$RbSequence",
								control: "RbPropertiesEditor",
								producer: self.PRODUCERS.$RbSequence
							},
							{label:'Gadget', name: "gadget",
								type: "$RbDisplayGadget",
								control: "RbPropertiesEditor",
								producer: self.PRODUCERS.$RbDisplayGadget
							},
							{label:'Data Map', name: "data_map",
								type: "$RbDataMap",
								control: "RbPropertiesEditor",
								producer: self.PRODUCERS.$RbDataMap
							},
							{label:'List Of Values', name: "listvalues",
								type: "$RbListValues",
								control: "RbPropertiesEditor",
								producer: self.PRODUCERS.$RbListValues
							}

						]
					}
				},
			/**
			 * datasets relations
			 */
			relation:
				{
					style: {
						header: {
							"background-color": "#444444",
							"color": "#FFFFFF",
							"fill": "#FFFFFF"
						}
					},
					title: "Relation",
					title_column: "name",
					allow_delete: true,
					columns: [
						{name: "srcDataSource", title: "from DataSource"},
						{name: "srcColumn", title: "from Column"},
						{name: "trgDataSource", title: "to DataSource"},
						{name: "trgColumn", title: "to Column"}
					]
				},
			/**
			 * list of values
			 */
			listvalues:
				{
					style: {
						header: {
							"background-color": "#444444",
							"color": "#FFFFFF",
							"fill": "#FFFFFF"
						}
					},
					title: "List of Values",
					title_column: "name",
					allow_delete: true,
					columns: [
						{name: "id", title: "ID"},
						{name: "type", title: "LOV Type"},
						{name: "datasource", title: "Data Source"},
						{name: "title", title: "Title"},
						{name: "database_engine", title: "Database Engine"},
						{name: "database", title: "Database"},
						{name: "table", title: "Table"}
					],
					editor: {
						onLink: function (__options) {
							__options.scope.$watch("model.datasource", function (newVal) {
								__options.scope.column["link_datasource"] = __options.scope.designer.model.getDataSource({id: newVal});
							});
						},
						properties: [
							{ name:'id', label: "ID", type: "string", control: "input"},
							{ name:'type', label: "LOV Type",  type: "string",
								control: "rbPropertyValuesList",
								collection: self.COLLECTIONS.designerLOVtypesCollection
							},
							{ name:'datasource', label: "Data Source",  type: "string",
								control: "rbPropertyValuesList",
								collection: self.COLLECTIONS.designerDatasourceCollection
							},
							{ name:'title', label: "Title",  type: "string", control: "input"},
							{ name:'binding', label: "Binding",  type: "binding",
								control: "rbObjectsCollection",
								collection: "items"
							}
						]
					}
				},

			combobox:
				{
					style: {
						header: {
							"background-color": "#444444",
							"color": "#FFFFFF",
							"fill": "#FFFFFF"
						}
					},
					title: "Combobox",
					title_column: "name",
					allow_delete: true,
					columns: [
						{name: "id", title: "ID"},
						{name: "datasource", title: "Data Source"},
						{name: "label", title: "Label"},
						{name: "placeholder", title: "Placeholder"}
					],
					editor: {
						onLink: function (__options) {
							__options.scope.$watch("model.datasource", function (newVal) {
								__options.scope.column["link_datasource"] = __options.scope.designer.model.getDataSource({id: newVal});
							});
						},
						properties: [
							{ name:'id', label: "ID", type: "string", control: "input"},
							{ name:'datasource', label: "Data Source",  type: "string",
								//control: "RbDataSourceList"
								control: "rbPropertyValuesList",
								collection: self.COLLECTIONS.designerDatasourceCollection
							},
							{ name:'label', label: "Label",  type: "string", control: "input"},
							{ name:'placeholder', label: "Placeholder",  type: "string", control: "input"},
							{ name:'binding', label: "Binding",  type: "binding",
								//control: "RbBindingEditor"
								control: "rbObjectsCollection",
								collection: "items"
							}
						]
					}
				},

			list:
				{
					style: {
						header: {
							"background-color": "#444444",
							"color": "#FFFFFF",
							"fill": "#FFFFFF"
						}
					},
					title: "List",
					title_column: "name",
					allow_delete: true,
					columns: [
						{name: "id", title: "ID"},
						{name: "datasource", title: "Data Source"},
						{name: "label", title: "Label"}
					],
					editor: {
						onLink: function (__options) {
							__options.scope.$watch("model.datasource", function (newVal) {
								__options.scope.column["link_datasource"] = __options.scope.designer.model.getDataSource({id: newVal});
							});
						},
						properties: [
							{ name:'id', label: "ID", type: "string", control: "input"},
							{ name:'datasource', label: "Data Source",  type: "string",
								//control: "RbDataSourceList"
								control: "rbPropertyValuesList",
								collection: self.COLLECTIONS.designerDatasourceCollection
							},
							{ name:'label', label: "Label",  type: "string", control: "input"},
							{ name:'binding', label: "Binding",  type: "binding",
								//control: "RbBindingEditor"
								control: "rbObjectsCollection",
								collection: "items"
							}
						]
					}
				},

			binding:
				{
					style: {
						header: {
							"background-color": "#444444",
							"color": "#FFFFFF",
							"fill": "#FFFFFF"
						}
					},
					title: "Binding",
					title_column: "",
					allow_delete: true,
					columns: [
						{name: "source", title: "source"},
						{name: "target", title: "target"},
						{name: "visible", title: "visible"}
					],
					editor: {
						properties: [
							{name: "source", label: "source", type: "string",
								control: "rbPropertyValuesList",
								collection: self.COLLECTIONS.sourceColumnsCollection
							},
							{name: "target", label: "target", type: "string",
								control: "rbPropertyValuesList",
								collection: self.COLLECTIONS.columnsCollection
							},
							{name: "visible", label: "visible", type: "boolean", control: "checkbox"}
						]
					}
				},

			columnfilter:
				{
					style: {
						header: {
							"background-color": "#444444",
							"color": "#FFFFFF",
							"fill": "#FFFFFF"
						}
					},
					title: "Column Filter",
					title_column: "",
					allow_delete: true,
					columns: [
						{name: "value", title: "Exact Value"},
						{name: "value1", title: "Min Value"},
						{name: "value2", title: "Max Value"},
						{name: "mask", title: "Mask"},
						{name: "reverse", title: "Reverse"}
					],
					editor: {
						properties: [
							{name: "value", label: "Exact Value", type: "string", control: "input"},
							{name: "value1", label: "Min Value", type: "string", control: "input"},
							{name: "value2", label: "Max Value", type: "string", control: "input"},
							{name: "mask", label: "Mask", type: "string", control: "input"},
							{name: "reverse", label: "Reverse", type: "boolean", control: "checkbox"}
						]
					}
				},

			columnorder:
				{
					style: {
						header: {
							"background-color": "#444444",
							"color": "#FFFFFF",
							"fill": "#FFFFFF"
						}
					},
					title: "Column Order",
					title_column: "",
					allow_delete: true,
					columns: [
						{name: "dir", title: "Direction"},
						{name: "num", title: "Priority"}
					],
					editor: {
						properties: [
							{name: "dir", label: "Direction", type: "string",
								//control: "RbColumnOrderDirection",
								control: "rbPropertyValuesList",
								collection: self.COLLECTIONS.designerOrderCollection
							},
							{name: "num", label: "Priority", type: "number", control: "number", required: true, step: 'any', min: 0, max: 100, style: {width: "40px"},
								onLink: function(__options){
									if(__options.scope.datasource)
									{
										//__options.scope.designer.STRUCTURE.columnorder.editor.properties[1].max = __options.scope.datasource.columns.length;
										this.max = __options.scope.datasource.columns.length;
										//__options.scope.properties[1].max = __options.scope.datasource.columns.length;
									}
								}
							}
						]
					}
				},

			gadget:
				{
					style: {
						header: {
							"background-color": "#444444",
							"color": "#FFFFFF",
							"fill": "#FFFFFF"
						}
					},
					title: "Display Gadget",
					title_column: "",
					allow_delete: true,
					columns: [
						{name: "gadget", title: "Gadget"},
						{name: "replace", title: "Replace element"}
					],
					editor: {
						properties: [
							{name: "gadget", label: "Gadget Type", type: "string",
								control: "rbPropertyValuesList",
								collection: self.COLLECTIONS.designerGadgetTypesCollection
							},
							{name: "replace", label: "Replace element", type: "boolean", control: "checkbox"}
						]
					}
				},

			sequence:
				{
					style: {
						header: {
							"background-color": "#444444",
							"color": "#FFFFFF",
							"fill": "#FFFFFF"
						}
					},
					title: "Sequence",
					title_column: "",
					allow_delete: true,
					columns: [
						{name: "database", title: "Database"},
						{name: "sequence_id", title: "Sequence ID"}
					],
					editor: {
						onLink: function (__options) {
							__options.scope.$watch("model.database", function ( newVal ) {
								if( __options.scope.model ) {
									if ( newVal ) {
										__options.scope.model[ "database_object" ] = __options.scope.designer.getDatabase( { name: newVal } );
									} else {
										__options.scope.model[ "database_object" ] = null;
									}
								}
							});
						},
						properties: [
							{name: "database", label: "Database", type: "string",
								control: "rbPropertyValuesList",
								collection: self.COLLECTIONS.designerDatabasesCollection
							},
							{name: "sequence_id", label: "Sequence ID", type: "string",
								control: "rbPropertyValuesList",
								collection: self.COLLECTIONS.parentModelDatabaseObjectSequencesCollection
							}
						]
					}
				},

			datamap:
				{
					style: {
						header: {
							"background-color": "#444444",
							"color": "#FFFFFF",
							"fill": "#FFFFFF"
						}
					},
					title: "DataMap",
					title_column: "",
					allow_delete: true,
					columns: [
						{name: "db_type_a", title: "Column Data type"},
						{name: "db_type_b", title: "Map data type"},
						{name: "map", title: "Values Pair"}
					],
					editor: {
						properties: [
							{name: "db_type_a", label: "Column Data type", type: "string",
								control: "rbPropertyValuesList",
								collection: self.COLLECTIONS.designerDataTypesCollection,
								onChange: function(__options){
									if( __options.scope.model && typeof __options.scope.model === 'object' ) {
										let dataType = _.findWhere(__options.designer.dataTypes, {type: __options.value});
										if (dataType) {
											__options.scope.model["db_type_a__control"] = dataType.control;
										} else {
											__options.scope.model["db_type_a__control"] = null;
										}
									}
								}
							},
							{name: "db_type_b", label: "Map data type", type: "string",
								control: "rbPropertyValuesList",
								collection: self.COLLECTIONS.designerDataTypesCollection,
								onChange: function( __options ){
									if( __options.scope.model && typeof __options.scope.model === 'object' ) {
										let dataType = _.findWhere(__options.designer.dataTypes, {type: __options.value});
										if (dataType) {
											__options.scope.model["db_type_b__control"] = dataType.control;
										} else {
											__options.scope.model["db_type_a__control"] = null;
										}
									}
								}
							},
							{name: "map", label: "Values Pair", type: "datamap_items", control: "rbObjectsCollection", collection: null}
						]
					}
				},

			datamap_items:
				{
					style: {
						header: {
							"background-color": "#444444",
							"color": "#FFFFFF",
							"fill": "#FFFFFF"
						}
					},
					title: "DataMap",
					title_column: "",
					allow_delete: true,
					columns: [
						{name: "a", title: "Column Value"},
						{name: "b", title: "Mapped Value"},
						{name: "d", title: "Optional"}
					],
					editor: {
						onLink: function (__options) {
							__options.scope.$watch("parentmodel.db_type_a__control", function (newVal) {
								if(newVal) {
									__options.scope["properties"][0]["control"] = newVal;
								}else{
									__options.scope["properties"][0]["control"] = "input";
								}

							});
							__options.scope.$watch("parentmodel.db_type_b__control", function (newVal) {
								if(newVal) {
									__options.scope["properties"][1]["control"] = newVal;
								}else{
									__options.scope["properties"][1]["control"] = "input";
								}

							});
						},
						properties: [
							{name: "a", label: "Column Value", type: "string", control: "input"},
							{name: "b", label: "Mapped Value", type: "string", control: "input"},
							{name: "d", label: "Optional", type: "string", control: "input"}
						]
					}
				},

			row_filter:
				{
					style: {
						header: {
							"background-color": "#444444",
							"color": "#FFFFFF",
							"fill": "#FFFFFF"
						}
					},
				title: "Row Filter",
				title_column: "",
				allow_delete: true,
				columns: [
					{name: "expression", title: "Expression"},
					{name: "column_binding", title: "Column Binding"}
				],
				editor: {
					properties: [
						{name: "expression", label: "Expression", type: "string", control: "input", collection: null},
						{name: "column_binding", label: "Column Binding", type: "column_binding", control: "rbObjectsCollection"}
					]
				}
			},

			column_binding:
				{
					style: {
						header: {
							"background-color": "#444444",
							"color": "#FFFFFF",
							"fill": "#FFFFFF"
						}
					},
					title: "Column Binding",
					title_column: "",
					allow_delete: true,
					columns: [
						{name: "column", title: "Column"},
						{name: "filter_property", title: "Filter Property"}
					],
					editor: {
						properties: [
							{
								name: "column", label: "Column",
								type: "string",
								control: "rbPropertyValuesList",
								collection: self.COLLECTIONS.columnsCollection
							},
							{
								name: "filter_property", label: "Filter Property",
								type: "string",
								control: "rbPropertyValuesList",
								collection: self.COLLECTIONS.filterPropertiesCollection
							}
						]
					}
				},

			validator_processor:
				{
					style: {
						header: {
							"background-color": "#444444",
							"color": "#FFFFFF",
							"fill": "#FFFFFF"
						}
					},
					title: "Row Validator",
					title_column: "",
					allow_delete: true,
					columns: [
						{name: "validator", title: "Validator"}
					],
					editor: {
						properties: [
							{name: "items", label: "Validator",
								type: "row_validator",
								control: "rbObjectsCollection",
								collection: null}
						]
					}
				},

			row_validator:
				{
					style: {
						header: {
							"background-color": "#444444",
							"color": "#FFFFFF",
							"fill": "#FFFFFF"
						}
					},
				title: "Row Validator",
				title_column: "",
				allow_delete: true,
				columns: [
					{name: "metod", title: "Metod"},
					{name: "column", title: "Column"},
					{name: "column1", title: "Column 1"},
					{name: "operator", title: "Operator"},
					{name: "column2", title: "Column 2"},
					{name: "list", title: "List Values"}
				],
				editor: {
					properties: [
						{name: "metod", label: "Metod",
							type: "string",
							control: "rbPropertyValuesList",
							collection: self.COLLECTIONS.rowValidatorMetodsCollection
						},
						{name: "column", label: "Column",
							type: "string",
							control: "rbPropertyValuesList",
							collection: self.COLLECTIONS.columnsCollection
						},
						{name: "column1", label: "Column 1",
							type: "string",
							control: "rbPropertyValuesList",
							collection: self.COLLECTIONS.columnsCollection
						},
						{name: "operator", label: "Operator",
							type: "string",
							control: "rbPropertyValuesList",
							collection: self.COLLECTIONS.rowValidatorOperatorsCollection
						},
						{name: "column2", label: "Column 2",
							type: "string",
							control: "rbPropertyValuesList",
							collection: self.COLLECTIONS.columnsCollection},
						{name: "list", label: "List Values", type: "string", control: "input", collection: null}

					]
				}
			},

			orderby:
				{
					style: {
						header: {
							"background-color": "#444444",
							"color": "#FFFFFF",
							"fill": "#FFFFFF"
						}
					},
					title: "Order By",
					title_column: "Order By",
					allow_delete: true,
					columns: [
						{name: "orderby", title: "Order By"}
					],
					editor: {
						properties: [
							{name: "orderby", label: "Order By",
								type: "orderby_items",
								control: "rbObjectsCollection",
								producer: self.PRODUCERS.$RbRowOrder,
								collection: null}
						]
					}
				},

			orderby_items:
				{
					style: {
						header: {
							"background-color": "#444444",
							"color": "#FFFFFF",
							"fill": "#FFFFFF"
						}
					},
					title: "Order By",
					title_column: "Order By",
					allow_delete: true,
					columns: [
						{name: "order", title: "Order"},
						{name: "direction", title: "Direction"}
					],
					editor: {
						properties: [
							{name: "order", label: "Order", type: "string",
								control: "rbPropertyValuesList",
								collection: self.COLLECTIONS.sourceColumnsCollection
							},
							{name: "direction", label: "Direction", type: "string",
								control: "rbPropertyValuesList",
								collection: self.COLLECTIONS.designerOrderCollection
							}
						]
					}
				},

			groupby:
				{
					style: {
						header: {
							"background-color": "#444444",
							"color": "#FFFFFF",
							"fill": "#FFFFFF"
						}
					},
					title: "Group By",
					title_column: "Group By",
					allow_delete: true,
					columns: [
						{name: "groupby", title: "Group By"}
					],
					editor: {
						properties: [
							{name: "groupby", label: "Group By",
								type: "groupby_items",
								control: "rbObjectsCollection",
								producer: self.PRODUCERS.$RbRowOrder,
								collection: null}
						]
					}
				},

			groupby_items:
				{
					style: {
						header: {
							"background-color": "#444444",
							"color": "#FFFFFF",
							"fill": "#FFFFFF"
						}
					},
					title: "Group By",
					title_column: "Group By",
					allow_delete: true,
					columns: [
						{name: "group", title: "Group"}
					],
					editor: {
						properties: [
							{name: "group", label: "Group", type: "string",
								control: "rbPropertyValuesList",
								collection: self.COLLECTIONS.sourceColumnsCollection
							}
						]
					}
				}
		};

    self.model = new $RbModelBuilderModel(
    	{
		    path: "model/test/",
		    type: 'JSON',
		    designer: self
    	}
    	).init();

	self.view = new $RbModelBuilderView(
		{
			type: 'JSON',
			designer: self
		}
		).init();

    return self;
};

// $RbModelBuilder.prototype.reset = function()
// {
// 	return this;
// };

$RbModelBuilder.prototype.send = function (__options, __callback)
{
    const self = this;
    self.network.message = 'Load...';
    let deffered = self.$q.defer();

    let ___json_str = JSON.stringify(__options, function(key, value) {
	    if (key === 'proto') return undefined;
	    if (key === '_proto') return undefined;
	    if (key === '__proto') return undefined;
	    if (key === 'link_datasource') return undefined;
	    if (key === 'designer') return undefined;
	    //if (key == 'datasource') return undefined;
	    return value;
    });

    self.$http({
        method: 'POST',
        url: self.url + "/" + self.api_metod,
	    data: ___json_str
    }).then(function(data) {
        deffered.resolve(data.data, data.status);
    }).catch(function(data) {
        deffered.reject(data.data, data.status);
    });

    deffered.promise.then(
        function (___data) {
            //console.trace(___data);
            self.debug = JSON.stringify(___data);
            self.network.status = true;
            self.network.message = 'OK.';
            if(__callback){
                __callback(___data);
            }
        },
        function (___data, ___status) {
            self.network.status = ___data;
            self.network.message = '$RbModelBuilder.send: network error... ' + ___data + ' - ' + ___status;
            //console.log(self.network.message);
            //console.log(___status);
            //console.log(___data);
            if(__callback){
                __callback(false);
            }
        }
    );

};

$RbModelBuilder.prototype.loadDatabases = function ()
{
    const self = this;
    let __data = {"action": "databases"};

    self.databases = null;
    self.databases = [];

    self.send(__data, function (__result) {
        if(__result) {
            if(__result.action === "databases") {
                self.setDatabases(__result.result);
            }
        }else{

        }
    });
    return self;
};

$RbModelBuilder.prototype.setIndexModels = function (__options)
{
    const self = this;
    self.models = null;
    self.models = _.map(__options, function (__elem) {
        return new $RbModelBuilderModel( __elem );
    });
    return self;
};

$RbModelBuilder.prototype.setDatabases = function (__options)
{
    const self = this;
    self.databases = _.map(__options, function (__elem) {
        return new $RbModelBuilderDatabase(__elem);
    });

	self.initDatabases();

    return self;
};

$RbModelBuilder.prototype.initDatabases = function ()
{
	const self = this;
	_.each(self.databases, function(__dbss){
		self.loadSequences(__dbss);
	});
};

$RbModelBuilder.prototype.getDatabase = function (__options)
{
	const self = this;
	let __out = _.findWhere(self.databases, __options);
	if(typeof __out === 'undefined'){
		__out = null;
	}
	return __out;
};

// $RbModelBuilder.prototype.loadSquid = function ()
// {
//     const self = this;
//
//     var __data = {"action": "squid"};
//
//     self.send(__data, function (__result) {
//         console.log("--- SQUID ---");
//         console.log(__result);
//     });
//     return self;
// };

$RbModelBuilder.prototype.loadTables = function (__database)
{
    const self = this;

    self.database = __database;
    __database.reset();
    let __data = {"action": "tables", "database": __database.name};

    self.send(__data, function (__result) {
        if(__result) {
            if(__result.action === "tables") {
                __database.addTables(__result.result);
            }
        }else{

        }
    });
    return self;
};

$RbModelBuilder.prototype.includeTableToModel = function ( __table )
{
    const self = this;
	__table['id'] = self.model.getIdDataSource( __table );
    let ___ds =  new $RbDataSource( __table, true );
    self.model.addDataSource( ___ds );
    self.loadColumns( ___ds );
};

// $RbModelBuilder.prototype.includeAllTablesToModel = function () {
//
// };

$RbModelBuilder.prototype.excludeTableFromModel = function (__table)
{
    const self = this;
    self.model.removeDataSource(__table);
	self.redrawRelations();
};

$RbModelBuilder.prototype.loadColumns = function (__table)
{
    const self = this;

    let __data = {"action": "columns", "database": __table.database, "table": __table.table};

    self.send(__data, function ( __result ) {
        if( __result ) {
            __table.setColumns( __result.result );
	        self.redrawRelations();
        }else{

        }
    });
    return self;
};

$RbModelBuilder.prototype.loadSequences = function (__database)
{
	const self = this;

	let __data = {"action": "sequences", "database": __database.name};

	self.send(__data, function (__result) {
		if(__result) {
			if(__result.action === "sequences") {
				__database.setSequences(__result.result);
			}
		}else{

		}
	});
	return self;
};

$RbModelBuilder.prototype.loadReferences = function ( __database )
{
	const self = this;
	let __data = {
		action: "references",
		database: __database.name
	};

	self.send(__data, function ( __result ) {
		if( __result ) {
			self.model.setReferences( __result.result );
			self.redrawRelations();
		}else{

		}
	});
	return self;
};

$RbModelBuilder.prototype.loadIndexModel = function ( __action, __model )
{
    const self = this;
	if( _.isUndefined( __action ) ){
		__action = "indexModel";
	}
	if( _.isUndefined( __model ) ){
		__model = null;
	}
    let __data = {"action": __action, model: __model};

    self.send(__data, function (__result) {
        if(__result) {
            if(__result.action === "indexModel" || __result.action === "deleteModel" ) {
                self.setIndexModels( __result.result );
            }
        }else{

        }
    });
    return self;
};

$RbModelBuilder.prototype.deleteModel = function( __model )
{
	const self = this;

	self.loadIndexModel("deleteModel", __model );

	return self;

};

$RbModelBuilder.prototype.loadModel = function( __model )
{
    const self = this;
    let __data = {"action": "loadModel", model: __model};

    self.model = null;

    _.each(self.models, function (___model) {
	    ___model.selected = false;
    });

	__model.selected = true;

    self.send(__data, function ( __data )
    {
        if(__data) {
            //console.log(__data);
            if(__data.action === "loadModel") {
                //self.model  = new $RbModelBuilderModel( __data.result.model );
	            self.model  = new $RbModelBuilderModel( __data.result );
                self.model.designer = self;

	            self.$timeout(function()
                {
	                self.redrawRelations();
                }, self.redraw_timeout_ms);
            }
        }else{

        }
    });
    return self;

};

$RbModelBuilder.prototype.createModel = function(  )
{
	const self = this,
		__elem = {id: 'MODEL_'+self.models.length, description: 'Model_'+self.models.length + ' Description'};
	self.model = null;
	self.model = new $RbModelBuilderModel( __elem );
	self.models.push( self.model );
	return self;
};

/**
 * save data model to server
 */
$RbModelBuilder.prototype.saveModel = function ()
{
    const self = this;
    let __data = {"action": "saveModel", model: null, ds: null};

	let __model_obj = self.model.generateModelObject();
	let __model_ds = self.model.generateDSObject();

    __data.model = __model_obj;
    __data.ds = __model_ds;

    self.send(__data, function ( __result ) {
        if( __result ) {
            if( __result.action === "saveModel" ) {
	            self.model.setStatus( $RbModelBuilderModel.prototype.STATUS.SAVED );
            }
        }else{

        }
    });
    return self;
};

/**
 * store or read data to/from localstorage
 * @param ___name   property name
 * @param ___value  property value for store, undefined for read
 * @returns {*}
 */
$RbModelBuilder.prototype.storageValue = function ( ___name, ___value )
{
    const self = this;
	let __storageModel = self.$localStorage;

    if(typeof ___name === 'undefined') {
        console.debug("Name of storage must be defined");
    }else {
        ___name = "RedButtonModelBuilder" + '.' + ___name;
        if (typeof ___value === 'undefined') {
            if(typeof __storageModel[___name] !== 'undefined') {
                return __storageModel[___name];
            }else{
                return null;
            }
        } else {
            __storageModel[___name] = ___value;
        }
    }
};

$RbModelBuilder.prototype.createRelation = function( ___relation_info, __scope )
{
	const self = this;
	self.model.addRelation( ___relation_info );
	self.redrawRelations( __scope );

	// if( self.model.addRelation( ___relation_info ) ) {
	// 	self.redrawRelations( __scope );
	// }
};

$RbModelBuilder.prototype.unlinkRelation = function( ___relation_info, __scope )
{
	const self = this;
	self.model.removeRelation(___relation_info);
	self.selectRelation();
	self.redrawRelations(__scope);
};

$RbModelBuilder.prototype.redrawRelations = function ( __scope )
{
	const self = this;

	let ___scope = __scope ? __scope : self.$rootScope;

	let ___element = self.$document[0].getElementById("rb_designer_desktop");
	let __position = $$rbCore.getOffset(___element);

	self.visible.relations = true;

	if(self.$rootScope.$$phase == null) {
		___scope.$apply(self.model.redrawRelations( __position ));
	}else{
		self.$timeout(function()
		{
			___scope.$apply(self.model.redrawRelations( __position ));
		}, self.redraw_timeout_ms);
	}

};

$RbModelBuilder.prototype.selectRelation = function ( __event, __relation )
{
	const self = this;

	if (typeof __relation === 'undefined') {
		if (self.relation) {
			self.relation.unSelect();
		}
		self.relation = null;
	} else {
		self.relation = __relation.select(__event);
	}

	self.visible.relationMenu = !!self.relation;
};

$RbModelBuilder.prototype.createForm = function (  )
{
	const self = this;
	self.model.createForm();
};

$RbModelBuilder.prototype.removeForm = function ( ___form )
{
	const self = this;

	self.model.removeForm( ___form );

};

$RbModelBuilder.prototype.createApplication = function (  )
{
	const self = this;

	self.model.createApplication();

};

$RbModelBuilder.prototype.removeApplication = function ( ___application )
{
	const self = this;

	self.model.removeApplication( ___application );

};

$RbModelBuilder.prototype.arrangeElements = function ( layout )
{
	const self = this;
	let __selector = "[snacks-auto-position]";
	let __elements = self.$document[0].querySelectorAll( __selector );
	let positionManager = new $RbElementsPositionManager(
		{
			$localStorage: self.$localStorage,
			layout: layout,
			datasources: self.model.datasources,
			callback: self.redrawRelations.bind( self )
		}
	);
	self.visible.relations = false;
	positionManager.arrange( __elements );
};


/**
 * click on metadata panel: up this panel and up relation panel plus relation lines
 * @param event
 * @param model
 */
$RbModelBuilder.prototype.onClickTopHandler = function ( event, model ) {
	const self = this;
	self.model.moveToTopDataRelations( model );
};

export default $RbModelBuilder;