import React from 'react';
import cartStore from './../cart-store';
import productCollection from './../product-collection';
import utils from './../utils';
import CartItem from './CartItem';

function CartItemListing () {
  if (utils.cart.quantity(cartStore.get()) > 0) {
    return (
      <div className="cart-item-listing">
        {productCollection.get(Object.keys(cartStore.get())).map(model => {
          return <CartItem
            id={model.get('id')}
            name={model.get('name')}
            authors={model.get('authors')}
            imageSrc={model.get('images')[0]}
            unitPrice={model.get('unitPrice')}
            quantity={cartStore.get(model.get('id'))}
          />
        })}
      </div>
    );
  } else {
    return (
      <div className="cart-item-listing cart-item-listing--empty">Your cart is empty.</div>
    )
  }
}

export default CartItemListing;
