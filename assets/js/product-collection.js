import utils from './utils';
import data from './../../data/data.json';

class ProductCollection {
  constructor(products) {
    this.products = products || data.products;
  }

  authors () {
    return utils.array.uniq(this.products.reduce((acc, p) => {
      acc = acc.concat(p.authors);

      return acc;
    }, []));
  }

  categories () {
    return utils.array.uniq(this.products.reduce((acc, p) => {
      acc = acc.concat(p.categories);

      return acc;
    }, []));
  }

  filterBy (attribute, value, products=this.products) {
    function filterByAttributeValue (v) {
      return products.filter(p => {
        return Array.isArray(p[attribute])
          ? utils.array.includes(p[attribute], v)
          : p[attribute] === v;
      });
    }

    return Array.isArray(value)
      ? utils.array.uniq(utils.array.collect(value, filterByAttributeValue))
      : filterByAttributeValue(value);
  }

  filter(filters) {
    let matches = this.products;

    if (filters.authors.length) {
      matches = this.filterBy('authors', filters.authors, matches)
    }

    if (filters.categories.length) {
      console.log(matches);
      matches = this.filterBy('categories', filters.categories, matches);
      console.log(matches);
    }

    return matches;
  }
}

export default ProductCollection;
