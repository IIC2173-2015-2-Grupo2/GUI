(function(){
  angular.module('app', ['ngRoute', 'ngStorage', 'users', 'news', 'ngTagsInput']);
  angular.module('users', ['ngStorage']);
  angular.module('news', ['ngStorage']);
})();

(function() {
  angular.module('app').config(router);

  function router($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'appController',
        controllerAs: 'appCtrl',
        templateUrl: 'source/templates/welcome.html',
      })
      .when('/news', {
        controller: 'appController',
        controllerAs: 'appCtrl',
        templateUrl: 'source/templates/news/news.html',
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

(function(){
  'use strict';

  angular.module('app')
         .controller('appController', appController);

  appController.$inject = ['sessionService'];

  function appController(sessionService) {
    var vm = this;

    vm.loggedIn = function() {
      return sessionService.loggedIn();
    };

    vm.currentUser = function() {
      return sessionService.currentUser();
    };
  }
})();

(function() {
  'use strict';

  angular.module('app')
         .directive('appNavbar', appNavbar);

  function appNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'source/templates/shared/navbar.html',
      controller: navbarController,
      controllerAs: 'navbarCtrl'
    };

    return directive;
  }

  navbarController.$inject = ['sessionService'];

  function navbarController(sessionService) {
    var vm = this;
    vm.session = {};

    vm.login = function() {
      sessionService.login(vm.session)
                    .then(vm.session = {});
    };

    vm.logout = function() {
      sessionService.logout();
    };
  }
})();

(function() {
  'use strict';

  angular.module('news')
         .directive('newsDisplay', newsDisplay);

  function newsDisplay() {
    var directive = {
      restrict: 'E',
      templateUrl: '/source/templates/news/newsDisplay.html',
      controller: newsDisplayController,
      controllerAs: 'newsDisplayCtrl'
    };

    return directive;
  }

  newsDisplayController.$inject = ['newsDisplayService'];

  function newsDisplayController(newsDisplayService) {
    var vm = this;
    vm.newsItems = [];
    newsDisplayService.getNews().then(function(data) {
      vm.newsItems = data.data.news;
    });
  }
})();

(function() {
  'use strict';

  angular.module('news')
         .directive('searchBar', searchBar);

  function searchBar() {
    var directive = {
      restrict: 'E',
      templateUrl: '/source/templates/news/searchBar.html',
      controller: searchBarController,
      controllerAs: 'searchBarCtrl'
    };

    return directive;
  }

  searchBarController.$inject = ['searchService'];

  function searchBarController(searchService) {
    var vm = this;
    vm.tagCollection = [{text: "Nahi"}, {text:"Steinsi"}, {text:"Sali"}];

    vm.submit = function() {
      searchService.browse(vm.tags);
    };
  }
})();

(function() {
  'use strict';

  angular.module('users')
         .directive('userSignup', userSignup);

  function userSignup() {
    var directive = {
     restrict: 'E',
     templateUrl: '/source/templates/shared/userSignup.html',
     controller: signupController,
     controllerAs: 'signupCtrl'
    };

    return directive;
  }

  signupController.$inject = ['signupService'];

  function signupController(signupService) {
    var vm = this;
    vm.userForm = {};

    vm.submit = function() {
      signupService.signup(vm.userForm);
      vm.userForm = {};
    };
  }
})();

(function() {
  'use strict';

  angular.module('news')
         .service('newsDisplayService', newsDisplayService);

  function newsDisplayService($http, $window, $sessionStorage) {
    var self = this;

    self.getNews = function() {
      return $http({
          method: 'get',
          url: 'http://arqui8.ing.puc.cl/api/v1/private/news',
          headers: {
            'Authorization': 'Bearer ' + $sessionStorage.currentUser.token
          }
        }).success(function(data, textStatus, xhr) {
            console.log(data.news);
        }).error(function(data, textStatus, xhr) {

        });
    };
  }
})();

(function() {
  'use strict';

  angular.module('news')
         .service('searchService', searchService);

  function searchService($http, $window, $sessionStorage) {
    var self = this;

    self.browse = function(search) {

    };
  }
})();

(function() {
  'use strict';

  angular.module('app')
         .service('sessionService', sessionService);

  function sessionService($http, $window, $sessionStorage) {
    var self = this;

    // Returns a promise
    self.login = function(userForm) {
      return $http({
        method: 'POST',
        url: 'http://arqui8.ing.puc.cl/api/v1/auth/token',
        data: $.param(userForm),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function(data, textStatus, xhr) {
          $sessionStorage.currentUser = { 'username' : userForm.username,
                                          'password' : userForm.password,
                                          'token' : data.token };
          $window.location.href = '/#/news';
      }).error(function(data, textStatus, xhr) {
          $window.location.href = '/#/';
      });
    };

    self.logout = function() {
      delete $sessionStorage.currentUser;
      $window.location.href = '/#/';
    };

    self.loggedIn = function() {
      return ($sessionStorage.currentUser !== undefined);
    };

    self.currentUser = function() {
      return $sessionStorage.currentUser;
    };
  }
})();

(function() {
  'use strict';

  angular.module('users')
         .service('signupService', signupService);

  function signupService($http, $window, $sessionStorage) {
    var self = this;

    self.signup = function(userForm) {
      if (userForm.password === userForm.passwordConfirmation) {
        $http({
          method: 'POST',
          url: 'http://arqui8.ing.puc.cl/api/v1/auth/signup',
          data: $.param(userForm),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data, textStatus, xhr) {
            $('#signup-modal').modal('hide');
            $sessionStorage.currentUser = { 'username' : userForm.username,
                                            'password' : userForm.password,
                                            'token' : data.token };
            $window.location.href = '/#/news';
        }).error(function(data, textStatus, xhr) {
            $window.location.href = '/#/';
        });
      } else {
        swal({ title: "La contraseña y su confirmación deben coincidir.",
               type: "error",
               timer: 3500});
      }
    };
  }
})();
