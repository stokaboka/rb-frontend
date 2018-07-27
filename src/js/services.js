/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

"use strict";

import $RbSiteMap from './rb/core/rbSiteMap';

let $$$SiteMapConstant =
	{
		home: { section: 'WELCOME', page: 'HOME' },
		path: 'partials',
		sections:
			[
				{
					id: "WELCOME", type: 'section', title: 'Rb', tooltip: 'red Button', menu: true, toolbar: true, home: false, path: '',
					style: {"background-color": "red"},
					class: 'md-accent md-raised',
					pages: [
						{
							id: 'HOME',
							title: 'Rb',
							tooltip: '',
							type: 'page',
							route: '/home',
							//templateUrl: 'home.html',
							template:'<rb-home></rb-home>',
							controller: 'HomeCtrl',
							menu: true,
							toolbar: true,
							home: false,
							style: {"background-color": "red"},
							class: 'md-accent md-raised',
						},
						{
							id: 'ABOUT',
							title: 'О нас',
							tooltip: '',
							type: 'page',
							route: '/about',
							//templateUrl: 'about.html',
							template:'<rb-about></rb-about>',
							controller: 'AboutCtrl',
							menu: true,
							toolbar: true,
							home: false,
							style: {},
							class: 'md-primary md-raised'
						},
						{
							id: 'Designer',
							title: 'Designer',
							tooltip: '',
							type: 'page',
							route: '/designer',
							//templateUrl: 'designer.html',
							template: '<rb-designer-panel></rb-designer-panel>',
							controller: 'RedButtonDesignerController',
							menu: false,
							toolbar: true,
							home: false,
							style: {},
							class: 'md-primary md-raised'
						}
					]
				}

			]
	};

let $$$SiteProvider = function () {
	let __site_map = null;
	let __site_map_object = null;
	let __home_page = null;

	this.setSiteMap = function ( __options ) {
		__site_map_object = __options;

		__site_map = new $RbSiteMap( __site_map_object );

		let __home_page = _.chain( __site_map.sections )
			.pluck( 'pages' )
			.flatten()
			.findWhere( { id: __site_map.home.page } )
			.value();

	};

	this.$get = [function () {
		return {
			map: __site_map,
			home: __home_page
		};
	}];
};

function $$$UsersService( $http, $q, $cookieStore )
{

	let __url = 'api';

	let resetStatus = function( __msg, __ok, __err ){
		service.status.success = __ok;
		service.status.error = __err;
		if(__msg)
			service.status.message = __msg;
		else
			service.status.message = "Обработка данных...";
	};

	let __auth_http = function(__method, __remote_handler, __data, __headers){
		let deffered = $q.defer();
		if(angular.isUndefined(__data))__data = null;
		if(angular.isUndefined(__headers))__headers = null;
		$http({
			method: __method,
			url: __url+__remote_handler,
			data: __data,
			headers: __headers
			//transformRequest: function(data) { return data; }
		}).then(function(data, status, headers, config) {
			deffered.resolve(data, status, headers, config);
		}).catch(function(data, status, headers, config) {
			deffered.reject(data, status, headers, config);
		});
		return deffered.promise;
	};

	let setSession = function( __data, __logged, __anonymous ){
		service.password = '';
		service.anonymous = __anonymous;
		service.logged = __logged;
		service.changed++;
		let data = __data.data;
		if(data['SID']){
			service.SID = data['SID'];
			$cookieStore.put('SID', service.SID);
		}else{
			service.SID = '';
			$cookieStore.remove('SID');
		}

		if(data['group']){
			service.group = data['group'];
		}else{
			service.group = '';
		}

		if(__logged){
			service.buttonPrompt = 'Logout';
			service.displayLogin = service.login;
		}else {
			service.buttonPrompt = 'Login';
			service.displayLogin = 'Guest';
		}

		switch(service.group){
			case 'admin' :
				service.groups.read = true;
				service.groups.write = true;
				break;

			default:
				service.groups.read = false;
				service.groups.write = false;
		}
	};

	let service = {

		status:{
			success: false,
			error: false,
			message: ''
		},

		login: '',
		password: '',
		nick: '',
		f: '',
		i: '',
		o: '',
		sq: '',
		sa: '',
		roles: '',

		displayLogin: 'Guest',

		logged: false,
		anonymous: false,

		SID: '',
		group: '',
		changed: 0,

		groups: {
			read: false,
			write: false
		},

		buttonPrompt: 'Войти',

		doLogin: function(){

			// service.login = $('#Login').val();

			// let password = $("#Password").val();
			// $('#Password').val('');

			let __data = $.param({Login: service.login, Password: service.password});
			let __headers = {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'};
			service.password = '';

			let __login = __auth_http('POST', '/auth/signIn.json', __data, __headers);

			__login.then(
				function(__data, __status){
					if(__data.data['Result'] === 'OK') {
						setSession(__data, true, false);
						resetStatus('Login', true, false);
					}else{
						setSession(__data, false, false);
						resetStatus('Access denied', false, false);
						service.doAnonymousSession();
					}
				},
				function(__data, __status){
					setSession(__data, false, false);
					resetStatus('Network error...', false, false);
				}
			);
		},

		doLogout: function(){

			let __data = $.param({Login: service.login, Password: ''});
			let __headers = {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'};

			let __logout = __auth_http('POST', "/auth/signOut.json", __data, __headers);

			__logout.then(
				function( __data, __status ){
					setSession( __data, false, false );
					resetStatus( 'Logout', true, false );
					service.doAnonymousSession();
				},
				function( __data, __status ){
					setSession(__data, false, false);
					resetStatus( 'Network error...', false, false );
				}
			);
		},

		doAnonymousSession: function(){
			let __anonymous = __auth_http('GET', "/auth/anonymousSession.json");
			__anonymous.then(
				function( __data, __status ){
					setSession( __data, false, true );
					resetStatus( 'Anonymous login', true, false );
				},
				function(__data, __status){
					setSession(__data, false, false);
					resetStatus( 'Network error...', false, false );
				}
			);
		}
	};

	return service;
}

$$$UsersService.$inject = ['$http', '$q', '$cookieStore'];

function $$$UtilsService()
{
	let service = {

		digitsOnly: /[1234567890]/g,
		floatOnly: /[0-9\.]/g,
		alphaOnly: /[A-Za-z]/g,
		alphaDigitsOnly: /[A-Z,a-z,1234567890,_]/g,

		restrictCharacters: function( myField, e, restrictionType ) {
			if (!e){
				e = window.event;
			}
			let code = '';
			if (e.keyCode){
				code = e.keyCode;
			}else{
				if (e.which){
					code = e.which;
				}
			}
			let character = String.fromCharCode( code );
			// if they pressed esc... remove focus from field...
			if ( code === 27 ) {
				myField.blur();
				return false;
			}
			// ignore if they are press other keys
			// strange because code: 39 is the down key AND ' key...
			// and DEL also equals .
			if (!e.ctrlKey && code!==9 && code!==8 && code!==36 && code!==37 && code!==38 && (code!==39 || (code===39 && character==="'")) && code!==40) {
				if (character.match(restrictionType)) {
					return true;
				} else {
					return false;
				}
			}
		},

		parseString: function(str, expr){
			let _arr = [];
			let aa;
			expr.lastIndex=0;
			while ((aa = expr.exec(str)) != null){
				if(aa.length > 1){
					_arr = _arr.concat(aa[0]);
				}else{
					_arr = _arr.concat(aa);
				}
			}
			return _arr;
		},

		/*shuffle(arr, deep ) - перемешать элементы массива случайным образом

		 deep - необязательный аргумент логического типа, указывающий на то,
		 нужно ли рекурсивно обрабатывать вложенные массивы;
		 по умолчанию false (не обрабатывать)
		 */
		shuffleArray: function(arr, b){
			let i = arr.length, j, t;
			while( i )
			{
				j = Math.floor( ( i-- ) * Math.random() );
				//t = b && typeof arr[i].shuffle!=='undefined' ? this[i].shuffle() : this[i];
				if(b && arr[i] instanceof Array){
					service.shuffleArray(arr[i], b);
				}
				t = arr[i];
				arr[i] = arr[j];
				arr[j] = t;
			}

			return arr;
		},

		initToolType: function(){
			//$("[data-toggle=tooltip]").tooltip(__tooltype_options);
		},

		isValidDate: function(d) {
			if ( Object.prototype.toString.call(d) !== "[object Date]" )
				return false;
			return !isNaN(d.getTime());
		}

	};

	return service
}
$$$UtilsService.$inject = [];

angular.module('services.common.module', [])
	.constant("SITE_MAP", $$$SiteMapConstant)
	.service('user', $$$UsersService)
	.service('utils', $$$UtilsService)
	.provider("site", $$$SiteProvider);

