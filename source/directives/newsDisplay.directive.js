(function() {
  'use strict';

  angular.module('news')
         .directive('newsDisplay', newsDisplay);

  function newsDisplay() {
    var directive = {
      restrict: 'E',
      templateUrl: '/templates/news/newsDisplay.html',
      controller: newsDisplayController,
      controllerAs: 'newsDisplayCtrl'
    };

    return directive;
  }

  newsDisplayController.$inject = ['searchService'];

  function newsDisplayController(searchService, $localStorage) {
    var vm = this;
    vm.newsItems = searchService.getCurrentNews() || searchService.getNews().then(function() { vm.newsItems = searchService.getCurrentNews(); });
  }
})();
