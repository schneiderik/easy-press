import React from 'react';
import utils from './../utils';

function CartFooter (props) {
  return (
    <div className="cart-footer">
      <div className="cart-footer__shipping-cost"><span>Shipping:</span> {utils.integer.toUSD(500)}</div>
      <div className="cart-footer__total-price"><span>Total:</span> {utils.integer.toUSD(1000)}</div>
    </div>
  );
}

export default CartFooter;
