var _ = require('lodash');
var data = require('./data.json');

function getProducts() {
  return data.products;
};

function getProduct(slug) {
  return _.findWhere(data.products, {slug: slug});
}

module.exports = {
  getProducts: getProducts,
  getProduct: getProduct
};
