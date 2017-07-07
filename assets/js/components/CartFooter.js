import React from 'react';
import utils from './../utils';
import cartStore from './../cart-store';
import productCollection from './../product-collection';
import PayPalButton from './PayPalButton';

const CartFooter = () => {
  const cart = cartStore.get();

  return (
    <div className="cart-footer">
      <div className="cart-footer__shipping-cost"><span>Shipping:</span> ${utils.integer.toUSD(utils.cart.shippingCost(cart, productCollection))}</div>
      <div className="cart-footer__total-price"><span>Total:</span> ${utils.integer.toUSD(utils.cart.totalPrice(cart, productCollection))}</div>
      {utils.cart.quantity(cart) > 0 &&
        <PayPalButton />
      }
    </div>
  );
}

export default CartFooter;
