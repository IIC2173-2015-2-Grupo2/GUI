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
  };

  navbarController.$inject = ['sessionService'];

  function navbarController(sessionService) {
    var vm = this;
    vm.session = {};

    vm.login = function() {
      alert('login');
      sessionService.login(vm.session);
      vm.session = {};
    };

    vm.logout = function() {
      sessionService.logout();
    };
  };
})();
