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
      .otherwise({redirectTo: '/' });
  }

  angular.module('app').run(authentication);

  function authentication($rootScope, $location, $sessionStorage) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      if (($location.path() !== '/' && $location.path() !== '') &&
           $sessionStorage.currentUser === undefined ) {
        $location.path('/');
        swal({title: 'You must log in to do this.',
              type: 'error',
              timer: 3500});
      }
    });
  }
})();
