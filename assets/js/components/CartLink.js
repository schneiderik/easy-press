import React from 'react';
import cartStore from './../cart-store';

function CartLink () {
  const quantity = cartStore.totalQuantity();

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
