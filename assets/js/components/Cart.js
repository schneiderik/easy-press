import React from 'react';
import CartHeader from './CartHeader';
import CartItemListing from './CartItemListing';
import CartFooter from './CartFooter';

function Cart () {
  return (
    <div className="cart">
      <CartHeader />
      <CartItemListing />
      <CartFooter />
    </div>
  );
}

export default Cart;
