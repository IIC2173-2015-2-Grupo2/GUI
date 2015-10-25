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
    updateNews();

    $rootScope.$on('newsChanged', function() {
      updateNews();
    });

    function updateNews() {
      vm.newsItems = searchService.getCurrentNews() ||
                     searchService.getNews().then(function() {
                       vm.newsItems = searchService.getCurrentNews();
                     });
    }
  }
})();
