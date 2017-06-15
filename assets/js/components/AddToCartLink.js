import React from 'react';
import cartStore from './../cart-store';
import { products } from './../../../data/data.json';

function handleClick (slug) {
  let product = products.find(p => p.slug === slug);

  if (cartStore.get(slug)) {
    cartStore.increaseQuantity(slug);
  } else {
    cartStore.add(slug, product.unitPrice, product.shippingCost);
  }
}

function AddToCartLink (props) {
  return (
    <a className="add-to-cart-link" onClick={() => {handleClick(props.slug)}}>
      Add to Cart
    </a>
  );
}

export default AddToCartLink;
