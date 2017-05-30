var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();

app.use(express.static('public'));
app.use(cookieParser());

app.get('/', function (req, res) {
  res.sendFile('/index.html', {root: './public'});
});

app.get('/about', function (req, res) {
  res.sendFile('/about.html', {root: './public'});
});

app.get('/product/:slug', function (req, res) {
  res.sendFile('/product/' + req.params.slug + '.html', {root: './public'});
});

app.listen(process.env.PORT || 3000);
