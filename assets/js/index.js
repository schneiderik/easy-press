import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import ProductBrowser from './components/ProductBrowser';
import CartLink from './components/CartLink';
import AddToCart from './components/AddToCart';
import Cart from './components/Cart';
import ProductCollection from './product-collection';
import CartItemCollection from './cart-item-collection';
import appState from './app-state';

const productBrowserContainer = document.getElementById('product-browser');
const cartLinkContainer = document.getElementById('cart-link');
const cartContainer = document.getElementById('cart');
const addToCartContainer = document.getElementById('add-to-cart');

function renderProductBrowser () {
  productBrowserContainer && ReactDOM.render(
    <ProductBrowser />,
    productBrowserContainer
  );
}

function renderAddToCart () {
  addToCartContainer && ReactDOM.render(
    <AddToCart productId={addToCartContainer.dataset.id} />,
    addToCartContainer
  );
}

function renderCartLink () {
  cartLinkContainer && ReactDOM.render(
    <CartLink />,
    cartLinkContainer
  );
}

function renderCart () {
  cartContainer && ReactDOM.render(
    <Cart />,
    cartContainer
  );
}

function renderCartComponents () {
  renderAddToCart();
  renderCartLink();
  renderCart();
}

function renderApp () {
  renderProductBrowser();
  renderCartComponents();
}

appState.set('productCollection', new ProductCollection({
  onUpdate: renderApp
}));

appState.set('cartItemCollection', new CartItemCollection({
  onUpdate: renderApp
}));

renderApp();
