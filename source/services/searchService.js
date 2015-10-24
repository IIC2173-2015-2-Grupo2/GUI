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
        });
    };

    self.browse = function(search) {

    };
  }
})();
