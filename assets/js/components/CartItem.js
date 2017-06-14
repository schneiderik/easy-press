import React from 'react';
import utils from './../utils';
import cartStore from './../cart-store';
import helpers from './../../../lib/handlebars-helpers';

function CartItem (props) {
  return (
    <div className="cart-item">
      <div className="cart-item__details">
        <img className="cart-item__image" src={props.imageSrc} />
        <div>
          <h1 className="cart-item__name">{props.name}</h1>
          <p className="cart-item__author">{helpers.formatAuthors(props.authors)}</p>
        </div>
      </div>
      <div className="cart-item__controls">
        <div className="cart-item__unit-price">{utils.integer.toUSD(props.unitPrice)} &times;</div>
        <a className="cart-item__remove-control" href="#" onClick={cartStore.decreaseQuantity.bind(cartStore, props.slug)}>–</a>
        <div className="cart-item__amount">{props.quantity}</div>
        <a className="cart-item__add-control" href="#" onClick={cartStore.increaseQuantity.bind(cartStore, props.slug)}>+</a>
      </div>
      <div className="cart-item__pricing">
        <div className="cart-item__price">{utils.integer.toUSD(props.unitPrice * props.quantity)}</div>
      </div>
    </div>
  );
}

export default CartItem;
