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

  navbarController.$inject = ['loginService'];

  function navbarController(loginService) {
    var vm = this;
    vm.session = {};

    vm.login = function() {
      loginService.login(vm.session);
      vm.session = {};
    }
  };
})();
