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

  angular.module('app').run(authentication);
  
  function authentication($rootScope,$location,$sessionStorage){
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if ($location.path() != "/" && $sessionStorage.currentUser == null ) {
        $location.path( "/" );
        alert('No has iniciado sesión');
      }
    });
  }
})();
