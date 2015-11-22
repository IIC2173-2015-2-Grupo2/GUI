(function() {
  'use strict';

  angular.module('news')
         .service('searchService', searchService);

  function searchService($http, $window, $sessionStorage, $localStorage, $rootScope) {
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
      }).error(function() {
        $rootScope.$emit('logout');
        swal({title: 'Error. Please login again.', type: 'error'});
      });
    }

    vm.getCurrentNews = function() {
      return $localStorage.currentNews;
    };

    vm.getCurrentPage = function() {
      return $localStorage.currentPage || 0;
    };

    vm.setCurrentNewsAndPage = function(news, page) {
      $localStorage.currentNews = news;
      $localStorage.currentPage = page;
    };

    vm.getTagList = function() {
      return $localStorage.tagList;
    };

    vm.getNewsProviderList = function() {
      return $localStorage.newsProviderList;
    };

    vm.getCurrentFilter = function() {
      return $localStorage.currentFilter;
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
    };

    vm.clearCurrentNews = function() {
      delete $localStorage.currentNews;
      delete $localStorage.currentPage;
      delete $localStorage.currentFilter;
    };

    vm.getTags = function() {
      return getRequest(vm.tagsPath)
            .success(function(data) {
              $localStorage.tagList = data.tags.map(vm.tagBuilder(tag));
            });
    };

    vm.getNewsProviders = function() {
      return getRequest(vm.newsProvidersPath)
            .success(function(data) {
              $localStorage.newsProviderList = data.news_providers.map(vm.tagBuilder(provider));
            });
    };

    vm.tagBuilder = function(singleData) {
      return { text: singleData.name };
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
