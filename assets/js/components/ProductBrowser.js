import React from 'react';
import ProductFilters from './ProductFilters';
import ProductListing from './ProductListing';
import productCollection from './../product-collection';

class ProductBrowser extends React.Component {
  constructor(props) {
    super(props);

    this.handleFilterChange = this.handleFilterChange.bind(this);

		this.state = {
      filteredModels: productCollection.models,
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
      filteredModels: productCollection.filter(filters)
    });
  }

  render() {
    return (
      <div className="product-browser">
        <ProductFilters
          filters={this.state.filters}
          authors={productCollection.authors()}
          categories={productCollection.categories()}
          onChange={this.handleFilterChange}
        />

        <ProductListing
          models={this.state.filteredModels}
        />
      </div>
    );
  }
}

export default ProductBrowser;
