import Misprint from './misprint';

let misprint = new Misprint();

misprint.applyByDataAttribute();

function isQuickLookLink(node) {
  return node.tagName === 'A' && node.className.match(/quick-look/);
}

function isQuickLookModalOverlayContent(node) {
  return node.tagName === 'DIV' && node.className.match(/quick-look-modal__content/);
}

function isQuickLookModalOverlayDismissBar(node) {
  return node.tagName === 'DIV' && node.className.match(/quick-look-modal__dismiss-bar/);
}

function isQuickLookModalOverlay(node) {
  return node.tagName === 'DIV' && node.className.match(/quick-look-modal/);
}

function handleBodyClick(event) {
  let currentState = window.history.state;
  let target = event.target || event.srcElement;

  while (true) { // eslint-disable-line no-constant-condition
    if (target == null) { return; }
    if (target === event.currentTarget) { return; }
    if (isQuickLookModalOverlayContent(target)) { return; }
    if (isQuickLookModalOverlayDismissBar(target)) { return; }
    if (isQuickLookLink(target)) {
      window.history.pushState(currentState, 'Product Page', target.href);
      openQuickLookModal(target.href);
      break;
    }
    if (isQuickLookModalOverlay(target)) {
      closeQuickLookModal();
      break;
    }

    target = target.parentNode;
  }

  event.preventDefault();
}

function handleKeydown(event) {
  if (event.keyCode === 27) {
    closeQuickLookModal();
  }
}

function addClass(el, className) {
  if (el.className.search(className) === -1) {
    el.className += ' ' + className;
  }
}

function removeClass(el, className) {
  el.className = el.className.replace(' ' + className, '');
}

function closeQuickLookModal() {
  let quickLookModal = document.querySelector('.quick-look-modal');

  if (quickLookModal) {
    quickLookModal.remove();
    window.history.back();
    removeClass(document.getElementsByTagName('html')[0], 'locked');
  }
}

function openQuickLookModal(path) {
  window.fetch(path)
    .then(function (response) {
      return response.text();
    }).then(function (html) {
      let quickLookModal = document.createElement('div');
      let quickLookModalContent = document.createElement('div');
      let quickLookModalDismissBar = document.createElement('div');
      let quickLookModalDismiss = document.createElement('div');
      let product;

      product = html.match(/(<article id="product">(.|\n)*<\/article>)/)[0];

      quickLookModal.className = 'quick-look-modal';
      quickLookModalContent.className = 'quick-look-modal__content';
      quickLookModalDismissBar.className = 'quick-look-modal__dismiss-bar';
      quickLookModalDismiss.className = 'quick-look-modal__dismiss';
      quickLookModalDismiss.innerHTML = '&times;';
      quickLookModal.appendChild(quickLookModalContent);
      quickLookModalContent.innerHTML = product;
      quickLookModalDismissBar.appendChild(quickLookModalDismiss);
      quickLookModalContent.appendChild(quickLookModalDismissBar);

      addClass(document.getElementsByTagName('html')[0], 'locked');

      document.body.appendChild(quickLookModal);
    });
}

window.addEventListener('popstate', function () {
  let quickLookModal = document.querySelector('.quick-look-modal');
  let productListing = document.querySelector('.products');

  if (window.location.pathname.match('/portfolio/')) {
    openQuickLookModal(window.location.pathname);
  }

  if (window.location.pathname.match(/^\/$/) && !document.body.contains(productListing)) {
    window.location = '/';
  }

  if (window.history.state === null) {
    if (quickLookModal) {
      quickLookModal.remove();
    }
  }
}, false);

document.body.addEventListener('click', handleBodyClick, false);

window.addEventListener('keydown', handleKeydown, false);
