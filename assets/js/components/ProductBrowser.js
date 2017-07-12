import React from 'react';
import appState from './../app-state';
import ProductFilters from './ProductFilters';
import ProductListing from './ProductListing';

class ProductBrowser extends React.Component {
  constructor(props) {
    super(props);

    this.productCollection = appState.get('productCollection');

    this.handleFilterChange = this.handleFilterChange.bind(this);

		this.state = {
      filteredModels: this.productCollection.models,
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
      filteredModels: this.productCollection.filter(filters)
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
          models={this.state.filteredModels}
        />
      </div>
    );
  }
}

export default ProductBrowser;
