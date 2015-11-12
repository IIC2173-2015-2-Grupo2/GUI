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

    vm.login = function() {
      sessionService.login(vm.session)
                    .then(vm.session = {});
    };

    vm.logout = function() {
      sessionService.logout();
    };

    vm.clearSearch = function() {
      searchService.clearCurrentNews();
      emitSearch();
    };

    vm.searchByQuery = function() {
      searchService.setCurrentFilter(vm.queryTags, vm.queryProviders);
      emitSearch();
    };

    function emitSearch() {
      $('#search-modal').modal('hide');
      $rootScope.$emit('newsChanged');
    }

    $rootScope.$on('login', function() {
      searchService.getTags().then(function() {
        vm.tagCollection = searchService.getTagList();
      });

      searchService.getNewsProviders().then(function() {
        vm.providerCollection = searchService.getNewsProviderList();
      });
    });

    $rootScope.$on('logout', function() {
      vm.logout();
    });
  }
})();
