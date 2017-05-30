class ProductModel {
  constructor(attributes) {
    this.attributes = attributes;
  }

  inStock() {
    return this.attributes.quantity > 0;
  }

  hasAttribute(key, value) {
    if (Array.isArray(this.attributes[key])) {
      return this.attributes[key].includes(value);
    } else {
      return this.attributes[key] === value;
    }
  }
}

export default ProductModel;
