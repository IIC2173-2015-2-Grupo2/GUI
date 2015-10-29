(function() {
  angular.module('app', ['ngRoute', 'ngStorage', 'users', 'news', 'ngTagsInput']);
  angular.module('users', ['ngStorage']);
  angular.module('news', ['ngStorage']);
})();
