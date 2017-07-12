var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var redis = require("redis");

var client = redis.createClient('11255', "barreleye.redistogo.com");
var app = express();

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());

client.auth("b971ee55a0f83079e4a6e344647711b3");
client.on("error", function (err) {
  console.log("Error " + err);
});

app.get('/', function (req, res) {
  res.sendFile('/index.html', {root: './public'});
});

app.get('/about', function (req, res) {
  res.sendFile('/about.html', {root: './public'});
});

app.get('/thank-you', function (req, res) {
  res.sendFile('/thank-you.html', {root: './public'});
});

app.get('/cart', function (req, res) {
  res.sendFile('/cart.html', {root: './public'});
});

app.get('/product/:id', function (req, res) {
  res.sendFile('/product/' + req.params.id + '.html', {root: './public'});
});

app.get('/stock', function (req, res) {
  client.hgetall('stock', function (err, reply) {
    let stock = err ? {} : reply;

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(stock));
  });
});

app.get('/stock/:id', function (req, res) {
  client.hget('stock', req.params.id, function (err, reply) {
    let quantity = err ? '0' : reply;

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(quantity));
  });
});

app.post('/stock', function (req, res) {
  client.hmset('stock', req.body);

  res.setHeader('Content-Type', 'application/json');
  res.send({success: true});
});

app.listen(process.env.PORT || 3000);
