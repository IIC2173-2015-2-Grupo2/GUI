(function() {
  'use strict';

  angular.module('users')
         .service('signupService', signupService);

  function signupService($http, $window) {
    var self = this;

    self.signup = function(userForm) {
      $http.post('#', userForm)
           .success(function() {
             alert('success!');
             $window.location.href = '/#/home';
           })
           .error(function() {
             alert('fail!');
             $window.location.href = '/#/';
           });
    };
  }
})();
