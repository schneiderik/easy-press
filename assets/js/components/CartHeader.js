import React from 'react';
import appState from './../app-state';
import utils from './../utils';

function CartHeader (props) {
  const cartItemCollection = appState.get('cartItemCollection');

  return (
    <div className="cart__header">
      <h1 className="cart-header__title">Cart</h1>
      <div className="cart-header__actions">
        {cartItemCollection.models.length > 0 &&
          <a className="cart-header__action" onClick={cartItemCollection.clear.bind(cartItemCollection)}>Empty Cart</a>
        }
      </div>
    </div>
  );
}

export default CartHeader;
