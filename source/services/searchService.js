(function() {
  'use strict';

  angular.module('news')
         .service('searchService', searchService);

  function searchService($http, $window, $sessionStorage, $localStorage) {
    var self = this;

    self.getCurrentNews = function() {
      return $localStorage.currentNews;
    };

    self.getCurrentTags = function() {
      return $localStorage.currentTags;
    }

    self.getCurrentNewsProviders = function() {
      return $localStorage.currentNewsProviders;
    }

    self.getTags = function() {
      return $http({
        method: 'get',
        url: 'http://arqui8.ing.puc.cl/api/v1/private/tags',
        headers: {
          'Authorization': 'Bearer ' + $sessionStorage.currentUser.token
        }
      }).success(function(data) {
        var tags = data.tags.map(function(dataTag) { return {text: dataTag.name}; })
        $localStorage.currentTags = tags;
      });
    };

    self.getNewsProviders = function() {
      return $http({
        method: 'get',
        url: 'http://arqui8.ing.puc.cl/api/v1/private/news_providers',
        headers: {
          'Authorization': 'Bearer ' + $sessionStorage.currentUser.token
        }
      }).success(function(data) {
        $localStorage.currentNewsProviders = data.news_providers;
      });
    };

    self.getNews = function() {
      return $http({
        method: 'get',
        url: 'http://arqui8.ing.puc.cl/api/v1/private/news',
        headers: {
          'Authorization': 'Bearer ' + $sessionStorage.currentUser.token
        }
      }).success(function(data) {
        $localStorage.currentNews = data.news;
      });
    };

    self.getNewsByTag = function(search) {
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
      }).success(function(data) {
        $localStorage.currentNews = data.news;
        $window.location.href = '/#/news';
      });
    };
  }
})();
