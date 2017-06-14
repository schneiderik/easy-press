import React from 'react';
import CheckboxGroup from './CheckboxGroup';

class ProductFilters extends React.Component {
  constructor(props) {
    super(props);

    this.handleCheckboxGroupChange = this.handleCheckboxGroupChange.bind(this);
  }

  handleCheckboxGroupChange(name, value) {
    let filters = Object.create(this.props.filters);

    filters[name] = value;

    this.props.onChange(filters);
  }
        
  render() {
    return (
      <div className="product-filters">
        <CheckboxGroup
          title="Categories"
          name="categories"
          values={this.props.categories.sort()}
          checkedValues={this.props.filters.categories}
          onChange={this.handleCheckboxGroupChange}
        />

        <CheckboxGroup
          title="Authors"
          name="authors"
          values={this.props.authors.sort()}
          checkedValues={this.props.filters.authors}
          onChange={this.handleCheckboxGroupChange}
        />
      </div>
    );
  }
}

export default ProductFilters;
