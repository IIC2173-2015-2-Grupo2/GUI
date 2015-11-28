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

  newsDisplayController.$inject = ['searchService', '$rootScope'];

  function newsDisplayController(searchService, $rootScope) {
    var vm = this;
    vm.currentPage = searchService.getCurrentPage();

    vm.updateNews = function(page) {
      var currentFilter = searchService.getCurrentFilter();
      searchService.getNews(page, currentFilter).then(function() {
        vm.newsItems = searchService.getCurrentNews();
        vm.newsItems.forEach(function(newsItem) { newsItem.clicked = false; });
        vm.currentPage = searchService.getCurrentPage();
      });
    };

    vm.updateNews(vm.currentPage);

    $rootScope.$on('newsChanged', function() {
      vm.updateNews(0);
    });

    vm.scrollUp = function() {
      $('.scroll-to-top').on('click', function() {
        $('html, body').animate({scrollTop : 0}, 800);
      });
    };
  }
})();
