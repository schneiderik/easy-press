import CartItemModel from './cart-item-model';
import cartStore from './cart-store';

class CartItemCollection {
  constructor () {
    this.models = Object.keys(cartStore.get()).map(id => {
      return new CartItemModel({
        id: id,
        quantity: parseInt(cartStore.get(id))
      });
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

  quantity () {
    return this.models.reduce((acc, m) => acc + m.get('quantity'), 0);
  }

  shippingCost () {
    return this.models.reduce((acc, m) => {
      return Math.max(acc, m.get('productModel').get('shippingCost'));
    }, 0);
  }

  subtotal () {
    return this.models.reduce((acc, m) => {
      return acc + (model.get('productModel').get('unitPrice') * model.get('quantity'));
    }, 0);
  }

  totalPrice () {
    return this.shippingCost() + this.subtotal();
  }

  toJSON () {
    return this.models.reduce((acc, m) => {
      acc[m.get('id')] = m.get('quantity');
      
      return acc;
    }, {});
  }

  toPayPalItems () {
    return this.models.map(m => {
      return m.toPayPalItem();
    });
  }

  updateQuantities (quantities) {
    this.models.forEach(model => {
      const quantity = parseInt(quantities[model.get('id')]);
      
      model.set('quantity', Math.min(model.get('quantity'), quantity))
    });
  }
}

export default CartItemCollection;
