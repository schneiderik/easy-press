import React from 'react';
import LazyLoad from 'react-lazy-load';
import helpers from './../../../lib/handlebars-helpers';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getStyle() {
  return {
    top: `${getRandomInt(-10, 10)}px`,
    right: `${getRandomInt(-10, 10)}px`,
    transform: `rotate(${getRandomInt(-15, 15)}deg)`
  };
}

function Product (props) {
  return (
    <a className="product-list-item" href={'/product/' + props.id}>
      <div className="product-list-item__image-container">
        <LazyLoad offset={1000} debounce={false}>
          <img className="product-list-item__image" src={props.imageSrc} />
        </LazyLoad>
        {props.quantity === 0 && (
          <div className="product-list-item__status" style={getStyle()}>Out of Stock <span>:(</span></div>
        )}
      </div>
      <h1 className="product-list-item__title">{props.title}</h1>
      <p className="product-list-item__author">{helpers.formatAuthors(props.authors)}</p>
    </a>
  );
}

export default Product;
