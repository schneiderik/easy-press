function toPrice(pennies) {
  var dollars = pennies / 100;

  return '$' + dollars.toFixed(2);
}

function ifNotEmpty(conditional, options) {
  var block;

  if (conditional.length) {
    block = options.fn(this);
  } else {
    block = options.inverse(this);
  }

  return block;
}

module.exports = {
  toPrice: toPrice,
  ifNotEmpty: ifNotEmpty
};
