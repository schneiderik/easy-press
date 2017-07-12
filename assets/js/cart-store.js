const CART_KEY = 'cart';

function get (id) {
  const cart = JSON.parse(localStorage.getItem(CART_KEY) || '{}')

  return id ? cart[id] : cart;
}

function set (id, value) {
  const obj = typeof id === 'string'
    ? Object.assign({}, get(), {[id]: value})
    : id;

  localStorage.setItem(CART_KEY, JSON.stringify(obj));
}

export default {
  get,
  set
};
