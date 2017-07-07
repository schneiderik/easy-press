import React from 'react';
import utils from './../utils';
import cartStore from './../cart-store';

class AddToCartLink extends React.Component {
	constructor (props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

  className () {
    let className = "add-to-cart-link";

    if (!this.inStock) {
      className += " add-to-cart-link--disabled";
    }

    return className;
  }

  inStock () {
    return Boolean(this.props.productModel.get('quantity'));
  }

	handleClick () {
		cartStore.add(this.props.productModel.get('id'));
	}

  text () {
    return this.inStock()
      ? `Add to Cart (${utils.integer.toUSD(this.props.productModel.get('unitPrice'))})`
      : "Out of Stock";
  }

	render () {
    return (
      <a className={this.className()} onClick={this.handleClick} >
        {this.text()}
      </a>
    );
  }
}

export default AddToCartLink;
