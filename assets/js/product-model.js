import appState from './app-state';
import utils from './utils';

class ProductModel {
  constructor (attributes, options={}) {
    this.attributes = attributes;
    this.onChange = options.onChange || utils.func.noop;

    Object.defineProperty(this.attributes, 'cartItemModel', {
      get: () => {
        return appState.get('cartItemCollection').get(this.attributes.id)
      }
    });

    Object.defineProperty(this.attributes, 'eligibleQuantity', {
      get: () => {
        const quantityInCart = this.get('cartItemModel') ? this.get('cartItemModel').get('quantity') : 0;

        return this.get('quantity') - quantityInCart;
      }
    });

    Object.defineProperty(this.attributes, 'quantity', {
      enumerable: true,
      writeable: true,
      get: () => {
        return this.quantity;
      },
      set: (value) => {
        const cartItemModel = this.get('cartItemModel');

        if (cartItemModel) {
          cartItemModel.set('quantity', Math.min(cartItemModel.get('quantity'), value));
        }

        this.quantity = value;
      }
    });
  }

  get (key) {
    return this.attributes[key];
  }

  set (key, value) {
    this.attributes[key] = value;

    this.onChange();
  }
}

export default ProductModel;
