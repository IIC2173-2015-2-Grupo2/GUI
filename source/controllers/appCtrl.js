(function(){
  angular.module('app')
         .controller('appController', appController);

  appController.$inject = ['sessionService'];

  function appController(sessionService) {
    var vm = this;

    vm.loggedIn = function() {
      return sessionService.loggedIn();
    };
  };
})();
