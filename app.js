var express = require('express');
var expressHandlebars = require('express-handlebars');
var database = require('./lib/database');
var templateHelpers = require('./lib/template-helpers');

var app = express();

app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
  partialsDir: './views/partials/'
}));

app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  var products = database.getProducts();

  res.render('index', {
    title: 'Easy Press',
    products: products,
    helpers: templateHelpers
  });
});

app.get('/products/:slug', function (req, res) {
  var product = database.getProduct(req.params.slug);

  res.render('product', {
    title: 'Easy Press: ' + product.name,
    product: product
  });
});

app.listen(3000);
