"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

angular.module('rb.designer')
	.directive('rbDesignerDataRelationMenu', $$$RedButtonDesignerDataRelationMenuDirective);

function $$$RedButtonDesignerDataRelationMenuDirective($mdDialog, rbCore, RedButtonDesignerService)
{
	return {
		template: '<div id="RedButtonDesignerDataRelationMenuDirectiveID" \
	            class="rb-designer-block rb-designer-relation-menu" \
	            ng-style="model.menu.style" \
	            snacks-floating=".rb-designer-block-ds-header" \
	            snacks-click-top>\
                            <md-toolbar class="rb-designer-block-ds-header" layout="row" >\
                                <div class="rb-designer-block-ds-header">\
                                    <span class="rb-designer-block-ds-header rb-designer-font-accent">Relation</span>\
                                </div>\
                            </md-toolbar>\
                            <md-dialog-content>\
                                <div  class="rb-table">\
                                    <div class="rb-table-row" ng-repeat="str_column in designer.STRUCTURE.relation.columns track by $index"> \
                                        <div class="rb-table-cell">{{str_column.title}}</div>\
                        			    <div class="rb-table-cell">{{model[str_column.name]}}</div>\
                                     </div> \
                                </div>\
                            </md-dialog-content>\
                            <md-dialog-actions >\
                                <span flex></span>\
                                <md-button class="md-raised md-primary" ng-click="rel_unlink()" aria-label="Remove"> <ng-md-icon icon="{{designer.ICONS.EDITOR.CANCEL}}" size="20"  ></ng-md-icon>Unlink</md-button>\
                                <md-button class="md-raised" ng-click="rel_close()" aria-label="Cancel"><ng-md-icon icon="{{designer.ICONS.EDITOR.OK}}" size="20" ></ng-md-icon>OK</md-button>\
                            </md-dialog-actions>\
                        </div>',
		restrict: "E",
		require: 'ngModel',
		replace: true,
		controller: "rbDesignerMetaComponentController",
		scope: {model: '=ngModel'},
		link: function ( scope ) {
			scope.designer = RedButtonDesignerService;
			scope.visible = false;

			scope.rel_close = function () {
				scope.designer.selectRelation();
			};

			scope.rel_unlink = function () {
				scope.designer.unlinkRelation( scope.model, scope );
			};

		}
	}
}
$$$RedButtonDesignerDataRelationMenuDirective.$inject = ["$mdDialog", "rbCore", "RedButtonDesignerService"];