var _ = require('lodash');
var data = require('./data.json');

function getProducts() {
  return _.sortBy(data.products, 'order');
}

function getProduct(slug) {
  return _.findWhere(data.products, {slug: slug});
}

function getCart() {
  return data.cart;
}

module.exports = {
  getCart: getCart,
  getProducts: getProducts,
  getProduct: getProduct
};