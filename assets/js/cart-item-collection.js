import CartItemModel from './cart-item-model';
import cartStore from './cart-store';
import utils from './utils';

class CartItemCollection {
  constructor (options={}) {
    this.models = [];

    this.onUpdate = options.onUpdate
      ? () => {
        cartStore.set(this.collect('quantity'));
        options.onUpdate();
      }
      : utils.func.noop;

    Object.keys(cartStore.get()).map(id => {
      this.push({id, quantity: parseInt(cartStore.get(id))}, true)
    });
  }

  get (id) {
    if (typeof id === 'string') {
      return this.models.find(m => m.get('id') === id);
    } else if (Array.isArray(id)) {
      return this.models.reduce((acc, m) => {
        if (id.indexOf(m.get('id')) !== -1) {
          acc.push(m);
        }

        return acc;
      }, []);
    }
  }

  push ({id, quantity}, silent) {
    this.models.push(new CartItemModel({id, quantity}, {
      onChange: this.onUpdate.bind(this)
    }));

    if (!silent) this.onUpdate();
  }

  add ({id, quantity}, silent) {
    if (this.get(id)) {
      this.get(id).increment();
    } else {
      this.push({id, quantity}, silent);
    }
  }

  clear () {
    this.models = [];

    this.onUpdate();
  }

  remove (id) {
    const model = this.get(id);

    this.models.splice(this.models.indexOf(model), 1);

    this.onUpdate();
  }

  quantity () {
    return this.models.reduce((acc, m) => acc + m.get('quantity'), 0);
  }

  shippingCost () {
    return this.models.reduce((acc, m) => {
      if (m.get('quantity') > 0) {
        return Math.max(acc, m.get('productModel').get('shippingCost'));
      } else {
        return acc;
      }
    }, 0);
  }

  subtotal () {
    return this.models.reduce((acc, m) => {
      return acc + (m.get('productModel').get('unitPrice') * m.get('quantity'));
    }, 0);
  }

  totalPrice () {
    return this.shippingCost() + this.subtotal();
  }

  collect (attr) {
    return this.models.reduce((acc, m) => {
      acc[m.get('id')] = m.get(attr);
      
      return acc;
    }, {});
  }

  toPayPalItems () {
    return this.models.map(m => {
      return m.toPayPalItem();
    });
  }
}

export default CartItemCollection;
