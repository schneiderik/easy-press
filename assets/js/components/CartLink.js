import React from 'react';
import appState from './../app-state';

function CartLink () {
  const quantity = appState.get('cartItemCollection').quantity();

  return (
    <a className="cart-link" href={'/cart'}>
      Cart
      {quantity > 0 &&
        <span className="cart-link__count">{quantity}</span>
      }
    </a>
  );
}

export default CartLink;
