/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

	'use strict';

	angular.module('rbApp', [
		'ngCookies'
		,'ngStorage'
		,'ngMaterial'
		,'ngMdIcons'
		,'ngMessages'
		,'ngRoute'
		,'ngSanitize'
		,'redButton'
		,'redButtonDesigner'
		,'rbAppControllers'

		,'agat.controls.gantt'
		,'services.common.module'
	])
		.config($$$rbAppConfig)
		.run($$$rbAppRun);

	function $$$rbAppConfig( $logProvider, $routeProvider, $locationProvider, $mdThemingProvider, $mdDateLocaleProvider, $localStorageProvider, SITE_MAP, siteProvider) {

		$logProvider.debugEnabled(true);

		$locationProvider.hashPrefix('');

		siteProvider.setSiteMap( SITE_MAP );

		_.each(SITE_MAP.sections, function( __map_section ){
			_.each(__map_section.pages, function ( __map_page ) {
				let ___path = ( SITE_MAP.path ? SITE_MAP.path + '/' : '' ) + ( __map_section.path ? __map_section.path + '/' : '' );
				$routeProvider.when(
					__map_page.route,
					{
						template: __map_page.template,
						controller: __map_page.controller
					}
				);
			} );
		});

		$routeProvider.when(
			"/model/:model_name/app/:app_name/form/:form_name*",
			{
				template: function ( urlattr ) {
					return '<div id="APPLICATION___FORM___CONTAINER___ID"></div>';
				},
				controller: "RedButtonApplicationFormCtrl",
				reloadOnSearch: true
			}
		);

		$routeProvider.when(
			//"/app/:app_name/form/:form_name*",
			"/model/:model_name",
			{
				template: function ( urlattr ) {
					return '<div id="APPLICATION___FORM___CONTAINER___ID"></div>';
				},
				controller: "RedButtonApplicationFormCtrl",
				reloadOnSearch: true
			}
		);

		let __home_page = _.chain( SITE_MAP.sections )
			.pluck('pages')
			.flatten()
			.findWhere( { id: SITE_MAP.home.page } )
			.value();

		if(typeof __home_page !== 'undefined'){
			$routeProvider.otherwise( { redirectTo: __home_page.route } );
		}

		//$locationProvider.html5Mode(true);

		$mdThemingProvider.definePalette('amazingPaletteName', {
			'50': 'ffebee',
			'100': 'ffcdd2',
			'200': 'ef9a9a',
			'300': 'e57373',
			'400': 'ef5350',
			'500': 'f44336',
			'600': 'e53935',
			'700': 'd32f2f',
			'800': 'c62828',
			'900': 'b71c1c',
			'A100': 'ff8a80',
			'A200': 'ff5252',
			'A400': 'ff1744',
			'A700': 'd50000',
			'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
		                                        // on this palette should be dark or light

			'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
				'200', '300', '400', 'A100'],
			'contrastLightColors': undefined    // could also specify this if default was 'dark'
		});

		$mdThemingProvider.theme('default')
			.primaryPalette('amazingPaletteName');

		// $mdThemingProvider.theme( 'default' );
		// .dark();
		// .primaryPalette('blue')
		// .accentPalette('orange')
		// .warnPalette('red');

		$mdDateLocaleProvider.firstDayOfWeek = 1;
		$mdDateLocaleProvider.parseDate = function(dateString) {
			let m = moment(dateString, 'L', true);
			return m.isValid() ? m.toDate() : new Date(NaN);
		};
		$mdDateLocaleProvider.formatDate = function(date) {
			let m = moment(date);
			return m.isValid() ?  m.format('L') : '';
		};

	};
	$$$rbAppConfig.$inject = [ '$logProvider', '$routeProvider', '$locationProvider', '$mdThemingProvider', '$mdDateLocaleProvider', '$localStorageProvider', 'SITE_MAP', 'siteProvider'];

	function $$$rbAppRun($rootScope, $localStorage, $log, $mdDialog,  SITE_MAP, user, rbCore, site, $route, $location) {
		console.log("*** app.run");

		window.moment = moment;

		moment.locale('ru');
		//*moment.tz.setDefault("Europe/Moscow");

		$rootScope.rbCore = rbCore;

		/**
		 * @type {null}
		 */
		let modelName = null;
		if( $localStorage["RB_CURRENT_MODEL"] ){
			modelName = $localStorage["RB_CURRENT_MODEL"];
			if( !modelName ){
				modelName = "AGAT";
			}
		}

		rbCore
			.start()
			.initModel( modelName )
			.loadModel();

		$rootScope.SITE_MAP = SITE_MAP;

		$rootScope.user = user;

		$rootScope.$watch('user.changed', function(newValue, oldValue){
			if($rootScope.user.logged){
				$rootScope.$broadcast('user_login');
			}else{
				$rootScope.$broadcast('user_logout');
			}
		});

	};
	$$$rbAppRun.$inject = ['$rootScope', '$localStorage', '$log', '$mdDialog', 'SITE_MAP', 'user',  'rbCore', 'site', '$route', '$location'];

	// function $$$ApplicationCtrl($rootScope, $scope, $route, $routeParams, $location, $mdDialog, SITE_MAP){
	// 	$scope.user.doAnonymousSession();
	//
	// 	$scope.doLoginLogout = function(ev){
	// 		if($scope.user.logged){
	// 			$scope.user.doLogout();
	// 		}else{
	// 			$scope.loginDialog(ev);
	// 		}
	// 	};
	//
	// 	$scope.loginDialog = function(ev){
	// 		$mdDialog.show({
	// 			controller: "DialogController",
	// 			templateUrl: 'tmpl/common/login.html',
	// 			parent: angular.element(document.body),
	// 			targetEvent: ev
	// 		})
	// 			.then(function(answer) {
	// 				$scope.user.doLogin();
	// 			}, function() {
	//
	// 			});
	// 	};
	//
	// 	$rootScope.$on("$routeChangeSuccess", function(event, current , previous ) {
	//
	// 		let __map_page = _.chain(SITE_MAP.sections)
	// 			.pluck('pages')
	// 			.flatten()
	// 			.findWhere({route: $location.$$path})
	// 			.value();
	//
	// 		if($scope.rbModel) {
	// 			if (typeof __map_page !== 'undefined') {
	// 				$scope.rbModel.topmost_page_name = __map_page.title;
	// 			} else {
	// 				$scope.rbModel.topmost_page_name = "#";
	// 			}
	// 		}
	// 	});
	// }
	// $$$ApplicationCtrl.$inject = ['$rootScope', '$scope', '$route', '$routeParams', '$location', '$mdDialog', 'SITE_MAP'];

// angular.module('rbAppControllers', [])
// 	.controller('ApplicationCtrl', $$$ApplicationCtrl);
