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
    var vm = this;
    vm.session = {};

    this.login = function() {
      $http.post('#', this.session)
           .success(function() {
             alert('success!');
             vm.session = {};
             $window.location.href = '/#/home';
           })
           .error(function() {
             alert('fail!');
             vm.session = {};
             $window.location.href = '/#/';
           });
    };
  };
})();
