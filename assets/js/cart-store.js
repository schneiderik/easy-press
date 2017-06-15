const CART_KEY = 'cart';
const DEFAULT_STORE = {};

let store, onSet;

function get (key) {
  if (key) {
    return store[key];
  } else {
    return store;
  }
}

function set (obj) {
  localStorage.setItem(CART_KEY, JSON.stringify(obj));
  store = obj;

  if (onSet) {
    onSet(obj);
  }
}

function clear () {
  set(DEFAULT_STORE);
}

function clean () {
  Object.keys(store).forEach(key => {
    if (store[key].quantity === 0) {
      remove(key);
    }
  });
}

function add (key, unitPrice, shippingCost) {
  if (typeof store[key] === 'undefined') {
    store[key] = {
      quantity: 1,
      shippingCost: shippingCost,
      unitPrice: unitPrice
    };
  }

  set(store);
}

function remove (key) {
  if (typeof store[key] !== 'undefined') {
    delete store[key];
  }

  set(store);
}

function increaseQuantity (key) {
  if (typeof store[key] === 'undefined') {
    add(key) 
  } else {
    store[key].quantity++;

    set(store);
  }
}

function decreaseQuantity (key) {
  if (store[key] && store[key].quantity > 0) {
    store[key].quantity--;
  }

  set(store);
}

function setQuantity (key, quantity) {
  if (quantity >= 0) {
    store[key].quantity = quantity;
  }

  set(store);
}

function totalQuantity () {
  return Object.keys(store).reduce((acc, key) => {
    return acc + store[key].quantity;
  }, 0)
}

function shippingCost () {
  return Object.keys(store).reduce((acc, key) => {
    return Math.max(acc, store[key].shippingCost);
  }, 0)
}

function totalPrice () {
  return Object.keys(store).reduce((acc, key) => {
    acc = acc + (store[key].unitPrice * store[key].quantity);

    return acc;
  }, 0) + shippingCost();
}

export default {
  init: function (callback) {
    if (!localStorage.getItem(CART_KEY)) {
      localStorage.setItem(CART_KEY, JSON.stringify(DEFAULT_STORE));
    }

    store = JSON.parse(localStorage.getItem(CART_KEY));

    clean();

    onSet = callback;
  },
  get,
  clear,
  add,
  remove,
  increaseQuantity,
  decreaseQuantity,
  setQuantity,
  totalQuantity,
  shippingCost,
  totalPrice
};
