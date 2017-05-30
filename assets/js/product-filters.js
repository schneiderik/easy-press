import React from 'react';
import CheckboxInput from './checkbox-input.js';
import CheckboxGroup from './checkbox-group.js';

class ProductFilters extends React.Component {
  constructor(props) {
    super(props);

    this.handleCheckboxInputChange = this.handleCheckboxInputChange.bind(this);
  }

  handleCheckboxInputChange(value, isChecked, name) {
    this.props.onChange(value, isChecked, name);
  }

  render() {
    return (
      <div className="product-filters">
        <CheckboxInput
          label="In Stock"
          id="in-stock-true"
          name="inStock"
          value="true"
          isChecked={this.props.filters.inStock === "true"}
          onChange={this.handleCheckboxInputChange}
        />

        <CheckboxGroup
          title="Categories"
          name="category"
          values={this.props.categories.sort()}
          checkedValues={[...this.props.filters.category]}
          onChange={this.handleCheckboxInputChange}
        />

        <CheckboxGroup
          title="Authors"
          name="author"
          values={this.props.authors.sort()}
          checkedValues={[...this.props.filters.author]}
          onChange={this.handleCheckboxInputChange}
        />
      </div>
    );
  }
}

export default ProductFilters;
