(function() {
  'use strict';

  angular.module('users')
         .service('signupService', signupService);

  function signupService($http, $window, $sessionStorage, $rootScope) {
    this.signup = function(userForm) {
      if (userForm.password === userForm.passwordConfirmation) {
        $http({
          method: 'POST',
          url: 'http://arqui8.ing.puc.cl/api/v1/auth/signup',
          data: $.param(userForm),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data) {
            $('#signup-modal').modal('hide');
            $sessionStorage.currentUser = { 'username' : userForm.username,
                                            'password' : userForm.password,
                                            'token' : data.token };
            $rootScope.$emit('login');
            $window.location.href = '/#/news';
        }).error(function() {
            swal({title: 'Hubo un error al crear tu cuenta.',
                type: 'error',
                timer: 3500});
            $window.location.href = '/#/';
        });
      } else {
        swal({title: 'Your password and its confirmation must be the same.',
              type: 'error',
              timer: 3500});
      }
    };
  }
})();
