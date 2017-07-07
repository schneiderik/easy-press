import appState from './app-state';

class ProductModel {
  constructor (attributes) {
    this.attributes = attributes;

    Object.defineProperty(this.attributes, 'cartItemModel', {
      get: () => {
        return appState.cartItemCollection.get(this.attributes.id)
      }
    });

    Object.defineProperty(this.attributes, 'eligibleQuantity', {
      get: () => {
        const quantityInCart = this.get('cartItemModel') ? this.get('cartItemModel').get('quantity') : 0;

        return this.get('quantity') - quantityInCart;
      }
    });
  }

  get (key) {
    return this.attributes[key];
  }

  set (key, value) {
    this.attributes[key] = value;
  }
}

export default ProductModel;
