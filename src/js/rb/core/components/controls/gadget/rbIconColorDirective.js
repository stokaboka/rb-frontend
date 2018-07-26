"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

angular.module('rb.controls')
	.directive('rbIconColor', $$$RbIconColorDirective);

function $$$RbIconColorDirective()
{
	return {
		restrict: "EA",
		template: '<ng-md-icon icon="{{icon}}" size="{{rbIconSize}}" ng-style="style"><md-tooltip md-direction="right" ng-show="showToolTip">{{rbTooltip}}</md-tooltip></ng-md-icon>',
		replace: true,

		scope: {
			rbIconColorPair: '@',
			rbSeparator: '@',
			rbIconSize: '='
		},

		link: function (scope) {
			scope.icon = null;
			scope.style = {fill: "red"};
			scope.showToolTip = false;

			scope.rbTooltip = '-';

			scope.$watch('rbIconColorPair', function(newVal, oldVal){
				if( newVal ) {
					let ____a = newVal.split(scope.rbSeparator);
					if(____a.length > 0)scope.icon = ____a[0];
					if(____a.length > 1) {
						let __color = ____a[1];
						if(__color) {
							scope.style.fill = __color;
						}
					}
					if(____a.length > 2) {
						scope.showToolTip = true;
						scope.rbTooltip = ____a[2];
					}
				}
				if(!scope.rbTooltip){
					scope.rbTooltip = '-';
				}
			});

			if( typeof scope.rbIconSize === 'undefined' || scope.rbIconSize === null ){
				scope.rbIconSize = "24";
			}
			if (typeof scope.rbSeparator === 'undefined' || scope.rbSeparator === null ){
				scope.rbSeparator = ":";
			}

		}
	}
}
$$$RbIconColorDirective.$inject = [];