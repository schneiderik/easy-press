import Misprint from './misprint';
import matchesSelector from './matches-selector.js';
import Modal from './modal';
import DelegatedEventRegistry from './delegated-event-registry';

let misprint = new Misprint();
let modal = new Modal();
let bodyEvents = new DelegatedEventRegistry(document.body, 'click', { // eslint-disable-line no-unused-vars
  '.quick-look-modal': handleClickModalOverlay,
  '.quick-look-modal__dismiss-link': window.history.back.bind(window.history),
  '.quick-look-trigger': handleClickModalTrigger
});

window.addEventListener('popstate', handlePopstate, false);
window.addEventListener('keydown', handleKeydown, false);

misprint.applyByDataAttribute();

function handlePopstate() {
  let productListing = document.querySelector('.products');

  // If you navigate to popstate in the history that is a product page, load it in a modal.
  if (window.location.pathname.match('/products/')) {
    fetchProductHTML(window.location.pathname);
  }

  // If you are on the product page and hit back, but the previous page was a popstate.
  if (window.location.pathname.match(/^\/$/) && !document.body.contains(productListing)) {
    window.location = '/';
  }

  // If you press back while looing at the modal
  if (window.history.state === null) {
    modal.close();
  }
}

function handleClickModalTrigger(event, target) {
  let currentState = window.history.state;

  window.history.pushState(currentState, 'Product Page', target.href);
  fetchProductHTML(target.href);

  event.preventDefault();
}

function handleClickModalOverlay(event) {
  let target = event.target || event.srcElement;

  console.log(target);

  if (matchesSelector(target, '.quick-look-modal__dismiss-bar, .quick-look-modal__content, .quick-look-modal__content *')) {
    return;
  }

  window.history.back();
}

function handleKeydown(event) {
  if (event.keyCode === 27) {
    window.history.back();
    modal.close();
  }
}

function fetchProductHTML(path) {
  window.fetch(path)
    .then(function (response) {
      return response.text();
    }).then(function (html) {
      let product;
      product = html.match(/(<article id="product">(.|\n)*<\/article>)/)[0];

      modal.setContent(product);
      modal.open();
    });
}
