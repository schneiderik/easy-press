import React from 'react';
import appState from './../app-state';
import AddToCartLink from './AddToCartLink';
import ProductAvailability from './ProductAvailability';

function AddToCart (props) {
  const productModel = appState.get('productCollection').get(props.productId);

  return (
    <div>
      <AddToCartLink productModel={productModel} />
      {Boolean(productModel.get('eligibleQuantity')) &&
        <ProductAvailability availability={productModel.get('eligibleQuantity')} />}
    </div>
  );
}

export default AddToCart;
