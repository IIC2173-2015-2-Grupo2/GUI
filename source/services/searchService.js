(function() {
  'use strict';

  angular.module('news')
         .service('searchService', searchService);

  function searchService($http, $window, $sessionStorage) {
    var self = this;

    self.browse = function(search) {

    };
  }
})();
