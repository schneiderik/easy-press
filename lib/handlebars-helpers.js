module.exports = {
  currentYear: function () {
    var d = new Date();
    return d.getFullYear();
  },
  activePage: function (linkName, currentPage) {
    return linkName === currentPage ? 'active' : '';
  }
};
