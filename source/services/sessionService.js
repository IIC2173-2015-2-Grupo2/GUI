(function() {
  'use strict';

  angular.module('app')
         .service('sessionService', sessionService);

  function sessionService($http, $window, $sessionStorage) {
    var self = this;

    if ($sessionStorage.users === undefined) {
      $sessionStorage.users = [];
    }

    self.login = function(userForm) {
      if ($sessionStorage.users !== undefined) {
          $sessionStorage.users.forEach(function(user) {
            if (user.email === userForm.email && user.password === userForm.password) {
              $sessionStorage.currentUser = user;
              $window.location.href = '/#/home';
              return;
            }
          });
        $window.location.href = '/#/';
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
