(function() {
  'use strict';

  angular.module('news')
         .service('newsDisplayService', newsDisplayService);

  function newsDisplayService($http, $window, $localStorage) {
    var self = this;
    self.news = $localStorage.news;

    self.getNews = function() {
      return self.news;
      
      /* $http.get('#', '')
           .success(function(data) {
             alert("Success!");
             $localStorage.news=data;
           })
           .error(function() {
             alert('fail!');
           });*/
    };
    
  }
})();