(function() {
  'use strict';

  angular.module('app')
         .service('sessionService', sessionService);

  function sessionService($http, $window, $sessionStorage) {
    var self = this;

    // Returns a promise
    self.login = function(userForm) {
      return $http({
        method: 'POST',
        url: 'http://arqui8.ing.puc.cl/api/v1/auth/token',
        data: $.param(userForm),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function(data, textStatus, xhr) {
          $sessionStorage.currentUser = { 'username' : userForm.username,
                                          'password' : userForm.password,
                                          'token' : data.token };
          $window.location.href = '/#/news';
      }).error(function(data, textStatus, xhr) {
          alert('fail');
          $window.location.href = '/#/';
      });
    };

    self.logout = function() {
      delete $sessionStorage.currentUser;
      $window.location.href = '/#/';
    };

    self.loggedIn = function() {
      return ($sessionStorage.currentUser !== undefined);
    };

    self.currentUser = function() {
      return $sessionStorage.currentUser;
    }
  }
})();
