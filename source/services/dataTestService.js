(function() {
  'use strict';

  angular.module('app')
         .service('dataTestService', dataTestService);

  function dataTestService($localStorage) {
    var self = this;
    //función generadora de semillas
    self.localStorage = $localStorage;

    //Parámetros
    self.tags = [
      { name : 'Internacional'},
      { name : 'Servicio'},
      { name : 'Economia'},
      { name : 'Politica'},
      { name : 'Policial'},
      { name : 'Musica'},
      { name : 'Deporte'},
      { name : 'Nacional'}
    ];

    self.sources = [
      'EL Mercurio',
      'La Tercera' ,
      'La Cuarta',
      'Publimetro',
      'La Segunda'
    ];

    self.images = [
      'http://www.ugodog.net/blog/wp-content/uploads/2008/08/beagles-buddy.thumbnail.jpg',
      'http://vignette2.wikia.nocookie.net/payday/images/e/ec/Pat-money.png/revision/latest?cb=20131118143736',
      'http://www.ugodog.net/blog/wp-content/uploads/2008/08/beagles-buddy.thumbnail.jpg',
      'http://vignette2.wikia.nocookie.net/payday/images/e/ec/Pat-money.png/revision/latest?cb=20131118143736'
    ];
    
    self.seed = function(index){
      self.localStorage.news = [];
      for (var i = 0; i < index; i++) {
        this.date = Math.floor(Math.random()*28 + 1)+'/'+Math.floor(Math.random()*12 +1)+'/20'+Math.floor(Math.random()*5 + 10);

        this.article = {
          title: "Noticia "+(i+1),
          review: 'Loren ipsu etc',
          url: 'http://www.noticia.cl/article'+i,
          image: self.images[Math.floor(Math.random()*4)],
          date: this.date,
          source: self.sources[Math.floor(Math.random()*5)],
          tags: []
        };
        for (var j = 0; j < 2; j++)
        {
          this.article.tags.push(self.tags[Math.floor(Math.random()*8)]);
        };
        self.localStorage.news.push(this.article);
      };
    };
    self.seed(12);

  }
})();
