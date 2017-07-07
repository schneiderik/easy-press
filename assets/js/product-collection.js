import products from './../../data/products.json';
import utils from './utils';
import ProductModel from './product-model';

class ProductCollection {
  constructor () {
    this.models = products.map(attributes => new ProductModel(attributes));
  }

  get (id) {
    if (typeof id === 'string') {
      return this.models.find(m => m.get('id') === id);
    } else if (Array.isArray(id)) {
      return this.models.reduce((acc, m) => {
        if (id.indexOf(m.get('id')) !== -1) {
          acc.push(m);
        }

        return acc;
      }, []);
    }
  }

  authors () {
    return utils.array.uniq(this.models.reduce((acc, model) => {
      acc = acc.concat(model.get('authors'));

      return acc;
    }, []));
  }

  categories () {
    return utils.array.uniq(this.models.reduce((acc, model) => {
      acc = acc.concat(model.get('categories'));

      return acc;
    }, []));
  }

  filterBy (attribute, value, models=this.models) {
    function filterByAttributeValue (v) {
      return models.filter(model => {
        return Array.isArray(model.get(attribute))
          ? utils.array.includes(model.get(attribute), v)
          : model.get(attribute) === v;
      });
    }

    return Array.isArray(value)
      ? utils.array.uniq(utils.array.collect(value, filterByAttributeValue))
      : filterByAttributeValue(value);
  }

  filter (filters) {
    let matches = this.models;

    if (filters.authors.length) {
      matches = this.filterBy('authors', filters.authors, matches)
    }

    if (filters.categories.length) {
      matches = this.filterBy('categories', filters.categories, matches);
    }

    return matches;
  }

  updateQuantities (quantities) {
    this.models.forEach(model => {
      const quantity = parseInt(quantities[model.get('id')]);

      model.set('quantity', quantity);
    });
  }
}

export default ProductCollection;
