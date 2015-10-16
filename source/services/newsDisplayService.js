(function() {
  'use strict';

  angular.module('news')
         .service('newsDisplayService', newsDisplayService);

  function newsDisplayService($http, $window, $sessionStorage) {
    var self = this;

    self.getNews = function() {
      return $http({
          method: 'get',
          url: 'http://arqui8.ing.puc.cl/api/v1/private/news',
          headers: {
            'Authorization': 'Bearer ' + $sessionStorage.currentUser.token
          }
        }).success(function(data, textStatus, xhr) {
            console.log(data.news);
        }).error(function(data, textStatus, xhr) {

        });
    };
  }
})();
