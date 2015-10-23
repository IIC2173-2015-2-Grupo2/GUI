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

  newsDisplayController.$inject = ['newsDisplayService'];

  function newsDisplayController(newsDisplayService) {
    var vm = this;
    vm.newsItems = [];
    newsDisplayService.getNews().then(function(data) {
      vm.newsItems = data.data.news;
    });
  }
})();
