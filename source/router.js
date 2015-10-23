(function() {
  angular.module('app').config(router);

  function router($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'appController',
        controllerAs: 'appCtrl',
        templateUrl: 'templates/welcome.html',
      })
      .when('/news', {
        controller: 'appController',
        controllerAs: 'appCtrl',
        templateUrl: 'templates/news/news.html',
      })
      .when('/user',{
        controller: 'userController',
        controllerAs: 'userCtrl',
        templateUrl: 'templates/user.html',
      })
      .otherwise({redirectTo: '/' });
  }

  angular.module('app').run(authentication);

  function authentication($rootScope, $location, $sessionStorage){
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if ($location.path() != '/' && $sessionStorage.currentUser == null ) {
        $location.path( '/' );
        swal({ title: "Debes iniciar sesión para realizar esto.",
               type: "error",
               timer: 3500});
      }
    });
  }
})();
