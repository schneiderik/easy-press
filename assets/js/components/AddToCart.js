import React from 'react';
import appState from './../app-state';
import AddToCartLink from './AddToCartLink';
import ProductAvailability from './ProductAvailability';

function AddToCart (props) {
  const productModel = appState.productCollection.get(props.productId);

  return (
    <div>
      <AddToCartLink productModel={productModel} />
      <ProductAvailability availability={productModel.eligibleQuantity()} />
    </div>
  );
}

export default AddToCart;
