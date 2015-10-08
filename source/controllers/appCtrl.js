(function(){
  'use strict';

  angular.module('app')
         .controller('appController', appController);

  appController.$inject = ['sessionService','dataTestService'];

  function appController(sessionService,dataTestService) {
    var vm = this;
    vm.loggedIn = function() {
      return sessionService.loggedIn();
    };

    vm.currentUser = function() {
      return sessionService.currentUser();
    };
  };
})();
