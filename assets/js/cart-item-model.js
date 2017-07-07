import appState from './app-state';
import utils from './utils';

class CartItemModel {
  constructor (attributes) {
    this.attributes = attributes;

    Object.defineProperty(this.attributes, 'productModel', {
      get: () => {
        return appState.productCollection.get(this.attributes.id)
      }
    });
  }

  get (key) {
    return this.attributes[key];
  }

  set (key, value) {
    this.attributes[key] = value;
  }

  toPayPalItem () {
    return {
      sku: this.get('id'),
      name: this.get('productModel').get('name'),
      quantity: this.get('quantity'),
      price: utils.integer.toUSD(this.get('productModel').get('unitPrice')),
      currency: 'USD'
    }
  }
}

export default CartItemModel;
