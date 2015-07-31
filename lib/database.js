var _ = require('lodash');
var data = require('./data.json');

function getProducts() {
  return data.products;
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
