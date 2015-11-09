(function() {
  'use strict';

  angular.module('app')
         .service('sessionService', sessionService);

  function sessionService($http, $window, $sessionStorage, $localStorage, $rootScope) {
    var vm = this;

    vm.login = function(userForm) {
      return $http({
        method: 'POST',
        url: 'http://arqui8.ing.puc.cl/api/v1/auth/token',
        data: $.param(userForm),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function(data) {
          $sessionStorage.currentUser = { 'username' : userForm.username,
                                          'token' : data.token };
          $rootScope.$emit('login');
          $window.location.href = '/#/news';
      }).error(function() {
          $window.location.href = '/#/';
      });
    };

    vm.logout = function() {
      $sessionStorage.$reset();
      $localStorage.$reset();
      $window.location.href = '/#/';
    };

    vm.loggedIn = function() {
      return ($sessionStorage.currentUser !== undefined);
    };

    vm.currentUser = function() {
      return $sessionStorage.currentUser;
    };
  }
})();
