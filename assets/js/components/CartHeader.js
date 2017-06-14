import React from 'react';
import cartStore from './../cart-store';

function CartHeader (props) {
  return (
    <div className="cart__header">
      <h1 className="cart-header__title">Cart</h1>
      <div className="cart-header__actions">
        <a href="#" className="cart-header__action" onClick={cartStore.clear.bind(cartStore)}>Empty Cart</a>
      </div>
    </div>
  );
}

export default CartHeader;
