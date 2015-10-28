var express = require('express');
var morgan = require('morgan');

var app = express();
app.use(morgan(':method :url :response-time'));

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('public/index.html');
});

app.get('/loaderio-8ff0572e29790644ee862cedc0eea8a7', function(req, res) {
	res.send('loaderio-8ff0572e29790644ee862cedc0eea8a7');
});

app.get('*', function(req, res) {
  res.redirect('/');
});

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Running at http://%s:%s', host, port);
});
