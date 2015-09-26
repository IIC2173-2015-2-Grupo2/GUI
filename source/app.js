(function(){
  var app = angular.module('app', ['ngRoute', 'users']);

  app.controller('SimpleController', function() {

  });

  app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'SimpleController',
        templateUrl: 'source/templates/welcome.html',
      })
      .when('/home', {
        controller: 'SimpleController',
        templateUrl: 'source/templates/home.html',
      })
      .otherwise({redirectTo: '/' });
  });

  app.directive('appNavbar', appNavbar)

  function appNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'source/templates/shared/navbar.html',
      controller: navbarController,
      controllerAs: 'navbarCtrl'
    };

    return directive;
  };

  function navbarController($http, $window) {
    this.session = {};

    this.login = function() {
      console.log('hola');
      $http.post('#', this.session)
           .success(function() {
             alert('success!');
           })
           .error(function() {
             alert('fail!');
             $window.location.href = '/#/home';
           });
    };
  };
})();
