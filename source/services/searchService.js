(function() {
  'use strict';

  angular.module('news')
         .service('searchService', searchService);

  function searchService($http, $window, $sessionStorage) {
    var self = this;

    self.getNews = function() {
      return $http({
        method: 'get',
        url: 'http://arqui8.ing.puc.cl/api/v1/private/news',
        headers: {
          'Authorization': 'Bearer ' + $sessionStorage.currentUser.token
        }
      }).success(function(data, textStatus, xhr) {
        console.log(data);
      });
    };

    self.browseByTag = function(search) {
      var query = '';
      search.forEach(function(data) {
        query += data.text + ',';
      })
      query = query.substring(0, query.length - 1);

      return $http({
        method: 'get',
        url: 'http://arqui8.ing.puc.cl/api/v1/private/search',
        data: {
          'tags': query
        },
        headers: {
          'Authorization': 'Bearer ' + $sessionStorage.currentUser.token
        }
      }).success(function(data, textStatus, xhr) {
        alert('success');
      });
    };
  }
})();
