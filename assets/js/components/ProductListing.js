import React from 'react';
import ProductListItem from './ProductListItem';

function ProductListing (props) {
  return (
    <div className="product-listing">
      {props.products.map(product =>
        <ProductListItem
          slug={product.slug}
          title={product.name}
          authors={product.authors}
          imageSrc={product.images[0]}
        />
      )}
    </div>
  );
}

export default ProductListing;
