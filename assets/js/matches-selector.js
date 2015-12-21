export default function matchesSelector(node, selector) {
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
