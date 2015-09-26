(function(){
  var app = angular.module('app', ['ngRoute']);

  app.controller('SimpleController', function() {

  });

  app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'SimpleController',
        templateUrl: './source/templates/welcome.html',
      })
      .when('/home', {
        controller: 'SimpleController',
        templateUrl: './source/templates/home.html',
      })
      .otherwise({redirectTo: '/' });
  });
})();
