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

      /* $http.get('#', mv.search)
           .success(function(data) {
             alert("Success!");
             $rootScope.news="noticias";
             $window.location.href = '/#/home';
           })
           .error(function() {
             alert('fail!');
           });*/
    };
    
  }
})();
