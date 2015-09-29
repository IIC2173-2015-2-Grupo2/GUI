(function() {
  angular.module('app').config(router);

  function router($routeProvider) {
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
  }
})();
