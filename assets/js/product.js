import React from 'react';
import helpers from './../../lib/handlebars-helpers';

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a className="product" href={'/product/' + this.props.slug}>
				<div className="product__image-container">
					<img className="product__image" src={this.props.coverSrc} />
				</div>
				<h1 className="product__title">{this.props.title}</h1>
				<p className="product__author">{helpers.formatAuthor(this.props.author)}</p>
      </a>
    );
  }
}

export default Product;
