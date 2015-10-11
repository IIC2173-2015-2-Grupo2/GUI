(function() {
  'use strict';

  angular.module('users')
         .service('signupService', signupService);

  function signupService($http, $window, $sessionStorage) {
    var self = this;

    self.signup = function(userForm) {

      if (userForm.password === userForm.passwordConfirmation) {
        $http({
          method: 'POST',
          url: 'http://arqui8.ing.puc.cl/api/v1/auth/signup',
          data: $.param(userForm),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data, textStatus, xhr) {
            // console.log(data.token);
            $('#signup-modal').modal('hide');
            $sessionStorage.currentUser = { 'username' : userForm.username,
                                            'password' : userForm.password,
                                            'token' : data.token };
            $window.location.href = '/#/home';
        }).error(function(data, textStatus, xhr) {
            $window.location.href = '/#/';
        });
      } else {
        alert('fail');
      }
    };
  }
})();
