import React from 'react';

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  formatAuthor() {
		let format = function (author) {
			let first, last;

			[last, first] = author.split(', ');

			return [first, last].join(' ');
		};

    if (Array.isArray(this.props.author)) {
      let authors = this.props.author.map(a => {
				return format(a);
			});
			
			return authors.join(', ');
    } else {
      return format(this.props.author);
    }
  }

  render() {
    return (
      <a className="product" href={'/product/' + this.props.slug}>
				<div className="product__image-container">
					<img className="product__image" src={this.props.coverSrc} />
				</div>
				<h1 className="product__title">{this.props.title}</h1>
				<p className="product__author">{this.formatAuthor()}</p>
      </a>
    );
  }
}

export default Product;
