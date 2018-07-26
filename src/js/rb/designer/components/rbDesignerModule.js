/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

/**
 RB Designer modules
 */

"use strict";

import $RbModelBuilder from '../rbModelBuilder';

angular.module('rb.designer', []);

angular.module('redButtonDesigner', ['rb.designer'])
	.run($$$RedButtonDesignerRun)
	.service('RedButtonDesignerService', $$$RedButtonDesignerService)
	.controller('RedButtonDesignerController', $$$RedButtonDesignerController);

function $$$RedButtonDesignerRun($rootScope, $location, $http, $q, $cookies, $localStorage, $sessionStorage, $mdDialog, $log) {}
$$$RedButtonDesignerRun.$inject = ['$rootScope', '$location', '$http', '$q', '$cookies' , '$localStorage', '$sessionStorage', '$mdDialog', '$log'];

function $$$RedButtonDesignerService($document, $rootScope, $location, $http, $q, $cookies, $localStorage, $sessionStorage, $mdDialog, $log, $timeout)
{
	let __options = {
		$rootScope: $rootScope,
		$http: $http,
		$q: $q,
		$cookies: $cookies,
		$localStorage: $localStorage,
		$sessionStorage: $sessionStorage,
		$mdDialog: $mdDialog,
		$location: $location,
		$log: $log,
		$document: $document,
		$timeout: $timeout
	};

	return new $RbModelBuilder(__options)
		.loadDatabases()
		.loadIndexModel();

}
$$$RedButtonDesignerService.$inject = ['$document','$rootScope', '$location', '$http', '$q', '$cookies' , '$localStorage', '$sessionStorage', '$mdDialog', '$log', '$timeout'];

function $$$RedButtonDesignerController($scope, $routeParams)
{
}
$$$RedButtonDesignerController.$inject = ['$scope', '$routeParams'];