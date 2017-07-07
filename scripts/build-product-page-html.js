var products = require('../data/products.json');
var Taft = require('taft');
var fs = require('fs');
var mkdirp = require('mkdirp');
var getDirName = require('path').dirname;

function writeFile(path, contents, callback) {
  mkdirp(getDirName(path), function (err) {
    if (err) return callback(err);

    fs.writeFile(path, contents, callback);
  });
}

products.forEach(function (product) {
  var options = {
      layouts: ['./assets/html/layout.hbs'],
      defaultLayout: 'layout',
      partials: './assets/html/partials/**/*',
      data: product,
      helpers: './../lib/handlebars-helpers.js',
  };

  var taft = new Taft(options);

  var result = taft.build('./assets/html/product.hbs');

  writeFile('./public/product/' + product.id + '.html', result._content, function(err) {
    if(err) {
        return console.log(err);
    }
  }); 
});
