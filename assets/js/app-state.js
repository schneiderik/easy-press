import ProductCollection from './product-collection';
import CartItemCollection from './cart-item-collection';

console.log(ProductCollection, CartItemCollection);

export default {
  productCollection: new ProductCollection(),
  cartItemCollection: new CartItemCollection()
};
