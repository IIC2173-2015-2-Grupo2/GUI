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

  function newsDisplayController(searchService) {
    var vm = this;
    vm.newsItems = [];
    searchService.getNews().then(function(data) {
      vm.newsItems = data.data.news;
    });
  }
})();
