(function() {
  'use strict';

  angular.module('users')
         .service('signupService', signupService);

  function signupService($http, $window, $sessionStorage) {
    var self = this;

    self.signup = function(userForm) {
      $sessionStorage.users.push(userForm);
      $sessionStorage.currentUser = userForm;

      /* $http.post('#', userForm)
           .success(function() {
             alert('success!');
             $window.location.href = '/#/home';
           })
           .error(function() {
             alert('fail!');
             $window.location.href = '/#/';
           }); */
    };
  }
})();
