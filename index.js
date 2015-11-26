var express = require('express');
var morgan = require('morgan');

var app = express();
app.use(morgan('dev'));

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('public/index.html');
});

app.get('*', function(req, res) {
  res.redirect('/');
});

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Express.js server is only for local development.");
  console.log('Running at http://%s:%s', host, port);
});
