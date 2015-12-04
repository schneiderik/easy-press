class Misprint {
  constructor() {
  }

  getText(el) {
    let text;

    if (el.innerText) {
      text = el.innerText;
    } else {
      text = el.textContent;
    }

    return text;
  }

  setText(el, text) {
    if (el.innerText) {
      el.innerText = text;
    } else {
      el.textContent = text;
    }
  }

  randomly() {
    return Math.random() < 0.5 ? 0 : 1;
  }

  slugRotation() {
    let positiveOrNegative = this.randomly() ? 1 : -1;

    return Math.random() * 3 * positiveOrNegative;
  }

  slugSkew() {
    let positiveOrNegative = this.randomly() ? 1 : -1;

    return Math.random() * 3 * positiveOrNegative;
  }

  slugTranslation(fontSize) {
    let positiveOrNegative = this.randomly() ? 1 : -1;
    let ratio = parseInt(fontSize, 10) / 25;
    let num = Math.round(Math.random() * ratio) * positiveOrNegative;

    return num;
  }

  apply(el, context) {
    let slugs, slugsLength, delimiter, slugEl, elStyles, i;
    let text = this.getText(el);

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

  applyByDataAttribute() {
    let i;
    let wordEls = [].slice.call(document.querySelectorAll('[data-misprint="word"]'));
    let charEls = [].slice.call(document.querySelectorAll('[data-misprint="char"]'));

    for (i = 0; i < wordEls.length; i++) {
      this.apply(wordEls[i]);
    }

    for (i = 0; i < charEls.length; i++) {
      this.apply(charEls[i], 'char');
    }
  }
}

export default Misprint;
