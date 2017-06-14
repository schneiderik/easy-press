import React from 'react';
import ProductFilters from './ProductFilters';
import ProductListing from './ProductListing';
import ProductCollection from './../product-collection';
import utils from './../utils';

class ProductBrowser extends React.Component {
  constructor(props) {
    super(props);

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.productCollection = new ProductCollection();

		this.state = {
			filteredProducts: this.productCollection.products,
      filters: {
        inStock: null,
        categories: [],
        authors: []
      }
		};
  }

  handleFilterChange(filters) {
    this.setState({
      filters: filters,
      filteredProducts: this.productCollection.filter(filters)
    });
  }

  render() {
    return (
      <div className="product-browser">
        <ProductFilters
          filters={this.state.filters}
          authors={this.productCollection.authors()}
          categories={this.productCollection.categories()}
          onChange={this.handleFilterChange}
        />

        <ProductListing
          products={this.state.filteredProducts}
        />
      </div>
    );
  }
}

export default ProductBrowser;
