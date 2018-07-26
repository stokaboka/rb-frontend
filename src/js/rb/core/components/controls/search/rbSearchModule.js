/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */


angular.module('rb.controls.search')
	.directive('rbSearch', $$$RbSearchDirective);

function $$$RbSearchDirective(rbCore){
	return {
		restrict: "EA",
		template: '<div ng-show="service.filter_enabled">' +
		'               <md-button class="md-raised " ng-click="search()">' +
		'                   <ng-md-icon icon="find_in_page">' +
		'                   </ng-md-icon>Найти' +
		'               </md-button>' +
		'</div>',
		replace: true,

		scope: {
			rowSource: '@'
		},

		link: function( $scope ) {
			$scope.service = null;

			$scope.$watch('rowSource', function( newValue ){
				if( newValue )
					$scope.service = rbCore.model.get_registered_service( newValue, {scope: $scope});
			});

			$scope.search = function(){
				if($scope.service){
					$scope.service["search_by_id"] = null;
					rbCore.model.search($scope.service);
				}
			};

		}
	};
}
$$$RbSearchDirective.$inject = ['rbCore'];

