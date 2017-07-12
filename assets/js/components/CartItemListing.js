import React from 'react';
import appState from './../app-state';
import utils from './../utils';
import CartItem from './CartItem';

function CartItemListing () {
  const cartItemCollection = appState.get('cartItemCollection');

  if (cartItemCollection.models.length > 0) {
    return (
      <div className="cart-item-listing">
        {cartItemCollection.models.map(model => <CartItem model={model} />)}
      </div>
    );
  } else {
    return (
      <div className="cart-item-listing cart-item-listing--empty">
        Your cart is empty.
      </div>
    )
  }
}

export default CartItemListing;
