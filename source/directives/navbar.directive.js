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

  navbarController.$inject = ['sessionService', 'searchService'];

  function navbarController(sessionService, searchService) {
    var vm = this;
    vm.session = {};
    vm.providers = searchService.getCurrentNewsProviders() || searchService.getNewsProviders().then(function() { vm.providers = searchService.getCurrentNewsProviders(); });

    vm.login = function() {
      sessionService.login(vm.session)
                    .then(vm.session = {});
    };

    vm.logout = function() {
      sessionService.logout();
    };
  }
})();
