(function() {
  'use strict';

  angular.module('app')
         .service('sessionService', sessionService);

  function sessionService($http, $window, $sessionStorage) {
    var self = this;
    self.sessionStorage = $sessionStorage;

    self.login = function(userForm) {
      if (self.sessionStorage.currentUser !== undefined &&
          self.sessionStorage.currentUser.email === userForm.email &&
          self.sessionStorage.currentUser.password === userForm.password) {
        $window.location.href = '/#/home';
      } else {
        $window.location.href = '/#/';
      }

      userForm = {};

      /*$ $http.post('#', userForm)
           .success(function() {
             alert('success!');
             $window.location.href = '/#/home';
           })
           .error(function() {
             alert('fail!');
             $window.location.href = '/#/';
           });*/
    };

    self.logout = function() {
      self.sessionStorage.$reset();
      $window.location.href = '/#/';
    };

    self.loggedIn = function() {
      return (self.sessionStorage.currentUser !== undefined);
    };
  }
})();
