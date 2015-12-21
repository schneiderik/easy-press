let _ = require('lodash');
let data = require('./data.json');

function getProducts() {
  return data.products;
};

function getProduct(slug) {
  return _.findWhere(data.products, {slug: slug});
}

export default {
  getProducts: getProducts,
  getProduct: getProduct
};
