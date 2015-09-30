(function() {
  angular.module('app').config(router);

  function router($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'appController',
        controllerAs: 'appCtrl',
        templateUrl: 'source/templates/welcome.html',
      })
      .when('/home', {
        controller: 'appController',
        controllerAs: 'appCtrl',
        templateUrl: 'source/templates/home.html',
      })
      .otherwise({redirectTo: '/' });
  }
})();
