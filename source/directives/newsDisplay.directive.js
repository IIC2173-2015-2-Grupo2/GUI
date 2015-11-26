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

      if (currentFilter) {
        vm.newsItems = searchService.getNews(page, currentFilter);
      } else {
        vm.newsItems = searchService.getNews(page);
      }

      // vm.newsItems is still a promise.
      vm.newsItems.then(function() {
        vm.newsItems = searchService.getCurrentNews();
        vm.currentPage = searchService.getCurrentPage();
      });
    };

    vm.updateNews(vm.currentPage);

    $rootScope.$on('newsChanged', function() {
      vm.updateNews();
    });

    vm.scrollUp = function() {
      $('.scroll-to-top').on('click', function() {
        $('html, body').animate({scrollTop : 0}, 800);
      });
    };
  }
})();
