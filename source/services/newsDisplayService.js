(function() {
  'use strict';

  angular.module('news')
         .service('newsDisplayService', newsDisplayService);

  function newsDisplayService($http, $window, $localStorage) {
    var self = this;
    self.news = $localStorage.news;
    self.tokenObject = {
      token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6Ik5haGkiLCJleHAiOjE0NDQ1ODk4NzZ9.pqsHBx6FQd_PUqwaIS-3NGNO-8igvqkusKwQ3VXZFCk'
    };

    self.getNews = function() {
      // return self.news;


      $http({
        method: 'GET',
        url: 'http://arqui8.ing.puc.cl/api/v1/private/news',
        data: $.param(self.tokenObject),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function(data, textStatus, xhr) {
          console.log(data);
          $window.location.href = '/#/home';
      }).error(function(data, textStatus, xhr) {
          $window.location.href = '/#/';
      });
    };
  }
})();
