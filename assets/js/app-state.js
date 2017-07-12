export default {
  attributes: {},
  get: function (key) {
    return this.attributes[key];
  },
  set: function (key, value) {
    this.attributes[key] = value;
  }
};
