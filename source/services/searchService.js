(function() {
  'use strict';

  angular.module('news')
         .service('searchService', searchService);

  function searchService($http, $window, $sessionStorage, $localStorage) {
    var vm = this;

    vm.getCurrentNews = function() {
      return $localStorage.currentNews;
    };

    vm.getCurrentTags = function() {
      return $localStorage.currentTags;
    }

    vm.getCurrentNewsProviders = function() {
      return $localStorage.currentNewsProviders;
    }

    vm.clearCurrentNews = function() {
      delete $localStorage.currentNews;
    }

    vm.getTags = function() {
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

    vm.getNewsProviders = function() {
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

    vm.getNews = function() {
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

    vm.getNewsByTag = function(search) {
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
