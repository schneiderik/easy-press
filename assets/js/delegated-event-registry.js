import matchesSelector from './matches-selector.js';

class DelegatedEventRegistry {
  constructor(node, eventName, events) {
    this.events = events || {};
    node.addEventListener(eventName, this.handleEvent.bind(this), false);
  }

  add(selector, func) {
    this.events[selector] = func;
  }

  handleEvent(event) {
    let target = event.target || event.srcElement;
    let shouldPropigate = true;
    let selector;

    while (shouldPropigate) { // eslint-disable-line no-constant-condition
      if (target == null) { return; }
      if (target === event.currentTarget) { return; }

      for (selector in this.events) {
        if (this.events.hasOwnProperty(selector) && matchesSelector(target, selector)) {
          this.events[selector](event, target);
          shouldPropigate = false;
          break;
        }
      }

      target = target.parentNode;
    }
  }
}

export default DelegatedEventRegistry;

