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
    vm.companiesPath = 'http://arqui8.ing.puc.cl/api/v1/private/companies'
    $localStorage.currentPage = 0;

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
      return $localStorage.currentPage;
    };

    vm.setCurrentNewsAndPage = function(news, page) {
      $localStorage.currentNews = news;
      $localStorage.currentPage = page;
    };

    vm.clearCurrentNews = function() {
      delete $localStorage.currentNews;
      delete $localStorage.currentPage;
      delete $localStorage.currentFilter;
    };

    vm.getCurrentFilter = function() {
      return $localStorage.currentFilter;
    };

    vm.setCurrentFilter = function(filters) {
      delete $localStorage.currentPage;
      delete $localStorage.currentFilter;
      var newFilter = {};

      function mapper(unit) { return unit.text; }
      if (filters.tags)       { newFilter.tags        = filters.tags.map(mapper); }
      if (filters.providers)  { newFilter.providers   = filters.providers.map(mapper); }
      if (filters.categories) { newFilter.categories  = filters.categories.map(mapper); }
      if (filters.people)     { newFilter.people      = filters.people.map(mapper); }
      if (filters.locations)  { newFilter.locations   = filters.locations.map(mapper); }
      if (filters.companies)  { newFilter.companies   = filters.companies.map(mapper); }

      $localStorage.currentFilter = newFilter;
    };

    vm.getTags = function() {
      return getRequest(vm.tagsPath)
            .success(function(data) { $localStorage.tagList = _.uniq(data.tags.map(vm.tagBuilder), JSON.stringify); })
            .then(function() { return $localStorage.tagList; });
    };

    vm.getProviders = function() {
      return getRequest(vm.providersPath)
            .success(function(data) { $localStorage.providerList = _.uniq(data.news_providers.map(vm.tagBuilder), JSON.stringify); })
            .then(function() { return $localStorage.providerList; });
    };

    vm.getCategories = function() {
      return getRequest(vm.categoriesPath)
            .success(function(data) { $localStorage.categoryList = _.uniq(data.categories.map(vm.tagBuilder), JSON.stringify); })
            .then(function() { return $localStorage.categoryList; });
    };

    vm.getPeople = function() {
      return getRequest(vm.peoplePath)
            .success(function(data) { $localStorage.peopleList = _.uniq(data.people.map(vm.tagBuilder), JSON.stringify); })
            .then(function() { return $localStorage.peopleList; });
    };

    vm.getLocations = function() {
      return getRequest(vm.locationsPath)
            .success(function(data) { $localStorage.locationList = _.uniq(data.locations.map(vm.tagBuilder), JSON.stringify); })
            .then(function() { return $localStorage.locationList; });
    };

    vm.getCompanies = function() {
      return getRequest(vm.companiesPath)
            .success(function(data) { $localStorage.companyList = _.uniq(data.companies.map(vm.tagBuilder), JSON.stringify); })
            .then(function() { return $localStorage.companyList; });
    };

    vm.tagBuilder = function(singleData) {
      return { text: singleData.name };
    };

    vm.getNews = function(page, filters) {
      var params = {};
      if (filters) { params = filters; }
      params.page = page;

      return getRequest(vm.newsPath, params)
            .success(function(data) { vm.setCurrentNewsAndPage(data.news, page); });
    };
  }
})();
