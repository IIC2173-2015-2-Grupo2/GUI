(function(){
  'use strict';

  angular.module('app')
         .controller('appController', appController);

  appController.$inject = ['sessionService'];

  function appController(sessionService) {
    this.loggedIn = function() {
      return sessionService.loggedIn();
    };

    this.currentUser = function() {
      return sessionService.currentUser();
    };
  }
})();
