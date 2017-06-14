import React from 'react';
import ReactDOM from 'react-dom';
import ProductBrowser from './components/ProductBrowser';
import cartSystem from './cart-system';

const productBrowserContainer = document.getElementById('product-browser');

if (productBrowserContainer) {
  ReactDOM.render(
    <ProductBrowser />,
    productBrowserContainer
  );
}

cartSystem();
