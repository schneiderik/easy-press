import React from 'react';
import utils from './../utils';
import appState from './../app-state';

class PayPalButton extends React.Component {
  componentDidMount () {
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
                total: utils.integer.toUSD(appState.cartItemCollection.totalPrice()),
                currency: 'USD',
                details: {
                  "subtotal": utils.integer.toUSD(appState.cartItemCollection.subTotal()),
                  "shipping": utils.integer.toUSD(appState.cartItemCollection.shippingCost())
                }
              },
              item_list: {
                items: appState.cartItemCollection.toPayPalItems()
              }
            }
          ]
        });
      },
      onAuthorize: function(data, actions) {
        return actions.payment.execute().then(function(payment) {
          appState.productCollection.update(appState.cartItemCollection.toJSON(), function (err, json) {
            if (err) {
              return;
            }

            appState.cartItemCollection.clear();
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
