import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

const PayPalPayment = () => {
  return (
    <div className="payment-buttons">
      <h2>Pay with PayPal</h2>
      <PayPalButtons 
        style={{ layout: 'vertical' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '0.01'
              }
            }]
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(details => {
            alert('Transaction completed by ' + details.payer.name.given_name);
          });
        }}
        onError={(err) => {
          console.error("PayPal Buttons Error", err);
        }}
      />
    </div>
  );
};

export default PayPalPayment;
