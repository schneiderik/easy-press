import React from 'react';
import appState from './../app-state';
import utils from './../utils';

class AddToCartLink extends React.Component {
	constructor (props) {
		super(props);

    this.productModel = props.productModel;
		this.handleClick = this.handleClick.bind(this);
	}

  className () {
    let className = "add-to-cart-link";

    if (!Boolean(this.productModel.get('eligibleQuantity'))) {
      className += " add-to-cart-link--disabled";
    }

    return className;
  }

  inStock () {
    return Boolean(this.productModel.get('quantity'));
  }

	handleClick () {
    if (!Boolean(this.productModel.get('eligibleQuantity'))) return;

		appState.get('cartItemCollection').add({
      id: this.productModel.get('id'),
      quantity: 1
    });
	}

  text () {
    return this.inStock()
      ? `Add to Cart ($${utils.integer.toUSD(this.productModel.get('unitPrice'))})`
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
