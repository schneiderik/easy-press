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

app.use(express.static('public'));
app.use(cookieParser());

app.get('/', function (req, res) {
  var products = database.getProducts();
  var cart = req.cookies.easyCart;

  res.render('index', {
    currentPageId: 'products',
    title: 'Easy Press',
    products: products,
    cart: cart,
    helpers: templateHelpers
  });
});

app.get('/about', function (req, res) {
  var cart = req.cookies.easyCart;

  res.render('about', {
    currentPageId: 'about',
    title: 'Easy Press: About',
    cart: cart,
    helpers: templateHelpers
  });
});

app.get('/printing', function (req, res) {
  var cart = req.cookies.easyCart;

  res.render('printing', {
    currentPageId: 'printing',
    title: 'Easy Press: Printing',
    cart: cart,
    helpers: templateHelpers
  });
});

app.get('/token', function (req, res) {
  var cart = req.cookies.easyCart;

  res.render('token', {
    currentPageId: 'token',
    title: 'Easy Press: Token',
    cart: cart,
    helpers: templateHelpers
  });
});

app.get('/portfolio/:slug', function (req, res) {
  var product = database.getProduct(req.params.slug);
  var cart = req.cookies.easyCart;

  res.render('product', {
    currentPageId: 'product',
    title: 'Easy Press: ' + product.name,
    product: product,
    cart: cart,
    helpers: templateHelpers
  });
});

app.listen(process.env.PORT || 3000)
