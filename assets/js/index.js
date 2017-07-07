import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import quantityStore from './quantity-store';
import cartStore from './cart-store';
import ProductBrowser from './components/ProductBrowser';
import CartLink from './components/CartLink';
import AddToCart from './components/AddToCart';
import Cart from './components/Cart';
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

quantityStore.get((err, quantities) => {
  if (err) {
    console.error(err);

    return;
  }

  appState.productCollection.updateQuantities(quantities);
  appState.cartItemCollection.updateQuantities(quantities);
    
  renderProductBrowser();
  renderCartComponents();
})
