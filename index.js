var express = require('express');
var morgan = require('morgan');

var app = express();
app.use(morgan(':method :url :response-time'));

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('public/index.html');
});

app.get('/' + (process.env.LOADER_IO_TOKEN || 'echo'), function(req, res) {
	res.send(process.env.LOADER_IO_TOKEN);
});

app.get('*', function(req, res) {
  res.redirect('/');
});

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Running at http://%s:%s', host, port);
});
