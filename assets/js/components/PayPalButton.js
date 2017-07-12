import React from 'react';
import utils from './../utils';
import appState from './../app-state';

class PayPalButton extends React.Component {
  componentDidMount () {
    const cartItemCollection = appState.get('cartItemCollection');
    const productCollection = appState.get('productCollection');

    paypal.Button.render({
      env: window.location.hostname === 'really-easy-press.com' ? 'production' : 'sandbox',
      client: {
        sandbox: 'AT6X-jGW9Y-82RZWUNj2AyG-1MFLlgCMUB0I8GgYNaOxFhktkWZ9JYB4PMJNeGHnSLraesr7jy2s42gb',
        production: 'AahlA1JkEUqLA0BwR7eGJP8qLTPLt4U7swjjf-IkChz7YiPLpRe7qV5KMRg6BuAdYzpOeIzwrAT9nlfJ'
      },
      commit: true,
      payment: function(data, actions) {
        return actions.payment.create({
          transactions: [
            {
              amount: {
                total: utils.integer.toUSD(cartItemCollection.totalPrice()),
                currency: 'USD',
                details: {
                  "subtotal": utils.integer.toUSD(cartItemCollection.subtotal()),
                  "shipping": utils.integer.toUSD(cartItemCollection.shippingCost())
                }
              },
              item_list: {
                items: cartItemCollection.toPayPalItems()
              }
            }
          ]
        });
      },
      onAuthorize: function(data, actions) {
        return actions.payment.execute().then(function(payment) {
          productCollection.updateQuantities(function (err, json) {
            if (err) {
              return;
            }

            cartItemCollection.clear();
            window.location = "/thank-you"
          })
        });
      }
    }, '#paypal-button');
  }

  render () {
    return (
      <div id="paypal-button">
      </div>
    );
  }
}

export default PayPalButton;
