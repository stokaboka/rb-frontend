"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

angular.module('rb.designer')
	.directive('rbDesignerPropertyValuesList', $$$RedButtonDesignerPropertyValuesListDirective);

function $$$RedButtonDesignerPropertyValuesListDirective($parse, rbCore, RedButtonDesignerService)
{
	return {
		restrict: "E",
		require: 'ngModel',
		template: '<md-input-container>' +
							'<md-select ng-model="model" aria-label="{{label}}">' +
								'<md-option ng-repeat="item in collection_items track by $index" value="{{item[valueProperty]}}" aria-label="{{item[labelProperty]}}">' +
									'<ng-md-icon icon="{{item.icon}}" size="20" ng-show="item.icon"></ng-md-icon>' +
									 '{{item[labelProperty]}} ' +
								'</md-option> ' +
							'</md-select> ' +
						'</md-input-container>' ,
		replace: true,
		scope:{
			model: '=ngModel',
			parentmodel: '=ngParentModel',
			datasource: '=?rbDataSource',
			row: "=?rbDataSourceRow",
			column: "=?rbDataSourceColumn",
			property: "=rbDesignerProperty",

			collection: "=?rbValuesCollection",
			items: "=rbValuesArray",
			label: "@?rbLabel"
		},
		link: function( scope ) {

			scope.designer = RedButtonDesignerService;
			scope.collection_items = [];
			scope.label = scope.label || "Label";

			if ( !_.isUndefined( scope.property ) )
			{
				scope.label = scope.property.label || scope.label;

				if( _.isUndefined( scope.collection )  &&  !_.isUndefined( scope.property.collection ) )
				{
					scope.collection = scope.property.collection;
				}

			}

			scope.refreshCollection = function ()
			{
				if ( scope.collection ) {
					scope.collection_items = $parse( scope.collection.source )( scope );
					scope.valueProperty = scope.collection.value;
					scope.labelProperty = scope.collection.label;
				} else {
					if ( scope.valueProperty == null ) {
						scope.valueProperty = "type";
					}

					if ( scope.labelProperty == null ) {
						scope.labelProperty = "label";
					}

					if ( scope.items && _.isString( scope.items ) ) {
						scope.collection_items = $parse( scope.items )( scope );
					} else {
						scope.collection_items = scope.items;
					}

				}
			};

			scope.refreshCollection();

			if ( !_.isUndefined( scope.property ) )
			{
				if ( !_.isUndefined( scope.property.onLink ))
				{
					scope.property.onLink( { scope: scope } );
				}

				if ( !_.isUndefined( scope.property.onChange ) )
				{
					var ___watch_property = "model." + scope.property.name;
					scope.$watch( ___watch_property, function ( newVal, OldVal )
					{
						if (scope.model) {
							scope.property.onChange( {
								designer: scope.designer,
								scope: scope,
								/**
								 * TODO test this changes!!!
								 */
								value: _.isObject( scope.model ) ? scope.model[ scope.property.name ] : scope.model
								//value: scope.model[ scope.property.name ]
							} );
						}
					});
				}
			}

			if( scope.collection )
			{
				scope.$watch( scope.collection.watch, function ( newVal, oldVal ) {
					scope.refreshCollection();
				})
			}

			// scope.$watch( "model", function( nv, ov )
			// {
			// 	console.log("oldval");
			// 	console.log(ov);
			// 	console.log("newval");
			// 	console.log(nv);
			// });

		}
	}
}
$$$RedButtonDesignerPropertyValuesListDirective.$inject = ["$parse", "rbCore", "RedButtonDesignerService"];