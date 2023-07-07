import { PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";

function Paypal(props) {
  return (
    <div>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: props.invoice,
                amount: {
                  value: props.totalValue,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order?.capture();
          console.log("order:", order);
        }}
      ></PayPalButtons>
    </div>
  );
}

export default Paypal;
