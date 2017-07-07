import React from 'react';
import ProductListItem from './ProductListItem';

function ProductListing (props) {
  return (
    <div className="product-listing">
      {props.models.map(model =>
        <ProductListItem
          id={model.get('id')}
          name={model.get('name')}
          authors={model.get('authors')}
          imageSrc={model.get('images')[0]}
          quantity={model.get('quantity')}
        />
      )}
    </div>
  );
}

export default ProductListing;
