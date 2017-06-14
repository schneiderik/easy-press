import React from 'react';
import cartStore from './../cart-store';

function AddToCartLink (props) {
  return (
    <a className="add-to-cart-link" onClick={cartStore.increaseQuantity.bind(cartStore, props.slug)}>
      Add to Cart
    </a>
  );
}

export default AddToCartLink;
