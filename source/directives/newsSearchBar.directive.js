(function() {
  'use strict';

  angular.module('news')
         .directive('searchBar', searchBar);

  function searchBar() {
    var directive = {
      restrict: 'E',
      templateUrl: '/templates/news/searchBar.html',
      controller: searchBarController,
      controllerAs: 'searchBarCtrl'
    };

    return directive;
  }

  searchBarController.$inject = ['searchService'];

  function searchBarController(searchService) {
    var vm = this;
    vm.tagCollection = [];

    searchService.getTags().then(function(data) {
      console.log(data);
      vm.tagCollection = data.data.tags;
    });

    vm.submit = function() {
      searchService.browseByTag(vm.tags);
    };
  }
})();
