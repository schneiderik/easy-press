import utils from './utils';
import ProductModel from './product-model';

class ProductCollection {
  constructor(products) {
    this.models = products.map(product => new ProductModel(product));
  }

  valuesFor(key) {
    return utils.array.unique(utils.array.flatten(this.models.map(model => {
      return model.attributes[key];
    })));
  }

  filterBy(filters) {
    let matches = this.models;

    if (filters.inStock) {
      matches = matches.filter(model => model.inStock());
    }

    if (filters.category.size) {
      matches = matches.filter(model => {
        return [...filters.category].some(category => {
          return model.hasAttribute('category', category);
        });
      });
    }

    if (filters.author.size) {
      matches = matches.filter(model => {
        return [...filters.author].some(author => {
          return model.hasAttribute('author', author);
        });
      });
    }

    return matches;
  }

  filterByKeyValue(key, value, models) {
    models = models || this.models;

    return models.filter(model => {
      return model.hasKeyValue(key, value);
    });
  }
}

export default ProductCollection;
