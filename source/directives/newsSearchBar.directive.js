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

  function searchBarController(searchService, $localStorage) {
    var vm = this;
    vm.tagCollection = searchService.getCurrentTags() || searchService.getTags().then(function() { vm.tagCollection = searchService.getCurrentTags(); });

    vm.submit = function() {
      searchService.getNewsByTag(vm.tags);
    };
  }
})();
