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
    getLSLists();

    vm.login = function() {
      sessionService.login(vm.session)
                    .then(vm.session = {});
    };

    vm.logout = function() {
      sessionService.logout();
    };

    vm.clearSearch = function() {
      searchService.clearCurrentNews();
      vm.filters = {};
      emitSearch();
    };

    vm.search = function() {
      searchService.setCurrentFilter(vm.filters);
      emitSearch();
    };

    function emitSearch() {
      $('#search-modal').modal('hide');
      $rootScope.$emit('newsChanged');
    }

    function getLSLists() {
      if (sessionService.loggedIn()) {
        vm.tagCollection      = vm.tagCollection      || searchService.getLSTags();
        vm.providerCollection = vm.providerCollection || searchService.getLSProviders();
        vm.categoryCollection = vm.categoryCollection || searchService.getLSCategories();
        vm.peopleCollection   = vm.peopleCollection   || searchService.getLSPeople();
        vm.locationCollection = vm.locationCollection || searchService.getLSLocations();
        vm.companyCollection  = vm.companyCollection  || searchService.getLSCompanies();
      }
    }

    $rootScope.$on('login', function() {
      vm.tagCollection      = searchService.getTags();
      vm.providerCollection = searchService.getProviders();
      vm.categoryCollection = searchService.getCategories();
      vm.peopleCollection   = searchService.getPeople();
      vm.locationCollection = searchService.getLocations();
      vm.companyCollection  = searchService.getCompanies();
    });

    $rootScope.$on('logout', function() {
      vm.logout();
    });
  }
})();
