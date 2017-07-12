import appState from './app-state';
import utils from './utils';

class CartItemModel {
  constructor (attributes, options={}) {
    this.attributes = attributes;

    Object.defineProperty(this.attributes, 'productModel', {
      get: () => {
        return appState.get('productCollection').get(this.attributes.id)
      }
    });

    this.onChange = options.onChange || utils.func.noop;
  }

  get (key) {
    return this.attributes[key];
  }

  set (key, value) {
    this.attributes[key] = value;

    this.onChange();
  }

  increment () {
    if (this.get('quantity') < this.get('productModel').get('quantity')) {
      this.set('quantity', this.get('quantity') + 1)
    }
  }

  decrement () {
    if (this.get('quantity') > 0) {
      this.set('quantity', this.get('quantity') - 1)
    }
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
