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

function add (id) {
  let quantity = get(id);

  quantity != null
    ? set(id, ++quantity)
    : set(id, 1);
}

function remove (id) {
  const cart = Object.assign({}, get());

  delete cart[id];

  set(cart);
}

function decrement (id) {
  let quantity = get(id) || 0;

  quantity !== 0 && set(id, --quantity);
}

function adjust (availability) {
  const cart = get();

  Object.keys(cart).forEach(id => {
    console.log(id, cart, availability);
    if (cart[id] > availability[id]) {
      cart[id] = availability[id];
    }
  });

  set(cart);
}

function clear () {
  set({});
}

export default {
  get,
  add,
  remove,
  increment: add,
  decrement,
  adjust,
  clear
};
