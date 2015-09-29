(function() {
  'use strict';

  angular.module('app')
         .service('loginService', loginService);

  function loginService($http, $window) {
    var self = this;

    self.login = function(userForm) {
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
