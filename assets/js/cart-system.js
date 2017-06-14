import React from 'react';
import ReactDOM from 'react-dom';
import cartStore from './cart-store';
import CartLink from './components/CartLink';
import AddToCartLink from './components/AddToCartLink';
import Cart from './components/Cart';

const cartLinkContainer = document.getElementById('cart-link');
const cartContainer = document.getElementById('cart');
const addToCartLinkContainer = document.getElementById('add-to-cart-link');

function renderAddToCartLink () {
  addToCartLinkContainer && ReactDOM.render(
    <AddToCartLink slug={addToCartLinkContainer.dataset.slug} />,
    addToCartLinkContainer
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

export default () => {
  cartStore.init(function () {
    renderCartLink();
    renderCart();
  });

  renderAddToCartLink();
  renderCartLink();
  renderCart();
}
