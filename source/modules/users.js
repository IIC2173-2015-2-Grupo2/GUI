(function(){
  var app = angular.module('users', []);

  app.directive('userSignup', userSignup);

  function userSignup() {
    var directive = {
      restrict: 'E',
      templateUrl: '/source/templates/user/signup.html',
      controller: signupController,
      controllerAs: 'signupCtrl'
    };

    return directive;
  }

  function signupController($http) {
    this.user = {};

    this.submit = function() {
      $http.post('#', this.user)
           .success(function() {
             alert('success!');
           })
           .error(function() {
             alert('fail!');
           });
    };
  };
})();
