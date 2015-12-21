(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.EasyApp = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _matchesSelectorJs = require('./matches-selector.js');

var _matchesSelectorJs2 = _interopRequireDefault(_matchesSelectorJs);

var DelegatedEventRegistry = (function () {
  function DelegatedEventRegistry(node, eventName, events) {
    _classCallCheck(this, DelegatedEventRegistry);

    this.events = events || {};
    node.addEventListener(eventName, this.handleEvent.bind(this), false);
  }

  _createClass(DelegatedEventRegistry, [{
    key: 'add',
    value: function add(selector, func) {
      this.events[selector] = func;
    }
  }, {
    key: 'handleEvent',
    value: function handleEvent(event) {
      var target = event.target || event.srcElement;
      var shouldPropigate = true;
      var selector = undefined;

      while (shouldPropigate) {
        // eslint-disable-line no-constant-condition
        if (target == null) {
          return;
        }
        if (target === event.currentTarget) {
          return;
        }

        for (selector in this.events) {
          if (this.events.hasOwnProperty(selector) && (0, _matchesSelectorJs2['default'])(target, selector)) {
            this.events[selector](event, target);
            shouldPropigate = false;
            break;
          }
        }

        target = target.parentNode;
      }

      event.preventDefault();
    }
  }]);

  return DelegatedEventRegistry;
})();

exports['default'] = DelegatedEventRegistry;
module.exports = exports['default'];

},{"./matches-selector.js":3}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _misprint = require('./misprint');

var _misprint2 = _interopRequireDefault(_misprint);

var _matchesSelectorJs = require('./matches-selector.js');

var _matchesSelectorJs2 = _interopRequireDefault(_matchesSelectorJs);

var _modal = require('./modal');

var _modal2 = _interopRequireDefault(_modal);

var _delegatedEventRegistry = require('./delegated-event-registry');

var _delegatedEventRegistry2 = _interopRequireDefault(_delegatedEventRegistry);

var misprint = new _misprint2['default']();
var modal = new _modal2['default']();
var bodyEvents = new _delegatedEventRegistry2['default'](document.body, 'click', { // eslint-disable-line no-unused-vars
  '.quick-look-modal': handleClickModalOverlay,
  '.quick-look-modal__dismiss-link': window.history.back.bind(window.history),
  '.quick-look-trigger': handleClickModalTrigger
});

window.addEventListener('popstate', handlePopstate, false);
window.addEventListener('keydown', handleKeydown, false);

misprint.applyByDataAttribute();

function handlePopstate() {
  var productListing = document.querySelector('.products');

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
  var currentState = window.history.state;

  window.history.pushState(currentState, 'Product Page', target.href);
  fetchProductHTML(target.href);

  event.preventDefault();
}

function handleClickModalOverlay(event) {
  var target = event.target || event.srcElement;

  console.log(target);

  if ((0, _matchesSelectorJs2['default'])(target, '.quick-look-modal__dismiss-bar, .quick-look-modal__content, .quick-look-modal__content *')) {
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
  window.fetch(path).then(function (response) {
    return response.text();
  }).then(function (html) {
    var product = undefined;
    product = html.match(/(<article id="product">(.|\n)*<\/article>)/)[0];

    modal.setContent(product);
    modal.open();
  });
}

},{"./delegated-event-registry":1,"./matches-selector.js":3,"./misprint":4,"./modal":5}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = matchesSelector;

function matchesSelector(node, selector) {
  if (node.matches) {
    return node.matches(selector);
  } else if (node.mozMatchesSelector) {
    return node.mozMatchesSelector(selector);
  } else if (node.webkitMatchesSelector) {
    return node.webkitMatchesSelector(selector);
  } else if (node.msMatchesSelector) {
    return node.msMatchesSelector(selector);
  } else if (node.oMatchesSelector) {
    return node.oMatchesSelector(selector);
  }
}

module.exports = exports["default"];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Misprint = (function () {
  function Misprint() {
    _classCallCheck(this, Misprint);
  }

  _createClass(Misprint, [{
    key: 'getText',
    value: function getText(el) {
      var text = undefined;

      if (el.innerText) {
        text = el.innerText;
      } else {
        text = el.textContent;
      }

      return text;
    }
  }, {
    key: 'setText',
    value: function setText(el, text) {
      if (el.innerText) {
        el.innerText = text;
      } else {
        el.textContent = text;
      }
    }
  }, {
    key: 'randomly',
    value: function randomly() {
      return Math.random() < 0.5 ? 0 : 1;
    }
  }, {
    key: 'slugRotation',
    value: function slugRotation() {
      var positiveOrNegative = this.randomly() ? 1 : -1;

      return Math.random() * 3 * positiveOrNegative;
    }
  }, {
    key: 'slugSkew',
    value: function slugSkew() {
      var positiveOrNegative = this.randomly() ? 1 : -1;

      return Math.random() * 3 * positiveOrNegative;
    }
  }, {
    key: 'slugTranslation',
    value: function slugTranslation(fontSize) {
      var positiveOrNegative = this.randomly() ? 1 : -1;
      var ratio = parseInt(fontSize, 10) / 25;
      var num = Math.round(Math.random() * ratio) * positiveOrNegative;

      return num;
    }
  }, {
    key: 'apply',
    value: function apply(el, context) {
      var slugs = undefined,
          slugsLength = undefined,
          delimiter = undefined,
          slugEl = undefined,
          elStyles = undefined,
          i = undefined;
      var text = this.getText(el);

      context = context || 'word';

      el.setAttribute('data-original-text', text);

      if (context === 'char') {
        delimiter = '';
      } else {
        delimiter = ' ';
      }

      slugs = text.split(delimiter);

      slugsLength = slugs.length;
      el.innerHTML = '';

      for (i = 0; i < slugsLength; i++) {
        slugEl = document.createElement('span');

        this.setText(slugEl, slugs[i]);

        elStyles = window.getComputedStyle(el);

        slugEl.style.display = 'inline-block';
        slugEl.style['white-space'] = 'pre';
        slugEl.style.transform = 'rotate(' + this.slugRotation() + 'deg) translate(0,' + this.slugTranslation(elStyles.fontSize) + 'px) skew(' + this.slugSkew() + 'deg)';

        if (el.innerHTML) {
          el.innerHTML += delimiter;
        }

        el.appendChild(slugEl);
      }
    }
  }, {
    key: 'applyByDataAttribute',
    value: function applyByDataAttribute() {
      var i = undefined;
      var wordEls = [].slice.call(document.querySelectorAll('[data-misprint="word"]'));
      var charEls = [].slice.call(document.querySelectorAll('[data-misprint="char"]'));

      for (i = 0; i < wordEls.length; i++) {
        this.apply(wordEls[i]);
      }

      for (i = 0; i < charEls.length; i++) {
        this.apply(charEls[i], 'char');
      }
    }
  }]);

  return Misprint;
})();

exports['default'] = Misprint;
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Modal = (function () {
  function Modal() {
    _classCallCheck(this, Modal);

    this.el = this.createElement();
    this.htmlElement = document.getElementsByTagName('html')[0];
  }

  _createClass(Modal, [{
    key: 'createElement',
    value: function createElement() {
      var el = document.createElement('div');

      this.contentContainer = this.createContentContainer();
      this.dismissBar = this.createDismissBar();

      el.className = 'quick-look-modal';
      el.appendChild(this.dismissBar);
      el.appendChild(this.contentContainer);

      return el;
    }
  }, {
    key: 'createContentContainer',
    value: function createContentContainer() {
      var el = document.createElement('div');

      el.className = 'quick-look-modal__content';

      return el;
    }
  }, {
    key: 'createDismissBar',
    value: function createDismissBar() {
      var el = document.createElement('div');

      this.dismissLink = this.createDismissLink();

      el.className = 'quick-look-modal__dismiss-bar';
      el.appendChild(this.dismissLink);

      return el;
    }
  }, {
    key: 'createDismissLink',
    value: function createDismissLink() {
      var el = document.createElement('div');

      el.className = 'quick-look-modal__dismiss-link';
      el.innerHTML = '&times;';

      return el;
    }
  }, {
    key: 'setContent',
    value: function setContent(content) {
      this.contentContainer.innerHTML = content;
    }
  }, {
    key: 'open',
    value: function open() {
      if (!document.body.contains(this.el)) {
        document.body.appendChild(this.el);
      }

      this.lockScroll();
    }
  }, {
    key: 'close',
    value: function close() {
      if (document.body.contains(this.el)) {
        document.body.removeChild(this.el);
      }

      this.unlockScroll();
    }
  }, {
    key: 'lockScroll',
    value: function lockScroll() {
      this.htmlElement.classList.add('locked');
    }
  }, {
    key: 'unlockScroll',
    value: function unlockScroll() {
      this.htmlElement.classList.remove('locked');
    }
  }]);

  return Modal;
})();

exports['default'] = Modal;
module.exports = exports['default'];

},{}]},{},[2])(2)
});