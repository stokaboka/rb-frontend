"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

import $RbFormLayout from '../../core/rbFormLayout';

angular.module('rb.designer')
	.directive('rbDesignerFormLayoutEditor', $$$RedButtonDesignerFormLayoutEditorDirective)

	.directive('rbDesignerFormLayoutEditorSingle', $$$RedButtonDesignerFormLayoutEditorSingleDirective)
	.directive('rbDesignerFormLayoutEditorTwoVertical', $$$RedButtonDesignerFormLayoutEditorTwoVerticalDirective)
	.directive('rbDesignerFormLayoutEditorTwoHorizontal', $$$RedButtonDesignerFormLayoutEditorTwoHorizontalDirective)
	.directive('rbDesignerFormLayoutEditorThreeVertical', $$$RedButtonDesignerFormLayoutEditorThreeVerticalDirective)
	.directive('rbDesignerFormLayoutEditorThreeHorizontal', $$$RedButtonDesignerFormLayoutEditorThreeHorizontalDirective)

	.directive('rbDesignerFormLayoutEditorOneTwo', $$$RedButtonDesignerFormLayoutEditorOneTwoDirective)
	.directive('rbDesignerFormLayoutEditorTwoOne', $$$RedButtonDesignerFormLayoutEditorTwoOneDirective)

	.directive('rbDesignerFormLayoutEditorFourBox', $$$RedButtonDesignerFormLayoutEditorFourBoxDirective)
	.directive('rbDesignerFormLayoutEditorOneFourBox', $$$RedButtonDesignerFormLayoutEditorOneFourBoxDirective);

function $$$RedButtonDesignerFormLayoutEditorDirective( RedButtonDesignerService )
{
	return {
		restrict: "E",
		require: 'ngModel',
		template:
		'<div ng-switch="layout.type">' +

		'   <rb-designer-form-layout-editor-single ng-switch-when="SINGLE_DATASOURCE">' +
		'   </rb-designer-form-layout-editor-single>' +

		'    <rb-designer-form-layout-editor-two-vertical ng-switch-when="TWO_DATASOURCE_VERTICAL">' +
		'    </rb-designer-form-layout-editor-two-vertical> ' +

		'    <rb-designer-form-layout-editor-two-horizontal ng-switch-when="TWO_DATASOURCE_HORIZONTAL">' +
		'    </rb-designer-form-layout-editor-two-horizontal> ' +

		'   <rb-designer-form-layout-editor-three-vertical ng-switch-when="THREE_DATASOURCE_VERTICAL">' +
		'   </rb-designer-form-layout-editor-three-vertical>' +

		'   <rb-designer-form-layout-editor-three-horizontal ng-switch-when="THREE_DATASOURCE_HORIZONTAL">' +
		'   </rb-designer-form-layout-editor-three-horizontal>' +

		'   <rb-designer-form-layout-editor-one-two ng-switch-when="ONE_TWO_DATASOURCE">' +
		'   </rb-designer-form-layout-editor-one-two>' +

		'   <rb-designer-form-layout-editor-two-one ng-switch-when="TWO_ONE_DATASOURCE">' +
		'   </rb-designer-form-layout-editor-two-one>' +

		'   <rb-designer-form-layout-editor-four-box ng-switch-when="FOUR_BOX_DATASOURCE">' +
		'   </rb-designer-form-layout-editor-four-box>' +

		'   <rb-designer-form-layout-editor-one-four-box ng-switch-when="ONE_FOUR_BOX_DATASOURCE">' +
		'   </rb-designer-form-layout-editor-one-four-box>' +

		'</div>',

		replace: true,
		scope:{
			model: '=ngModel'
		},
		link: function( scope )
		{

			scope.layout = new $RbFormLayout( scope.model.layout )
				.setDataSource( scope.model.datasources );

			scope.designer = RedButtonDesignerService;

			scope.$watch("layout.grid", function ( ) {

				scope.model.datasources = scope.layout.getDataSource();

			}, true);


		}
	}

}
$$$RedButtonDesignerFormLayoutEditorDirective.$inject = [ "RedButtonDesignerService"];


function $$$RedButtonDesignerFormLayoutEditorSingleDirective(){
	return {
		restrict: "E",
		template: '<div layout="row" class="rb-designer-form-layout_box" >' +
		'				<rb-designer-property-values-list ' +
		'					ng-model="layout.grid.zero" rb-label="Datasource List" ' +
		'					rb-values-collection="designer.COLLECTIONS.designerDatasourceCollection">' +
		'				</rb-designer-property-values-list>' +
		'    </div> ',
		replace: true,
	}
}
$$$RedButtonDesignerFormLayoutEditorSingleDirective.$inject = [];

function $$$RedButtonDesignerFormLayoutEditorTwoVerticalDirective(){
	return {
		restrict: "E",
		template: ' <div layout="column" >' +
		'       <div class="rb-designer-form-layout_box">' +
		'			<rb-designer-property-values-list ' +
		'				ng-model="layout.grid.zero" rb-label="Datasource List" ' +
		'				rb-values-collection="designer.COLLECTIONS.designerDatasourceCollection">' +
		'			</rb-designer-property-values-list>' +
		'		</div>' +
		'       <div class="rb-designer-form-layout_box">' +
		'			<rb-designer-property-values-list ' +
		'				ng-model="layout.grid.one" rb-label="Datasource List" ' +
		'				rb-values-collection="designer.COLLECTIONS.designerDatasourceCollection">' +
		'			</rb-designer-property-values-list>' +
		'		</div>' +
		'    </div> ',
		replace: true,
	}
}
$$$RedButtonDesignerFormLayoutEditorTwoVerticalDirective.$inject = [];

function $$$RedButtonDesignerFormLayoutEditorTwoHorizontalDirective(){
	return {
		restrict: "E",
		template: '<div layout="row" >' +
		'       <div class="rb-designer-form-layout_box">' +
		'			<rb-designer-property-values-list ' +
		'				ng-model="layout.grid.zero" rb-label="Datasource List" ' +
		'				rb-values-collection="designer.COLLECTIONS.designerDatasourceCollection">' +
		'			</rb-designer-property-values-list>' +
		'		</div>' +
		'       <div class="rb-designer-form-layout_box">' +
		'			<rb-designer-property-values-list ' +
		'				ng-model="layout.grid.one" rb-label="Datasource List" ' +
		'				rb-values-collection="designer.COLLECTIONS.designerDatasourceCollection">' +
		'			</rb-designer-property-values-list>' +
		'		</div>' +
		'    </div> ',
		replace: true,
	}
}
$$$RedButtonDesignerFormLayoutEditorTwoHorizontalDirective.$inject = [];

function $$$RedButtonDesignerFormLayoutEditorThreeVerticalDirective(){
	return {
		restrict: "E",
		template: ' <div layout="column" >' +
		'       <div class="rb-designer-form-layout_box">' +
		'			<rb-designer-property-values-list ' +
		'				ng-model="layout.grid.zero" rb-label="Datasource List" ' +
		'				rb-values-collection="designer.COLLECTIONS.designerDatasourceCollection">' +
		'			</rb-designer-property-values-list>' +
		'		</div>' +
		'       <div class="rb-designer-form-layout_box">' +
		'			<rb-designer-property-values-list ' +
		'				ng-model="layout.grid.one" rb-label="Datasource List" ' +
		'				rb-values-collection="designer.COLLECTIONS.designerDatasourceCollection">' +
		'			</rb-designer-property-values-list>' +
		'		</div>' +
		'       <div class="rb-designer-form-layout_box">' +
		'			<rb-designer-property-values-list ' +
		'				ng-model="layout.grid.two" rb-label="Datasource List" ' +
		'				rb-values-collection="designer.COLLECTIONS.designerDatasourceCollection">' +
		'			</rb-designer-property-values-list>' +
		'		</div>' +
		'    </div> ',
		replace: true,
	}
}
$$$RedButtonDesignerFormLayoutEditorThreeVerticalDirective.$inject = [];

function $$$RedButtonDesignerFormLayoutEditorThreeHorizontalDirective(){
	return {
		restrict: "E",
		template: ' <div layout="row" >' +
		'       <div class="rb-designer-form-layout_box">' +
		'			<rb-designer-property-values-list ' +
		'				ng-model="layout.grid.zero" rb-label="Datasource List" ' +
		'				rb-values-collection="designer.COLLECTIONS.designerDatasourceCollection">' +
		'			</rb-designer-property-values-list>' +
		'		</div>' +
		'       <div class="rb-designer-form-layout_box">' +
		'			<rb-designer-property-values-list ' +
		'				ng-model="layout.grid.one" rb-label="Datasource List" ' +
		'				rb-values-collection="designer.COLLECTIONS.designerDatasourceCollection">' +
		'			</rb-designer-property-values-list>' +
		'		</div>' +
		'       <div class="rb-designer-form-layout_box">' +
		'			<rb-designer-property-values-list ' +
		'				ng-model="layout.grid.two" rb-label="Datasource List" ' +
		'				rb-values-collection="designer.COLLECTIONS.designerDatasourceCollection">' +
		'			</rb-designer-property-values-list>' +
		'		</div>' +
		'    </div> ',
		replace: true,
	}
}
$$$RedButtonDesignerFormLayoutEditorThreeHorizontalDirective.$inject = [];

function $$$RedButtonDesignerFormLayoutEditorOneTwoDirective(){
	return {
		restrict: "E",
		template: ' <div layout="column" >' +
		'       <div class="rb-designer-form-layout_box">' +
		'			<rb-designer-property-values-list ' +
		'				ng-model="layout.grid.zero" rb-label="Datasource List" ' +
		'				rb-values-collection="designer.COLLECTIONS.designerDatasourceCollection">' +
		'			</rb-designer-property-values-list>' +
		'		</div>' +
		'       <div layout="row" >' +
		'           <div class="rb-designer-form-layout_box">' +
		'			    <rb-designer-property-values-list ' +
		'				    ng-model="layout.grid.one" rb-label="Datasource List" ' +
		'   				rb-values-collection="designer.COLLECTIONS.designerDatasourceCollection">' +
		'	    		</rb-designer-property-values-list>' +
		'		    </div>' +
		'          <div class="rb-designer-form-layout_box">' +
		'	    		<rb-designer-property-values-list ' +
		'		    		ng-model="layout.grid.two" rb-label="Datasource List" ' +
		'			    	rb-values-collection="designer.COLLECTIONS.designerDatasourceCollection">' +
		'		    	</rb-designer-property-values-list>' +
		'		    </div>' +
		'       </div> '+
		'    </div> ',
		replace: true,
	}
}
$$$RedButtonDesignerFormLayoutEditorOneTwoDirective.$inject = [];

function $$$RedButtonDesignerFormLayoutEditorTwoOneDirective(){
	return {
		restrict: "E",
		template: ' <div layout="column" >' +
		'       <div layout="row" >' +
		'           <div class="rb-designer-form-layout_box">' +
		'			    <rb-designer-property-values-list ' +
		'				    ng-model="layout.grid.zero" rb-label="Datasource List" ' +
		'   				rb-values-collection="designer.COLLECTIONS.designerDatasourceCollection">' +
		'	    		</rb-designer-property-values-list>' +
		'		    </div>' +
		'          <div class="rb-designer-form-layout_box">' +
		'	    		<rb-designer-property-values-list ' +
		'		    		ng-model="layout.grid.one" rb-label="Datasource List" ' +
		'			    	rb-values-collection="designer.COLLECTIONS.designerDatasourceCollection">' +
		'		    	</rb-designer-property-values-list>' +
		'		    </div>' +
		'       </div> '+
		'       <div class="rb-designer-form-layout_box">' +
		'			<rb-designer-property-values-list ' +
		'				ng-model="layout.grid.two" rb-label="Datasource List" ' +
		'				rb-values-collection="designer.COLLECTIONS.designerDatasourceCollection">' +
		'			</rb-designer-property-values-list>' +
		'		</div>' +
		'    </div> ',
		replace: true,
	}
}
$$$RedButtonDesignerFormLayoutEditorTwoOneDirective.$inject = [];


function $$$RedButtonDesignerFormLayoutEditorFourBoxDirective(){
	return {
		restrict: "E",
		template: ' <div layout="column" >' +
		'       <div layout="row" >' +
		'           <div class="rb-designer-form-layout_box">' +
		'			    <rb-designer-property-values-list ' +
		'				    ng-model="layout.grid.zero" rb-label="Datasource List" ' +
		'   				rb-values-collection="designer.COLLECTIONS.designerDatasourceCollection">' +
		'	    		</rb-designer-property-values-list>' +
		'		    </div>' +
		'          <div class="rb-designer-form-layout_box">' +
		'	    		<rb-designer-property-values-list ' +
		'		    		ng-model="layout.grid.one" rb-label="Datasource List" ' +
		'			    	rb-values-collection="designer.COLLECTIONS.designerDatasourceCollection">' +
		'		    	</rb-designer-property-values-list>' +
		'		    </div>' +
		'       </div> ' +
		'       <div layout="row" >' +
		'           <div class="rb-designer-form-layout_box">' +
		'			    <rb-designer-property-values-list ' +
		'				    ng-model="layout.grid.two" rb-label="Datasource List" ' +
		'   				rb-values-collection="designer.COLLECTIONS.designerDatasourceCollection">' +
		'	    		</rb-designer-property-values-list>' +
		'		    </div>' +
		'          <div class="rb-designer-form-layout_box">' +
		'	    		<rb-designer-property-values-list ' +
		'		    		ng-model="layout.grid.three" rb-label="Datasource List" ' +
		'			    	rb-values-collection="designer.COLLECTIONS.designerDatasourceCollection">' +
		'		    	</rb-designer-property-values-list>' +
		'		    </div>' +
		'       </div> ' +
		'    </div> ',
		replace: true,
	}
}
$$$RedButtonDesignerFormLayoutEditorFourBoxDirective.$inject = [];

function $$$RedButtonDesignerFormLayoutEditorOneFourBoxDirective(){
	return {
		restrict: "E",
		template:
		'   <div layout="column" >' +
		'          <div class="rb-designer-form-layout_box">' +
		'		    <rb-designer-property-values-list ' +
		'			    ng-model="layout.grid.zero" rb-label="Datasource List" ' +
		'  				rb-values-collection="designer.COLLECTIONS.designerDatasourceCollection">' +
		'    		</rb-designer-property-values-list>' +
		'	    </div>' +
		'       <div layout="row" >' +
		'           <div class="rb-designer-form-layout_box">' +
		'			    <rb-designer-property-values-list ' +
		'				    ng-model="layout.grid.one" rb-label="Datasource List" ' +
		'   				rb-values-collection="designer.COLLECTIONS.designerDatasourceCollection">' +
		'	    		</rb-designer-property-values-list>' +
		'		    </div>' +
		'          <div class="rb-designer-form-layout_box">' +
		'	    		<rb-designer-property-values-list ' +
		'		    		ng-model="layout.grid.two" rb-label="Datasource List" ' +
		'			    	rb-values-collection="designer.COLLECTIONS.designerDatasourceCollection">' +
		'		    	</rb-designer-property-values-list>' +
		'		    </div>' +
		'       </div> ' +
		'       <div layout="row" >' +
		'           <div class="rb-designer-form-layout_box">' +
		'			    <rb-designer-property-values-list ' +
		'				    ng-model="layout.grid.three" rb-label="Datasource List" ' +
		'   				rb-values-collection="designer.COLLECTIONS.designerDatasourceCollection">' +
		'	    		</rb-designer-property-values-list>' +
		'		    </div>' +
		'          <div class="rb-designer-form-layout_box">' +
		'	    		<rb-designer-property-values-list ' +
		'		    		ng-model="layout.grid.four" rb-label="Datasource List" ' +
		'			    	rb-values-collection="designer.COLLECTIONS.designerDatasourceCollection">' +
		'		    	</rb-designer-property-values-list>' +
		'		    </div>' +
		'       </div> ' +
		'    </div> ',
		replace: true,
	}
}
$$$RedButtonDesignerFormLayoutEditorOneFourBoxDirective.$inject = [];