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
  };
})();
