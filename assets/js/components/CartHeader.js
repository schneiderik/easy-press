import React from 'react';
import cartStore from './../cart-store';
import utils from './../utils';

function CartHeader (props) {
  return (
    <div className="cart__header">
      <h1 className="cart-header__title">Cart</h1>
      <div className="cart-header__actions">
        {utils.cart.quantity(cartStore.get()) > 0 &&
          <a href="#" className="cart-header__action" onClick={cartStore.clear}>Empty Cart</a>
        }
      </div>
    </div>
  );
}

export default CartHeader;
