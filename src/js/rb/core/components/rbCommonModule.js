"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */


	angular.module('rb.common')
		.directive('rbAbout', $$$RbAboutDirective)
		.directive('rbHome', $$$RbHomeDirective);

	function $$$RbAboutDirective()
	{
		return {
			restrict: "EA",
			template:	'<div>\
							<h3>Red Button</h3>\
							<h4>разработано с использованием:</h4>\
							\
							<p style="font-size: 14px;">\
								<a href="https://www.jetbrains.com/">JetBrains</a><span class="vertical-text-line">|</span>\
								<a href="https://www.jetbrains.com/webstorm/">WebStorm</a><span class="vertical-text-line">|</span>\
								<a href="https://nodejs.org">Node.js</a><span class="vertical-text-line">|</span>\
								<a href="https://github.com/tshemsedinov/impress">Impress Application Server</a><span class="vertical-text-line">|</span>\
								<a href="https://angularjs.org/">AngularJS</a><span class="vertical-text-line">|</span>\
								<a href="https://material.angularjs.org/">Angular Material</a><span class="vertical-text-line">|</span>\
								<a href="http://getbootstrap.com/">Bootstrap</a><span class="vertical-text-line">|</span>\
								<a href="https://jquery.com/">JQuery</a><span class="vertical-text-line">|</span>\
								<a href="http://momentjs.com//">Moment.js</a><span class="vertical-text-line">|</span>\
								<a href="http://underscorejs.org/">Underscore.js</a>\
							</p>\
							\
							<div layout="column">\
								<div layout="row" layout-align="start center">\
									<a href="https://www.jetbrains.com/"><img style="margin: 20px;" ng-src={{images.JetBrains}} width="240"></a>\
									<a href="https://www.jetbrains.com/webstorm/"><img style="margin: 20px;" ng-src={{images.WebStorm}} width="240"></a>\
									<a href="https://nodejs.org">\
										<div style="width: 240px; margin: 20px; padding: 30px; background-color: #333;">\
											<img ng-src={{images.nodejs}} height="108px;">\
										</div>\
									</a>\
									<a href="https://github.com/tshemsedinov/impress"><img ng-src={{images.impress}} width="240"> </a>\
								</div>\
								<div layout="row" layout-align="start center">\
									<a href="https://angularjs.org/"><img style="margin: 20px;" ng-src={{images.AngularJS}} width="240"></a>\
									<a href="http://getbootstrap.com/"><img ng-src={{images.bootstrap}} style="margin: 20px;" width="120"></a>\
									<a href="https://jquery.com/"><img ng-src={{images.jquery}} width="240"></a>\
									<a href="http://underscorejs.org/"><img ng-src={{images.underscore}} width="240"></a>\
								</div>\
							</div>\
							\
						</div>',
			replace: true,

			link: function( $scope )
			{
				$scope.assetsPath = "../assets/images/";
				$scope.images = {
					"underscore": $scope.assetsPath + "underscore.png",
					"jquery": $scope.assetsPath + "jquery-mark-light.gif",
					"bootstrap": $scope.assetsPath + "bootstrap-solid.svg",
					"AngularJS": $scope.assetsPath + "AngularJS-large.png",
					"impress": $scope.assetsPath +"impress_logo.png",
					"nodejs": $scope.assetsPath +"nodejs-new-white-pantone.png",
					"JetBrains": $scope.assetsPath +"jetbrains_logos/logo_JetBrains_4.png",
					"WebStorm": $scope.assetsPath +"webstorm_logos/logo_WebStorm.png"

				};
			}
		};
	}
	$$$RbAboutDirective.$inject = [];

	function $$$RbHomeDirective( SITE_MAP, rbCore )
	{
		return {
			restrict: "EA",
			template:	'<div layout="column" layout-padding layout-wrap ng-cloak>'+
			'<div layout="column"  layout-align="left top" ng-repeat="application in rbCore.model.applications | filter: { enabled: true }">'+
			'<div >'+
			'<span class="rb-home-title">{{application.title}}</span>'+
			'<md-tooltip ng-show="application.description">{{application.description}}</md-tooltip>'+
			'</div>'+
			'<div layout="row">'+
			'<div ng-repeat="form in application.forms | filter: { enabled: true }">'+
			'<md-button class="md-raised md-primary" href="#{{form.path}}" aria-label="form.title" >'+
			'{{form.title}}'+
			'<md-tooltip ng-show="form.description">{{form.description}}</md-tooltip>'+
			'</md-button>'+
			'</div>'+
			'</div>'+
			'</div>'+
			'<div layout="column"  layout-align="left top" ng-repeat="map_section in SITE_MAP.sections | filter: { home: true }">'+
			'<div layout="row">'+
			'<div layout="column" layout-align="left top">'+
			'<div layout="column" >'+
			'<h3 class="md-toolbar-tools">{{map_section.tooltip}}</h3>'+
			'</div>'+
			'<div layout="row">'+
			'<md-button ng-repeat="map_page in map_section.pages | filter: { home: true }" class="md-raised md-primary"  ng-style="map_page.style" href="#{{map_page.route}}">'+
			'{{map_page.title}}'+
			'<md-tooltip ng-show="map_page.tooltip">{{map_page.tooltip}}</md-tooltip>'+
			'</md-button>'+
			'</div>'+
			'</div>'+
			'</div>'+
			'<md-divider></md-divider>'+
			'</div>'+
			'</div>',

			replace: true,

			link: function($scope, $elem, $attrs)
			{

				$scope.SITE_MAP = SITE_MAP;
				$scope.rbCore = rbCore;

				if( $scope.application && !$scope.application.description){
					$scope.application.description = "-";
				}

			}
		}
	}
	$$$RbHomeDirective.$inject = [ 'SITE_MAP', 'rbCore' ];

