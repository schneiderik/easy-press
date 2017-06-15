import React from 'react';
import utils from './../utils';
import cartStore from './../cart-store';

function CartFooter (props) {
  return (
    <div className="cart-footer">
      <div className="cart-footer__shipping-cost"><span>Shipping:</span> {utils.integer.toUSD(cartStore.shippingCost())}</div>
      <div className="cart-footer__total-price"><span>Total:</span> {utils.integer.toUSD(cartStore.totalPrice())}</div>
    </div>
  );
}

export default CartFooter;
