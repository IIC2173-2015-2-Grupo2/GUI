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

(function(){
  'use strict';

  angular.module('app')
         .controller('appController', appController);

  appController.$inject = ['sessionService'];

  function appController(sessionService) {
    this.loggedIn = function() {
      return sessionService.loggedIn();
    };

    this.currentUser = function() {
      return sessionService.currentUser();
    };
  }
})();

(function(){
  'use strict';

  angular.module('app')
         .controller('userController', userController);

  function userController($sessionStorage) {
    var vm = this;
    vm.username = $sessionStorage.currentUser.username;
    vm.tagCollection = [{text: "Deportes"}, {text:"Musica"}, {text:"Salud"},{text:"Internacional"}];
    //TODO incorporar nueva forma de límitar inputs
    vm.maxTags = 3;
    vm.userTags = $sessionStorage.currentUser.tags;
    vm.submit = function(){
      $sessionStorage.currentUser.tags = vm.tags;
      vm.userTags = $sessionStorage.currentUser.tags;
      vm.tags = [];
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
      templateUrl: 'templates/shared/navbar.html',
      controller: navbarController,
      controllerAs: 'navbarCtrl'
    };

    return directive;
  }

  navbarController.$inject = ['$rootScope', 'sessionService', 'searchService'];

  function navbarController($rootScope, sessionService, searchService) {
    var vm = this;
    vm.session = {};

    $rootScope.$on('login', function() {
      vm.tagCollection = searchService.getTags().then(function() {
        vm.tagCollection = searchService.getCurrentTags();
      });

      vm.providers = searchService.getNewsProviders().then(function() {
        vm.providers = searchService.getCurrentNewsProviders();
      });
    });

    vm.login = function() {
      sessionService.login(vm.session)
                    .then(vm.session = {});
    };

    vm.logout = function() {
      sessionService.logout();
    };

    vm.clearSearch = function() {
      searchService.clearCurrentNews();
      $rootScope.$emit('newsChanged');
    };

    vm.searchByTags = function() {
      searchService.getNewsByTag(vm.tags).then(function() {
        $rootScope.$emit('newsChanged');
      });
    };

    vm.searchByProvider = function(provider) {
      searchService.getNewsByProvider(provider).then(function() {
        $rootScope.$emit('newsChanged');
      });
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
      templateUrl: '/templates/news/newsDisplay.html',
      controller: newsDisplayController,
      controllerAs: 'newsDisplayCtrl'
    };

    return directive;
  }

  newsDisplayController.$inject = ['searchService', '$rootScope'];

  function newsDisplayController(searchService, $rootScope) {
    var vm = this;
    updateNews();

    $rootScope.$on('newsChanged', function() {
      updateNews();
    });

    function updateNews() {
      vm.newsItems = searchService.getCurrentNews() ||
                     searchService.getNews().then(function() {
                       vm.newsItems = searchService.getCurrentNews();
                     });
    }
  }
})();

(function() {
  'use strict';

  angular.module('users')
         .directive('userSignup', userSignup);

  function userSignup() {
    var directive = {
     restrict: 'E',
     templateUrl: '/templates/shared/userSignup.html',
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
         .service('searchService', searchService);

  function searchService($http, $window, $sessionStorage, $localStorage) {
    var vm = this;
    vm.tagsPath = 'http://arqui8.ing.puc.cl/api/v1/private/tags';
    vm.newsProvidersPath = 'http://arqui8.ing.puc.cl/api/v1/private/news_providers';
    vm.newsPath = 'http://arqui8.ing.puc.cl/api/v1/private/news';
    vm.searchPath = 'http://arqui8.ing.puc.cl/api/v1/private/search';

    function getRequest(url, params) {
      return $http({
        method: 'get',
        url: url,
        params: params,
        headers: {
          'Authorization': 'Bearer ' + $sessionStorage.currentUser.token
        }
      });
    }

    vm.getCurrentTags = function() {
      return $localStorage.currentTags;
    };

    vm.getCurrentNewsProviders = function() {
      return $localStorage.currentNewsProviders;
    };

    vm.getCurrentNews = function() {
      return $localStorage.currentNews;
    };

    vm.clearCurrentNews = function() {
      delete $localStorage.currentNews;
    };

    vm.getTags = function() {
      return getRequest(vm.tagsPath)
            .success(function(data) {
              var tags = data.tags.map(function(dataTag) { return {text: dataTag.name}; });
              $localStorage.currentTags = tags;
            });
    };

    vm.getNewsProviders = function() {
      return getRequest(vm.newsProvidersPath)
            .success(function(data) {
              $localStorage.currentNewsProviders = data.news_providers;
            });
    };

    vm.getNews = function() {
      return getRequest(vm.newsPath)
            .success(function(data) {
              $localStorage.currentNews = data.news;
            });
    };

    vm.getNewsByTag = function(search) {
      var query = search.map(function(s) {
        return s.text;
      });

      return getRequest(vm.searchPath, { 'tags': query })
            .success(function(data) {
              $localStorage.currentNews = data.news;
              $window.location.href = '/#/news';
            });
    };

    vm.getNewsByProvider = function(provider) {
      return getRequest(vm.searchPath, { 'providers': provider })
            .success(function(data) {
              $localStorage.currentNews = data.news;
              $window.location.href = '/#/news';
            });
    };
  }
})();

(function() {
  'use strict';

  angular.module('app')
         .service('sessionService', sessionService);

  function sessionService($http, $window, $sessionStorage, $rootScope) {
    var vm = this;

    vm.login = function(userForm) {
      return $http({
        method: 'POST',
        url: 'http://arqui8.ing.puc.cl/api/v1/auth/token',
        data: $.param(userForm),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function(data) {
          $sessionStorage.currentUser = { 'username' : userForm.username,
                                          'password' : userForm.password,
                                          'token' : data.token };
          $rootScope.$emit('login');
          $window.location.href = '/#/news';
      }).error(function() {
          $window.location.href = '/#/';
      });
    };

    vm.logout = function() {
      delete $sessionStorage.currentUser;
      $window.location.href = '/#/';
    };

    vm.loggedIn = function() {
      return ($sessionStorage.currentUser !== undefined);
    };

    vm.currentUser = function() {
      return $sessionStorage.currentUser;
    };
  }
})();

(function() {
  'use strict';

  angular.module('users')
         .service('signupService', signupService);

  function signupService($http, $window, $sessionStorage, $rootScope) {
    this.signup = function(userForm) {
      if (userForm.password === userForm.passwordConfirmation) {
        $http({
          method: 'POST',
          url: 'http://arqui8.ing.puc.cl/api/v1/auth/signup',
          data: $.param(userForm),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data) {
            $('#signup-modal').modal('hide');
            $sessionStorage.currentUser = { 'username' : userForm.username,
                                            'password' : userForm.password,
                                            'token' : data.token };
            $rootScope.$emit('login');
            $window.location.href = '/#/news';
        }).error(function() {
            swal({title: 'Hubo un error al crear tu cuenta.',
                type: 'error',
                timer: 3500});
            $window.location.href = '/#/';
        });
      } else {
        swal({title: 'Your password and its confirmation must be the same.',
              type: 'error',
              timer: 3500});
      }
    };
  }
})();
