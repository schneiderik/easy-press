(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.EasyApp = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function Misprint() {
  this.applyByDataAttribute();
}

Misprint.prototype.getText = function (el) {
  var text;

  if (el.innerText) {
    text = el.innerText;
  } else {
    text = el.textContent;
  }

  return text;
};

Misprint.prototype.setText = function (el, text) {
  if (el.innerText) {
    el.innerText = text;
  } else {
    el.textContent = text;
  }
};

Misprint.prototype.randomly = function () {
  return Math.random() < 0.5 ? 0 : 1;
};

Misprint.prototype.slugRotation = function () {
  var positiveOrNegative = this.randomly() ? 1 : -1;
  return Math.random() * 3 * positiveOrNegative;
};

Misprint.prototype.slugSkew = function () {
  var positiveOrNegative = this.randomly() ? 1 : -1;
  return Math.random() * 3 * positiveOrNegative;
};

Misprint.prototype.slugTranslation = function (fontSize) {
  var positiveOrNegative = this.randomly() ? 1 : -1;
  var ratio = parseInt(fontSize, 10) / 25;
  var num = Math.round(Math.random() * ratio) * positiveOrNegative;

  return num;
};

Misprint.prototype.apply = function (el, context) {
  var slugs, slugsLength, delimiter, slugEl, elStyles, i;
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
};

Misprint.prototype.applyByDataAttribute = function () {
  var i;
  var wordEls = [].slice.call(document.querySelectorAll('[data-misprint="word"]'));
  var charEls = [].slice.call(document.querySelectorAll('[data-misprint="char"]'));

  for (i = 0; i < wordEls.length; i++) {
    this.apply(wordEls[i]);
  }

  for (i = 0; i < charEls.length; i++) {
    this.apply(charEls[i], 'char');
  }
};

module.exports = {
  Misprint: Misprint
};

},{}]},{},[1])(1)
});