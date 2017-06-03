import React from 'react';
import LazyLoad from 'react-lazy-load';
import helpers from './../../lib/handlebars-helpers';

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a className="product" href={'/product/' + this.props.slug}>
				<div className="product__image-container">
					<LazyLoad offset={1000} debounce={false}>
						<img className="product__image" src={this.props.coverSrc} />
					</LazyLoad>
				</div>
				<h1 className="product__title">{this.props.title}</h1>
				<p className="product__author">{helpers.formatAuthor(this.props.author)}</p>
      </a>
    );
  }
}

export default Product;
