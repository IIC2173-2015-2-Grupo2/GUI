(function() {
  'use strict';

  angular.module('news')
         .service('searchService', searchService);

  function searchService($http, $window, $sessionStorage, $localStorage) {
    var vm = this;
    vm.tagsPath = 'http://arqui8.ing.puc.cl/api/v1/private/tags';
    vm.newsProvidersPath = 'http://arqui8.ing.puc.cl/api/v1/private/news_providers';
    vm.newsPath = 'http://arqui8.ing.puc.cl/api/v1/private/news';
    vm.searchPath = 'http://arqui8.ing.puc.cl/api/v1/private/search';

    vm.getCurrentTags = function() {
      return $localStorage.currentTags;
    }

    vm.getCurrentNewsProviders = function() {
      return $localStorage.currentNewsProviders;
    }

    vm.getCurrentNews = function() {
      return $localStorage.currentNews;
    };

    vm.clearCurrentNews = function() {
      delete $localStorage.currentNews;
    }

    vm.getTags = function() {
      return request('get', vm.tagsPath)
            .success(function(data) {
              var tags = data.tags.map(function(dataTag) { return {text: dataTag.name}; })
              $localStorage.currentTags = tags;
            });
    };

    vm.getNewsProviders = function() {
      return getRequest(vm.newsProvidersPath)
            .success(function(data) {
              $localStorage.currentNewsProviders = data.news_providers;
            });
    };

    vm.getNews = function() {
      return getRequest(vm.newsPath)
            .success(function(data) {
              $localStorage.currentNews = data.news;
            });
    };

    vm.getNewsByTag = function(search) {
      var query = search.map(function(s) {
        return s.text;
      });

      return getRequest(vm.searchPath, { 'tags': query })
            .success(function(data) {
              $localStorage.currentNews = data.news;
              $window.location.href = '/#/news';
            });
    };

    vm.getNewsByProvider = function(provider) {
      return getRequest(vm.searchPath, { 'providers': provider })
            .success(function(data) {
              $localStorage.currentNews = data.news;
              $window.location.href = '/#/news';
            });
    };

    function getRequest(url, params) {
      return $http({
        method: 'get',
        url: url,
        params: params,
        headers: {
          'Authorization': 'Bearer ' + $sessionStorage.currentUser.token
        }
      });
    }
  }
})();
