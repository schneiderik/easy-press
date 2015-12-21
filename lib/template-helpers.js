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

function heightPercentage(height, max) {
  var percentage;

  max = parseInt(max, 10) || 17;
  percentage = parseInt(height, 10) * 1.5 / max * 100;

  return percentage + '%';
}

function widthPercentage(width, max) {
  var percentage;

  max = parseInt(max, 10) || 11;
  percentage = parseInt(width, 10) * 1.5 / max * 100;

  return percentage + '%';
}

function ifCurrentPage(conditional, currentPageId, options) {
  var block;

  if (conditional === currentPageId) {
    block = options.fn(this);
  } else {
    block = options.inverse(this);
  }

  return block;
}

module.exports =  {
  toPrice: toPrice,
  ifNotEmpty: ifNotEmpty,
  heightPercentage: heightPercentage,
  widthPercentage: widthPercentage,
  ifCurrentPage: ifCurrentPage
};
