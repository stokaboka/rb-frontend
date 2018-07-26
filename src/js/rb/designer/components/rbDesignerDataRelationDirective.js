/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

"use strict";

angular.module('rb.designer')
	.directive('rbDesignerDataRelation', $$$RedButtonDesignerDataRelationDirective);

function $$$RedButtonDesignerDataRelationDirective($compile, $mdDialog, rbCore, RedButtonDesignerService)
{
	return {
		template:'<svg xmlns="http://www.w3.org/2000/svg" ' +
			'ng-style="model.container.style" ' +
			'class="rb-designer-relation-link-container" >' +
			'<g ng-class="model.container.linkClass" ' +
				'class="rb-designer-relation-link-line" ' +
				'ng-click="relationLineOnClick($event)" ' +
				'ng-dblclick="relationLineOnDblClick($event)" >' +
				'<polyline  />' +
				// '<circle />' +
				'<path />' +
			'</g>' +
		'</svg>',

		restrict: "E",
		require: 'ngModel',
		replace: true,
		scope: {model: '=ngModel'},
		controller: "rbDesignerMetaComponentController",
		templateNamespace: 'svg',
		compile: function($elem, $attrs){
			return function (scope, element, attrs, ctrl) {
				scope.designer = RedButtonDesignerService;
				let __crcl = element.find("circle");
				let __pl = element.find("polyline");
				let __pt = element.find("path");

				if(__crcl) {
					__crcl.attr(scope.model.circle_style);
				}

				scope.$watch('model.points', function (newVal, oldVal) {

					if(typeof newVal == 'string'){
						if(__pl){
							__pl.attr("points", scope.model.points);
						}
						if(__crcl){
							__crcl.attr({"cx": scope.model.srcPoint.x, "cy": scope.model.srcPoint.y});
						}
						if(__pt){
							__pt.attr("d", scope.model.arrow);
						}
					}else{
						if(__pl){
							__pl.removeAttr("points");
						}
						if(__crcl){
							__crcl.removeAttr("cx");
							__crcl.removeAttr("cy");
						}
						if(__pt){
							__pl.removeAttr("d");
						}
					}

				});

				scope.relationLineOnClick = function ( event ) {
					scope.designer.onClickTopHandler( event, scope.model );
				};

				scope.relationLineOnDblClick = function ( event ) {
					scope.designer.selectRelation( event, scope.model );
				}
			}
		}
	}
}
$$$RedButtonDesignerDataRelationDirective.$inject = ['$compile', "$mdDialog", "rbCore", "RedButtonDesignerService"];