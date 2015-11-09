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

    vm.getCurrentTags = function() {
      return $localStorage.currentTags;
    };

    vm.getCurrentNewsProviders = function() {
      return $localStorage.currentNewsProviders;
    };

    vm.getCurrentNews = function() {
      return $localStorage.currentNews;
    };

    vm.getCurrentFilter = function() {
      return $localStorage.currentFilter;
    };

    vm.setCurrentNewsAndPage = function(news, page) {
      $localStorage.currentNews = news;
      $localStorage.currentPage = page;
    };

    vm.setCurrentFilter = function(queryTags, queryProviders) {
      delete $localStorage.currentPage;
      delete $localStorage.currentFilter;
      var filter = {};

      if (queryTags === undefined && queryProviders === undefined) {
        return vm.getNews(0);
      } else {
        if (queryTags !== undefined) {
          filter.tags = queryTags.map(function(s) { return s.text; });
        }

        if (queryProviders !== undefined) {
          filter.providers = queryProviders.map(function(s) { return s.text; });
        }
      }

      $localStorage.currentFilter = filter;
      return filter;
    };

    vm.getCurrentPage = function() {
      return $localStorage.currentPage || 0;
    };

    vm.clearCurrentNews = function() {
      delete $localStorage.currentNews;
      delete $localStorage.currentPage;
      delete $localStorage.currentFilter;
    };

    vm.getTags = function() {
      return getRequest(vm.tagsPath)
            .success(function(data) {
              var tags = data.tags.map(function(dataTag) {
                return {text: dataTag.name};
              });
              $localStorage.currentTags = tags;
            });
    };

    vm.getNewsProviders = function() {
      return getRequest(vm.newsProvidersPath)
            .success(function(data) {
              var newsProviders = data.news_providers.map(function(dataProvider) {
                return {text: dataProvider.name};
              });
              $localStorage.currentNewsProviders = newsProviders;
            });
    };

    vm.getNews = function(page) {
      return getRequest(vm.newsPath, { 'page': page })
            .success(function(data) {
              vm.setCurrentNewsAndPage(data.news, page);
            });
    };

    vm.getNewsByQuery = function(filters, page) {
      var params = filters;
      params.page = page;

      return getRequest(vm.searchPath, params)
            .success(function(data) {
              vm.setCurrentNewsAndPage(data.news, page);
            });
    };
  }
})();
