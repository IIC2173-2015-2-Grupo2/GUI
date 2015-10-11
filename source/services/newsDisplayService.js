(function() {
  'use strict';

  angular.module('news')
         .service('newsDisplayService', newsDisplayService);

  function newsDisplayService($http, $window, $sessionStorage) {
    var self = this;

    self.getNews = function() {
      if($sessionStorage.currentUser){
        $.ajax({
           url: 'http://arqui8.ing.puc.cl/api/v1/private/news/1',
           type: 'GET',
           beforeSend: function (request) {
           request.setRequestHeader('Authorization', 'Bearer ' + $sessionStorage.currentUser.token); },
           dataType: 'json'
          })
          .done(function() {
            console.log("success");
          })
          .fail(function() {
           console.log("error");
        });

        // $http({
        //     method : 'get',
        //     url: 'http://arqui8.ing.puc.cl/api/v1/private/news/1',
        //     headers: {
        //       'Authorization': 'Bearer ' + $sessionStorage.currentUser.token
        //     }
        //   }).success(function(data, textStatus, xhr) {
        //       console.log(data);
        //   }).error(function(data, textStatus, xhr) {
        //       console.log(data);
        //       console.log("error: get-fail");
        //   });
      }
      else{
        console.log("error: el currentUser no definido");
      }
    };
  }
})();
