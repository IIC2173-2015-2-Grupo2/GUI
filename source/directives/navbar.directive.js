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
      searchService.getTags().then(function() {
        vm.tagCollection = searchService.getCurrentTags();
      });

      searchService.getNewsProviders().then(function() {
        vm.providerCollection = searchService.getCurrentNewsProviders();
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
      finishSearch();
    };

    vm.searchByQuery = function() {
      searchService.setCurrentFilter(vm.queryTags, vm.queryProviders);
      finishSearch();
    };

    function finishSearch() {
      $('#search-modal').modal('hide');
      $rootScope.$emit('newsChanged');
    }
  }
})();
