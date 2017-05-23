import React from 'react';
import Product from './product';

class ProductListing extends React.Component {
  constructor(props) {
    super(props);
  }

	products() {
		return this.props.products.map((product) => 
			<Product slug={product.slug} title={product.name} author={product.author} coverSrc={product.coverPhotoSrc} />
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
