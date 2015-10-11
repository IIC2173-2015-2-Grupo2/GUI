(function() {
  'use strict';

  angular.module('news')
         .service('searchService', searchService);

  function searchService($http, $window, $localStorage) {
    var self = this;
    self.localStorage = $localStorage;

    self.browse = function(search) {
      alert('buscando: ' + search.content);
      $window.location.href = '/#/home';

      // $http({
      //   method: 'POST',
      //   url: 'http://arqui8.ing.puc.cl/api/v1/private/news',
      //   data: $.param(search),
      //   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      // }).success(function(data, textStatus, xhr) {
      //     console.log(data);
      //     $window.location.href = '/#/home';
      // }).error(function(data, textStatus, xhr) {
      //     $window.location.href = '/#/';
      // });
    };
  }
})();
