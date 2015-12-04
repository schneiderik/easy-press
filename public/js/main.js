(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.EasyApp = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _misprint = require('./misprint');

var _misprint2 = _interopRequireDefault(_misprint);

var misprint = new _misprint2['default']();

misprint.applyByDataAttribute();

function isQuickLookLink(node) {
  return node.tagName === 'A' && node.className.match(/quick-look/);
}

function isQuickLookModalOverlayContent(node) {
  return node.tagName === 'DIV' && node.className.match(/quick-look-modal__content/);
}

function isQuickLookModalOverlay(node) {
  return node.tagName === 'DIV' && node.className.match(/quick-look-modal/);
}

function handleBodyClick(event) {
  var currentState = window.history.state;
  var target = event.target || event.srcElement;

  while (true) {
    // eslint-disable-line no-constant-condition
    if (target == null) {
      return;
    }
    if (target === event.currentTarget) {
      return;
    }
    if (isQuickLookModalOverlayContent(target)) {
      return;
    }
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
  var quickLookModal = document.querySelector('.quick-look-modal');

  if (quickLookModal) {
    quickLookModal.remove();
    window.history.back();
    removeClass(document.getElementsByTagName('html')[0], 'locked');
  }
}

function openQuickLookModal(path) {
  window.fetch(path).then(function (response) {
    return response.text();
  }).then(function (html) {
    var quickLookModal = document.createElement('div');
    var quickLookModalContent = document.createElement('div');
    var quickLookModalDismiss = document.createElement('div');
    var product = undefined;

    product = html.match(/(<article id="product">(.|\n)*<\/article>)/)[0];

    quickLookModal.className = 'quick-look-modal';
    quickLookModalContent.className = 'quick-look-modal__content';
    quickLookModalDismiss.className = 'quick-look-modal__dismiss';
    quickLookModalDismiss.innerHTML = 'x';
    quickLookModal.appendChild(quickLookModalContent);
    quickLookModalContent.innerHTML = product;
    quickLookModalContent.appendChild(quickLookModalDismiss);

    addClass(document.getElementsByTagName('html')[0], 'locked');

    document.body.appendChild(quickLookModal);
  });
}

window.addEventListener('popstate', function () {
  var quickLookModal = document.querySelector('.quick-look-modal');
  var productListing = document.querySelector('.products');

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

},{"./misprint":2}],2:[function(require,module,exports){
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

},{}]},{},[1])(1)
});