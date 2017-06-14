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
    authors = authors.map(a => {
			let first, last;

			[last, first] = a.split(', ');

			return [first, last].join(' ');
    });
    
    return authors.join(', ');
  }
};
