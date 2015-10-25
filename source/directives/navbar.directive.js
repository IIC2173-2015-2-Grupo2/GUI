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

  navbarController.$inject = ['sessionService', 'searchService', '$rootScope'];

  function navbarController(sessionService, searchService, $rootScope) {
    var vm = this;
    vm.session = {};

    vm.tagCollection = searchService.getCurrentTags() ||
                       searchService.getTags().then(function() { vm.tagCollection = searchService.getCurrentTags(); });

    vm.providers = searchService.getCurrentNewsProviders() ||
                   searchService.getNewsProviders().then(function() { vm.providers = searchService.getCurrentNewsProviders(); });

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
      searchService.getNewsByTag(vm.tags).then(function(data) {
        $rootScope.$emit('newsChanged');
      });
    };
  }
})();
