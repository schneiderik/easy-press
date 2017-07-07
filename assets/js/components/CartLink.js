import React from 'react';
import appState from './../app-state';

function CartLink () {
  return (
    <a className="cart-link" href={'/cart'}>
      Cart
      {appState.cartItemCollection.quantity() > 0 &&
        <span className="cart-link__count">{appState.cartItemCollection.quantity()}</span>
      }
    </a>
  );
}

export default CartLink;
