import React from 'react';
import Product from './product';

class ProductListing extends React.Component {
  constructor(props) {
    super(props);
  }

	products() {
		return this.props.products.map((product) => 
			<Product
        slug={product.attributes.slug}
        title={product.attributes.name}
        author={product.attributes.author}
        coverSrc={product.attributes.coverPhotoSrc}
      />
		);
	}

  render() {
    return (
      <div className="product-listing">
				{this.products()}
      </div>
    );
  }
}

export default ProductListing;
