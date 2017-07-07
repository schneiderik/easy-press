module.exports = {
  currentYear: function () {
    var d = new Date();
    return d.getFullYear();
  },
  activePage: function (linkName, currentPage) {
    return linkName === currentPage ? 'active' : '';
  },
	decrement: function (value) {
		return value - 1;
	},
	increment: function (value) {
		return value + 1;
	},
  formatAuthors: function (authors) {
    var authors = authors.map(a => {
      var authorParts = a.split(', ');
      var last = authorParts[0];
      var first = authorParts[1];

			return [first, last].join(' ');
    });
    
    return authors.join(', ');
  }
};
