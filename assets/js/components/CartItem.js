import React from 'react';
import appState from './../app-state';
import utils from './../utils';
import helpers from './../../../lib/handlebars-helpers';

function CartItem ({model}) {
  const productModel = model.get('productModel');
  const cartItemCollection = appState.get('cartItemCollection');

  return (
    <div className="cart-item">
      <div className="cart-item__details">
        <img className="cart-item__image" src={productModel.get('images')[0]} />
        <div>
          <h1 className="cart-item__name">{productModel.get('name')}</h1>
          <p className="cart-item__author">{helpers.formatAuthors(productModel.get('authors'))}</p>
          <a className="cart-item__remove" onClick={cartItemCollection.remove.bind(cartItemCollection, model.get('id'))}>Remove</a>
        </div>
      </div>
      <div className="cart-item__controls-container">
        <div className="cart-item__controls">
          <div className="cart-item__unit-price">${utils.integer.toUSD(productModel.get('unitPrice'))} &times;</div>
          <a className="cart-item__remove-control" onClick={model.decrement.bind(model)}>–</a>
          <div className="cart-item__amount">{model.get('quantity')}</div>
          <a className="cart-item__add-control" onClick={model.increment.bind(model)}>+</a>
        </div>
        <div className="cart-item__pricing">
          <div className="cart-item__price">${utils.integer.toUSD(productModel.get('unitPrice') * model.get('quantity'))}</div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
