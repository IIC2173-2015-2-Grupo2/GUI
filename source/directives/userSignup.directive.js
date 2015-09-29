(function() {
  'use strict';

  angular.module('users')
         .directive('userSignup', userSignup);

  function userSignup() {
   var directive = {
     restrict: 'E',
     templateUrl: '/source/templates/userSignup.html',
     controller: signupController,
     controllerAs: 'signupCtrl'
   };

   return directive;
  }

  signupController.$inject = ['signupService'];

  function signupController(signupService) {
    var vm = this;
    vm.userForm = {};

    vm.submit = function() {
      signupService.signup(vm.userForm);
      vm.userForm = {};
    }
  };
})();
