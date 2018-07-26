"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

import $RbModelBuilderModel from '../rbModelBuilderModel';

angular.module('rb.designer')
	.controller('rbDesignerPropertiesEditorController', $$$RedButtonDesignerPropertiesEditorController);

function $$$RedButtonDesignerPropertiesEditorController(scope, $mdDialog, RedButtonDesignerService)
{

	scope.designer = RedButtonDesignerService;
	scope.model = this.model;
	scope.datasource = this.datasource;
	scope.column = this.column;

	if (typeof scope.model.getDesignerTitle === "function")
	{
		scope.title = scope.model.getDesignerTitle();
	} else {
		scope.title = "-";
	}

	scope.properties =  scope.designer.STRUCTURE[scope.model.type].editor.properties;

	scope.backup = {};
	for(var ___i=0; ___i < scope.properties.length; ___i++)
	{
		scope.backup[scope.properties[___i].name] = scope.model[scope.properties[___i].name];
	}

	scope.hide = function()
	{

		var __changed = false;
		for(var ___i=0; ___i < scope.properties.length; ___i++){
			if(scope.model[scope.properties[___i].name] != scope.backup[scope.properties[___i].name]){
				__changed = true;
				break;
			}
		}

		if(__changed){
			scope.designer.model.setStatus($RbModelBuilderModel.prototype.STATUS.EDITED);
		}

		$mdDialog.hide();
	};

	scope.cancel = function()
	{
		for(var ___i=0; ___i < scope.properties.length; ___i++){
			scope.model[scope.properties[___i].name] = scope.backup[scope.properties[___i].name];
		}
		$mdDialog.cancel();
	};
}
$$$RedButtonDesignerPropertiesEditorController.$inject = ["$scope", "$mdDialog", "RedButtonDesignerService"];