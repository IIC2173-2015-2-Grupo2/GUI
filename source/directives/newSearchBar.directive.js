(function() {
  'use strict';

  angular.module('news')
         .directive('searchBar', searchBar);

  function searchBar() {
    var directive = {
      restrict: 'E',
      templateUrl: '/source/templates/new/searchBar.html',
      controller: searchBarController,
      controllerAs: 'searchBarCtrl'
    };

    return directive;
  }

  searchBarController.$inject = ['searchService'];

  function searchBarController(searchService) {
    var vm = this;
    vm.search = {};

    vm.submit = function() {
      searchService.browse(vm.search);
      vm.search = {};
    }
  };
})();
