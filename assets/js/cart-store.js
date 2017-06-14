const CART_KEY = 'cart';
const DEFAULT_STORE = {};

let store, onSet;

function get () {
  return store;
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
    if (store[key] === 0) {
      removeItem(key);
    }
  });
}

function add (key) {
  if (typeof store[key] === 'undefined') {
    store[key] = 1;
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
    store[key]++;

    set(store);
  }
}

function decreaseQuantity (key) {
  if (store[key] && store[key] > 0) {
    store[key]--;
  }

  set(store);
}

function setQuantity (key, quantity) {
  if (quantity >= 0) {
    store[key] = quantity;
  }

  set(store);
}

function totalQuantity () {
  return Object.keys(store).reduce((acc, key) => {
    return acc + store[key];
  }, 0)
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
  get: get,
  clear: clear,
  add: add,
  remove: remove,
  increaseQuantity: increaseQuantity,
  decreaseQuantity: decreaseQuantity,
  setQuantity: setQuantity,
  totalQuantity: totalQuantity
};
