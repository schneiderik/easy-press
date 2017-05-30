import React from 'react';
import ProductFilters from './product-filters';
import ProductListing from './product-listing';
import ProductCollection from './product-collection';

class ProductBrowser extends React.Component {
  constructor(props) {
    super(props);

    this.productCollection = new ProductCollection(this.props.products);
    this.authors = this.productCollection.valuesFor('author');
    this.categories = this.productCollection.valuesFor('category');
    this.handleFilterChange = this.handleFilterChange.bind(this);

		this.state = {
			filteredProducts: this.productCollection.models,
      filters: {
        inStock: null,
        category: new Set(),
        author: new Set()
      }
		};
  }

  handleFilterChange(value, isChecked, name) {
    this.setState((prevState, props) => {
      let filters = Object.assign({}, prevState.filters);

      if (filters[name] instanceof Set) {
        isChecked ? filters[name].add(value) : filters[name].delete(value);
      } else {
        filters[name] = isChecked ? value : null;
      }

      return {
        filters: filters,
        filteredProducts: this.productCollection.filterBy(filters)
      }
    });
  }

  render() {
    return (
      <div className="product-browser">
        <ProductFilters
          filters={this.state.filters}
          authors={this.authors}
          categories={this.categories}
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
