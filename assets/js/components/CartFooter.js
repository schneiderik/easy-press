import React from 'react';
import appState from './../app-state';
import utils from './../utils';
import PayPalButton from './PayPalButton';

const CartFooter = () => {
  const cartItemCollection = appState.get('cartItemCollection');

  return (
    <div className="cart-footer">
      <div className="cart-footer__shipping-cost"><span>Shipping:</span> ${utils.integer.toUSD(cartItemCollection.shippingCost())}</div>
      <div className="cart-footer__total-price"><span>Total:</span> ${utils.integer.toUSD(cartItemCollection.totalPrice())}</div>
      {cartItemCollection.quantity() > 0 &&
        <PayPalButton />
      }
    </div>
  );
}

export default CartFooter;
