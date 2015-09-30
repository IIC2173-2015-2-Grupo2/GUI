(function(){
  angular.module('app', ['ngRoute', 'ngStorage', 'users']);
  angular.module('users', ['ngStorage']);
})();
