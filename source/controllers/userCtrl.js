(function(){
  'use strict';

  angular.module('app')
         .controller('userController', userController);

  function userController($sessionStorage) {
    var vm = this;
    vm.username = $sessionStorage.currentUser.username;
    vm.tagCollection = [{text: "Deportes"},
                        {text:"Musica"},
                        {text:"Salud"},
                        {text:"Internacional"}];
    vm.maxTags = 3;
    vm.userTags = $sessionStorage.currentUser.tags;
    vm.submit = function(){
      $sessionStorage.currentUser.tags = vm.tags;
      vm.userTags = $sessionStorage.currentUser.tags;
      vm.tags = [];
    };
  }
})();
