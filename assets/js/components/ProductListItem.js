import React from 'react';
import LazyLoad from 'react-lazy-load';
import helpers from './../../../lib/handlebars-helpers';

function Product (props) {
  return (
    <a className="product" href={'/product/' + props.slug}>
      <div className="product__image-container">
        <LazyLoad offset={1000} debounce={false}>
          <img className="product__image" src={props.imageSrc} />
        </LazyLoad>
      </div>
      <h1 className="product__title">{props.title}</h1>
      <p className="product__author">{helpers.formatAuthors(props.authors)}</p>
    </a>
  );
}

export default Product;
