(function(){
  angular.module('app')
         .controller('appController', appController);

  appController.$inject = ['sessionService'];

  function appController(sessionService) {

  };
})();
