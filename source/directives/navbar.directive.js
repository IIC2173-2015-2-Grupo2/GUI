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
