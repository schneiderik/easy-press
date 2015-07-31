var express = require('express');
var expressHandlebars = require('express-handlebars');
var cookieParser = require('cookie-parser');
var database = require('./lib/database');
var templateHelpers = require('./lib/template-helpers');

var app = express();

app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
  partialsDir: './views/partials/'
}));

app.set('view engine', 'handlebars');

app.use(cookieParser());

app.get('/', function (req, res) {
  var products = database.getProducts();
  var cart = req.cookies.easyCart;

  res.render('index', {
    title: 'Easy Press',
    products: products,
    cart: cart,
    helpers: templateHelpers
  });
});

app.get('/products/:slug', function (req, res) {
  var product = database.getProduct(req.params.slug);
  var cart = req.cookies.easyCart;

  res.render('product', {
    title: 'Easy Press: ' + product.name,
    product: product,
    cart: cart
  });
});

app.listen(3000);
