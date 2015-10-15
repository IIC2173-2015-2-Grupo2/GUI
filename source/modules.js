(function(){
  angular.module('app', ['ngRoute', 'ngStorage', 'users','news']);
  angular.module('users', ['ngStorage']);
  angular.module('news', ['ngStorage']);
})();
