import React from 'react';
import ProductFilters from './product-filters';
import ProductListing from './product-listing';

class ProductBrowser extends React.Component {
  constructor(props) {
    super(props);

    this.handleFilterChange = this.handleFilterChange.bind(this);

		this.state = {
			filteredProducts: this.props.products
		};
  }

  filterProducts(filters) {
    return this.props.products.filter(product => {
      return filters.every(key => {
        if (key === 'in-stock') {
          return product.quantity > 0;
        } else {
          return filters[key].every(condition => {
            return product[key].includes(condition);
          });
        } 
      });
    });
  }

  onFilterChange(filters) {
    this.setState({
      filteredProducts: this.filterProducts(filters)
    });
  }

  render() {
    return (
      <div className="product-browser">
        <ProductFilters products={this.props.products} onFilterChange={this.handleFilterChange}/>
        <ProductListing products={this.state.filteredProducts} />
      </div>
    );
  }
}

export default ProductBrowser;
