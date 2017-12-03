'use strict';

/**
* @ngdoc overview
* @name angularChatApp
* @description
* # angularChatApp
*
* Main module of the application.
*/
angular.module('angularChatApp', [
	'ngAnimate',
	'ngCookies',
	'ngResource',
	'ngRoute',
	'ngSanitize',
	'ngTouch',
	'pubnub.angular.service'
]).config(function($routeProvider){
	$routeProvider
		.when('/main',{
			templateUrl: 'views/main.html',
			controller: 'MainCtrl'
		})
		.when('/join', {
			templateUrl: 'views/join.html',
			controller: 'JoinCtrl'
		})
		.otherwise({
			redirectTo: '/join'
		});
});
