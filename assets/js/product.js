import React from 'react';

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  formatAuthor() {
    if (Array.isArray(this.props.author)) {
      return this.props.author.join(', ');
    } else {
      return this.props.author;
    }
  }

  render() {
    return (
      <a className="product" href={'/products/' + this.props.slug}>
				<img className="product__image" src={this.props.coverSrc} />
				<h1 className="product__title">{this.props.title}</h1>
				<p className="product__author">{this.formatAuthor()}</p>
      </a>
    );
  }
}

export default Product;
