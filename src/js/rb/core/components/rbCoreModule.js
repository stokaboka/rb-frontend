/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

"use strict";

import $RbCore from '../rbCore';

angular.module('rbAppControllers', [])
	.controller('ApplicationCtrl', $$$ApplicationCtrl);

angular.module('rb.core')
	.config($$$RbCoreConfig)
	.run($$$RbCoreRun)
	.service('rbCore', $$$RbCoreService)
	.controller('DialogController', $$$DialogController)
	.controller('AboutCtrl', $$$AboutController)
	.controller('HomeCtrl', $$$HomeCtrlController)

	// Dynamics applications
	.directive('topmenuNavbar', $$$RbTopMenuNavBarDirective)
	.controller('RedButtonApplicationFormCtrl', $$$RedButtonApplicationFormController)

;

function $$$RbCoreConfig() {
	console.log("Rb configured.");
}
$$$RbCoreConfig.$inject = [];

function $$$RbCoreRun() {
	console.log("Rb run.");
}
$$$RbCoreRun.$inject = [];

function $$$RbCoreService($rootScope, $location, $http, $q, $cookies, $localStorage, $sessionStorage, $mdDialog, $log, $document){
	let rbCore = new $RbCore(
		{
			ngOptions: {
				$rootScope: $rootScope,
				$http: $http,
				$q: $q,
				$cookies: $cookies,
				$localStorage: $localStorage,
				$sessionStorage: $sessionStorage,
				$mdDialog: $mdDialog,
				$location: $location,
				$log: $log,
				$document: $document
			}
		});

	window.$$rbCore = rbCore;
	$rootScope.rbCore = rbCore;
	return rbCore;
}
$$$RbCoreService.$inject = ['$rootScope', '$location', '$http', '$q', '$cookies' , '$localStorage', '$sessionStorage', '$mdDialog', '$log', '$document'];

function $$$DialogController($scope, $mdDialog, user) {
	$scope.user = user;
	$scope.hide = function() {
		$mdDialog.hide();
	};
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
}
$$$DialogController.$inject = ['$scope', '$mdDialog', 'user'];

function $$$AboutController($scope)
{
	if( $scope.rbCore.model ) {
		$scope.rbCore.model.form = null;
	}
}
$$$AboutController.$inject = ["$scope"];

function $$$HomeCtrlController($scope)
{
	if( $scope.rbCore.model ) {
		$scope.rbCore.model.form = null;
	}
}
$$$HomeCtrlController.$inject = ["$scope"];

/**
 * applications forms controller
 *
 * @param $scope
 * @param $routeParams
 * @param $mdDialog
 * @param $location
 * @param $compile
 * @param $timeout
 * @param rbCore
 */
function $$$RedButtonApplicationFormController($scope, $routeParams, $mdDialog, $location, $compile, $timeout, rbCore) {

	/**
	 *  обработка редактирования записей
	 *  старый тодо, оставлен для примера
	 */
	// $scope.edit_row = function( __row_index ){
	// 	var __service = $scope.rbCore.model.get_registered_service('v_document_or_tasks');
	// 	if(__service) {
	// 		var __srv_id = __service.getColumnValue("d_id");
	// 		if (__srv_id) {
	// 			//$location.search({"document_id": __srv_id}).path($scope.ROUTES.DOCUMENT);
	// 			$location.search({"document_id": __srv_id}).path('/document');
	// 		} else {
	// 			console.warn('DocumentOrTaskCtrl: column [d_id] of datasource [v_document_or_tasks] expected');
	// 		}
	// 	}
	// };

	/**
	 * forceLoadModel
	 * true - always load selected model
	 * false - no reload when select current model
	 * @type {boolean}
	 */
	let forceLoadModel = false;

	if( forceLoadModel ){
		/**
		 * load and initialize the model with id = $routeParams.model_name
		 */
		rbCore
			.initModel($routeParams.model_name)
			.loadModel();
	}else {

		if (rbCore.model && $routeParams.model_name === rbCore.model.id) {

			// if( forceLoadModel ){
			// 	rbCore
			// 		.initModel( $routeParams.model_name )
			// 		.loadModel();
			// }else {
			/**
			 * open the application form  in the current model
			 */
			rbCore.model.initApplicationForm(
				{
					application_name: $routeParams.app_name,
					form_name: $routeParams.form_name,
					scope: $scope,
					compile: $compile,
					timeout: $timeout,
					routeParams: $routeParams
				},
				"WAIT"
			);
			//}

		} else {
			/**
			 * load and initialize the model with id = $routeParams.model_name
			 */
			rbCore
				.initModel($routeParams.model_name)
				.loadModel();
		}
	}

}
$$$RedButtonApplicationFormController.$inject = ["$scope", "$routeParams", "$mdDialog", "$location", "$compile", "$timeout", "rbCore"];


function $$$RbTopMenuNavBarDirective( $rootScope, utils, rbCore )
{
	return {
		restrict: "E",
		template: '<md-toolbar id="RB_TOP_NAVBAR">\
		                    <div class="md-toolbar-tools">\
		                    <md-progress-circular md-mode="indeterminate" class="rb-with-stroke" rb-visible="rbCore.loader.busy"  md-diameter="20"></md-progress-circular>\
		                        <md-menu-bar >\
		                            <md-menu ng-repeat="map_section in SITE_MAP.sections | filter: { toolbar: true }">\
			                            <md-button class="md-raised md-primary" ng-click="$mdMenu.open()">\
			                                {{map_section.title}}\
	                                    </md-button>\
	                                    <md-menu-content>\
											<md-menu-item ng-repeat="model in rbCore.models | filter: { toolbar: true }">\
		                                        <md-button href="#{{model.route}}">\
	                                                    <span><strong>{{model.title}}</strong> {{model.description}}</span>\
                                                </md-button>\
                                            </md-menu-item>\
	                                        <md-menu-item ng-repeat="map_page in map_section.pages | filter: { toolbar: true }">\
		                                        <md-button href="#{{map_page.route}}" >\
		                                            {{map_page.title}}\
	                                            </md-button>\
	                                        </md-menu-item>\
	                                    </md-menu-content>\
	                                </md-menu>\
									\
		                            <md-menu ng-repeat="application in rbCore.model.applications | filter: { enabled: true }">\
			                            <md-button class="md-raised md-primary" ng-click="$mdMenu.open()">\
			                                {{application.title}}\
	                                    </md-button>\
	                                    <md-menu-content>\
	                                        <md-menu-item ng-repeat="form in application.forms | filter: { enabled: true }">\
		                                        <md-button href="#{{form.path}}" aria-label="form.title" >\
		                                            {{form.title}}\
	                                            </md-button>\
	                                        </md-menu-item>\
	                                    </md-menu-content>\
	                                </md-menu>\
									\
	                            </md-menu-bar>\
								\
	                            <span flex></span>\
								\
	                            <span class="glyphicon glyphicon-user" ng-show="user.logged"></span>\
		                        <span id="displayLoginID" style="margin-left: 5px; margin-right: 5px;">{{user.displayLogin}}<md-tooltip>Никнейм, имя пользователя</md-tooltip></span>\
								\
	                            <md-button class="md-raised" aria-label=""  ng-click="doLoginLogout($event)">{{user.buttonPrompt}}</md-button>\
								\
	                        </div>\
	                    </md-toolbar>',

		replace: true,

		link: function($scope) {

			$scope.rbCore = rbCore;

			utils.initToolType();

			$scope.$on('user_login', function() {
			});

			$scope.$on('user_logout', function() {
			});

		}
	};
}
$$$RbTopMenuNavBarDirective.$inject = [ '$rootScope', 'utils', 'rbCore' ];


function $$$ApplicationCtrl($rootScope, $scope, $route, $routeParams, $location, $mdDialog, SITE_MAP){
	$scope.user.doAnonymousSession();

	$scope.doLoginLogout = function(ev){
		if($scope.user.logged){
			$scope.user.doLogout();
		}else{
			$scope.loginDialog(ev);
		}
	};

	$scope.loginDialog = function(ev){
		$mdDialog.show({
			controller: "DialogController",
			// templateUrl: 'tmpl/common/login.html',
			template: '<md-dialog aria-label="Login" class="dialogdemoBasicUsage" ng-cloak>\n' +
			'\n' +
			'    <form id="user_login_form" name="user_login_form" role="form">\n' +
			'\n' +
			'        <md-toolbar>\n' +
			'            <div class="md-toolbar-tools">\n' +
			'                <h2>Login</h2>\n' +
			'                <span flex></span>\n' +
			'                <ng-md-icon icon="close" style="cursor: pointer;" ng-click="cancel()"></ng-md-icon>\n' +
			'            </div>\n' +
			'        </md-toolbar>\n' +
			'\n' +
			'        <md-dialog-content>\n' +
			'            <div class="md-dialog-content">\n' +
			'\n' +
			'                <md-input-container class="md-block">\n' +
			'                    <label>login</label>\n' +
			'                    <input id="Login" name="Login"  ng-model="user.login" required ng-minlength="1" ng-maxlength="30">\n' +
			'\n' +
			'                    <div ng-messages="user_login_form.Login.$error" role="alert" multiple>\n' +
			'                        <div ng-message="required" class="my-message">You must specify a username/login</div>\n' +
			'                        <div ng-message="maxlength" class="my-message">Too short username/login</div>\n' +
			'                        <div ng-message="minlength" class="my-message">Username/login is too long</div>\n' +
			'                    </div>\n' +
			'                </md-input-container>\n' +
			'\n' +
			'                <md-input-container class="md-block">\n' +
			'                    <label>password</label>\n' +
			'                    <input id="Password" name="Password" ng-model="user.password" type="password" required ng-minlength="1" ng-maxlength="30">\n' +
			'\n' +
			'                    <div ng-messages="user_login_form.Login.$error" role="alert" multiple>\n' +
			'                        <div ng-message="required" class="my-message">You must specify a user password</div>\n' +
			'                        <div ng-message="minlength" class="my-message">Too short password</div>\n' +
			'                        <div ng-message="maxlength" class="my-message">Password is too long</div>\n' +
			'                    </div>\n' +
			'                </md-input-container>\n' +
			'\n' +
			'            </div>\n' +
			'        </md-dialog-content>\n' +
			'\n' +
			'        <md-dialog-actions layout="row">\n' +
			'            <span flex></span>\n' +
			'            <md-button class="md-raised md-primary" aria-label="OK" type="submit" ng-click="hide()">{{user.buttonPrompt}}</md-button>\n' +
			'            <md-button class="md-raised" aria-label="Cancel" ng-click="cancel()" >Cancel</md-button>\n' +
			'        </md-dialog-actions>\n' +
			'\n' +
			'    </form>\n' +
			'\n' +
			'</md-dialog>\n',
			parent: angular.element(document.body),
			targetEvent: ev
		})
			.then(function(answer) {
				$scope.user.doLogin();
			}, function() {

			});
	};

	$rootScope.$on("$routeChangeSuccess", function(event, current , previous ) {

		let __map_page = _.chain(SITE_MAP.sections)
			.pluck('pages')
			.flatten()
			.findWhere({route: $location.$$path})
			.value();

		if($scope.rbModel) {
			if (typeof __map_page !== 'undefined') {
				$scope.rbModel.topmost_page_name = __map_page.title;
			} else {
				$scope.rbModel.topmost_page_name = "#";
			}
		}
	});
}
$$$ApplicationCtrl.$inject = ['$rootScope', '$scope', '$route', '$routeParams', '$location', '$mdDialog', 'SITE_MAP'];
