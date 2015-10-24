(function() {
  'use strict';

  angular.module('news')
         .service('searchService', searchService);

  function searchService($http, $window, $sessionStorage) {
    var self = this;

    self.getTags = function() {
      return $http({
        method: 'get',
        url: 'http://arqui8.ing.puc.cl/api/v1/private/tags',
        headers: {
          'Authorization': 'Bearer ' + $sessionStorage.currentUser.token
        }
      });
    };

    self.getNews = function() {
      return $http({
        method: 'get',
        url: 'http://arqui8.ing.puc.cl/api/v1/private/news',
        headers: {
          'Authorization': 'Bearer ' + $sessionStorage.currentUser.token
        }
      });
    };

    self.browseByTag = function(search) {
      var query = search.map(function(s) {
        return s.text;
      });

      return $http({
        method: 'get',
        url: 'http://arqui8.ing.puc.cl/api/v1/private/search',
        params: {
          'tags': query
        },
        headers: {
          'Authorization': 'Bearer ' + $sessionStorage.currentUser.token
        }
      });
    };
  }
})();
