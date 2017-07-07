import React from 'react';

const ProductAvailability = props =>
  <div className="product-availability">
    {props.availability} left in stock.
  </div>;

export default ProductAvailability;
