import React from 'react';
import CheckboxInput from './checkbox-input.js';
import CheckboxGroup from './checkbox-group.js';

function uniqueArray(ary) {
  return [...new Set(ary)];
}

function flattenArray(ary) {
  return ary.reduce(
    (acc, cur) => acc.concat(cur),
    []
  );
}

class ProductFilters extends React.Component {
  constructor(props) {
    super(props);
  }

  getProductProps(propName) {
    return uniqueArray(flattenArray(this.props.products.map(product => {
      return product[propName];
    })));
  }

  categoryInputs() {
    return this.getProductProps('category').map(category => 
      <CheckboxInput label={category} name="category" value={category} />
    );
  }

  authorInputs() {
    return this.getProductProps('author').map(author => 
      <CheckboxInput label={author} name="author" value={author} />
    );
  }

  render() {
    return (
      <div className="product-filters">
        <CheckboxInput label="In Stock" name="in-stock" value="true" />
        <CheckboxGroup title="Categories" inputs={this.categoryInputs()} />
        <CheckboxGroup title="Authors" inputs={this.authorInputs()} />
      </div>
    );
  }
}

export default ProductFilters;
