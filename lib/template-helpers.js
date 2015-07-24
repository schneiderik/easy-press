function toPrice(pennies) {
  var dollars = pennies / 100;
  return '$' + dollars.toFixed(2);
}

function multiply(a, b) {
  return a * b;
}

module.exports = {
  toPrice: toPrice,
  multiply: multiply
};
