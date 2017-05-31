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
  formatAuthor: function (author) {
		let format = function (a) {
			let first, last;

			[last, first] = a.split(', ');

			return [first, last].join(' ');
		};

    if (Array.isArray(author)) {
      let authors = author.map(a => {
				return format(a);
			});
			
			return authors.join(', ');
    } else {
      return format(author);
    }
  }
};
