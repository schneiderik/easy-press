var express = require('express');
var expressHandlebars = require('express-handlebars');

var app = express();

app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
  partialsDir: './views/partials/'
}));

app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.render('index');
});

app.listen(3000);
