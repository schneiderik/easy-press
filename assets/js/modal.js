class Modal {
  constructor() {
    this.el = this.createElement();
    this.htmlElement = document.getElementsByTagName('html')[0];
  }

  createElement() {
    let el = document.createElement('div');

    this.contentContainer = this.createContentContainer();
    this.dismissBar = this.createDismissBar();

    el.className = 'quick-look-modal';
    el.appendChild(this.dismissBar);
    el.appendChild(this.contentContainer);

    return el;
  }

  createContentContainer() {
    let el = document.createElement('div');

    el.className = 'quick-look-modal__content';

    return el;
  }

  createDismissBar() {
    let el = document.createElement('div');

    this.dismissLink = this.createDismissLink();

    el.className = 'quick-look-modal__dismiss-bar';
    el.appendChild(this.dismissLink);

    return el;
  }

  createDismissLink() {
    let el = document.createElement('div');

    el.className = 'quick-look-modal__dismiss-link';
    el.innerHTML = '&times;';

    return el;
  }

  setContent(content) {
    this.contentContainer.innerHTML = content;
  }

  open() {
    if (!document.body.contains(this.el)) {
      document.body.appendChild(this.el);
    }

    this.lockScroll();
  }

  close() {
    if (document.body.contains(this.el)) {
      document.body.removeChild(this.el);
    }

    this.unlockScroll();
  }

  lockScroll() {
    this.htmlElement.classList.add('locked');
  }

  unlockScroll() {
    this.htmlElement.classList.remove('locked');
  }
}

export default Modal;
