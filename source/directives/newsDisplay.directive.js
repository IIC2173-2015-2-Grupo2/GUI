(function() {
  'use strict';

  angular.module('news')
         .directive('newsDisplay', newsDisplay);

  function newsDisplay() {
    var directive = {
      restrict: 'E',
      templateUrl: '/source/templates/news/newsDisplay.html',
      controller: newsDisplayController,
      controllerAs: 'newsDisplayCtrl'
    };

    return directive;
  }

  newsDisplayController.$inject = ['newsDisplayService'];

  function newsDisplayController(newsDisplayService) {
    var vm = this;
    //Aca se deben entregar las noticias
    vm.news = newsDisplayService.getNews();
  };
})();
