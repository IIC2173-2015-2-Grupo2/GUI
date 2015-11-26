(function() {
  'use strict';

  angular.module('news')
         .service('searchService', searchService);

  function searchService($http, $window, $sessionStorage, $localStorage, $rootScope) {
    var vm = this;
    vm.newsPath = 'http://arqui8.ing.puc.cl/api/v1/private/news';
    vm.searchPath = 'http://arqui8.ing.puc.cl/api/v1/private/search';
    vm.tagsPath = 'http://arqui8.ing.puc.cl/api/v1/private/tags';
    vm.providersPath = 'http://arqui8.ing.puc.cl/api/v1/private/news_providers';
    vm.categoriesPath = 'http://arqui8.ing.puc.cl/api/v1/private/categories';
    vm.peoplePath = 'http://arqui8.ing.puc.cl/api/v1/private/people';
    vm.locationsPath = 'http://arqui8.ing.puc.cl/api/v1/private/locations';

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
      return $localStorage.tagList || [];
    };

    vm.getProviderList = function() {
      return $localStorage.providerList || [];
    };

    vm.getCategoryList = function() {
      return $localStorage.categoryList || [];
    };

    vm.getPeopleList = function() {
      return $localStorage.peopleList || [];
    };

    vm.getLocationList = function() {
      return $localStorage.locationList || [];
    };

    vm.getCurrentFilter = function() {
      return $localStorage.currentFilter || [];
    };

    vm.setCurrentFilter = function(filters) {
      delete $localStorage.currentPage;
      delete $localStorage.currentFilter;
      var newFilter = {};

      function mapper(unit) { return unit.text; }
      if (filters.tags) { newFilter.tags = filters.tags.map(mapper); }
      if (filters.providers) { newFilter.providers = filters.providers.map(mapper); }
      if (filters.categories) { newFilter.categories = filters.categories.map(mapper); }
      if (filters.people) { newFilter.people = filters.people.map(mapper); }
      if (filters.locations) { newFilter.locations = filters.locations.map(mapper); }

      $localStorage.currentFilter = newFilter;
    };

    vm.clearCurrentNews = function() {
      delete $localStorage.currentNews;
      delete $localStorage.currentPage;
      delete $localStorage.currentFilter;
    };

    vm.getTags = function() {
      return getRequest(vm.tagsPath)
            .success(function(data) { vm.getHandler(data, "tags") });
    };

    vm.getProviders = function() {
      return getRequest(vm.providersPath)
            .success(function(data) { vm.getHandler(data, "providers") });
    };

    vm.getCategories = function() {
      return getRequest(vm.categoriesPath)
            .success(function(data) { vm.getHandler(data, "categories") });
    };

    vm.getPeople = function() {
      return getRequest(vm.peoplePath)
            .success(function(data) { vm.getHandler(data, "people") });
    };

    vm.getLocations = function() {
      return getRequest(vm.locationsPath)
            .success(function(data) { vm.getHandler(data, "locations") });
    };

    vm.getHandler = function(data, type) {
      function tagBuilder(singleData) { return { text: singleData.name }; }

      switch(type) {
        case "tags":
            $localStorage.tagList = _.uniq(data.tags.map(tagBuilder), JSON.stringify);
            break;
        case "providers":
            $localStorage.providerList = _.uniq(data.news_providers.map(tagBuilder), JSON.stringify);
            break;
        case "categories":
            $localStorage.categoryList = _.uniq(data.categories.map(tagBuilder), JSON.stringify);
            break;
        case "people":
            $localStorage.peopleList = _.uniq(data.people.map(tagBuilder), JSON.stringify);
            break;
        case "locations":
            $localStorage.locationList = _.uniq(data.locations.map(tagBuilder), JSON.stringify);
            break;
      }
    }

    vm.getNews = function(page) {
      return getRequest(vm.newsPath, { 'page': page })
            .success(function(data) { vm.setCurrentNewsAndPage(data.news, page); });
    };

    vm.getNewsByQuery = function(filters, page) {
      var params = filters;
      params.page = page;

      return getRequest(vm.searchPath, params)
            .success(function(data) { vm.setCurrentNewsAndPage(data.news, page); });
    };
  }
})();
