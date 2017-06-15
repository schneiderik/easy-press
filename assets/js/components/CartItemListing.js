import React from 'react';
import cartStore from './../cart-store';
import { products } from './../../../data/data.json';
import CartItem from './CartItem';

function CartItemListing () {
  let keys = Object.keys(cartStore.get());

  if (keys.length) {
    return (
      <div className="cart-item-listing">
        {keys.map(key => {
          let product = products.find(p => p.slug === key);

          return <CartItem
            slug={product.slug}
            name={product.name}
            authors={product.authors}
            imageSrc={product.images[0]}
            unitPrice={product.unitPrice}
            quantity={cartStore.get(product.slug).quantity}
          />
        })}
      </div>
    );
  } else {
    return (
      <div className="cart-item-listing--empty">Your cart is empty.</div>
    )
  }
}

export default CartItemListing;
