import React from 'react';
import ReactDOM from 'react-dom';
import CartLink from './cart-link';
import ProductBrowser from './product-browser';
import data from './../../data/data.json';

const productBrowserContainer = document.getElementById('product-browser');
const cartLinkContainer = document.getElementById('cart-link');

if (productBrowserContainer) {
  ReactDOM.render(
    <ProductBrowser products={data.products} />,
    productBrowserContainer
  );
}

if (cartLinkContainer) {
  ReactDOM.render(
    <CartLink />,
    document.getElementById('cart-link')
  );
}
