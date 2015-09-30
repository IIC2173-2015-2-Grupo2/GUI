(function() {
  'use strict';

  angular.module('news')
         .service('searchService', searchService);

  function searchService($http, $window, $localStorage) {
    var self = this;
    self.localStorage = $localStorage;

    self.browse = function(search) {
      
      this.article = {
        title: search.content,
        review: 'Loren ipsu etc',
        url: 'http://www.noticia.cl',
        date: '30/09/2015'
      };
      if(!self.localStorage.news){
        self.localStorage.news = [];
      }
      self.localStorage.news.push(this.article);
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
