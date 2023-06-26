import React, { useEffect } from "react";

function Paypal() {
  function renderPaypalButton() {
    paypal
      .Buttons({
        createOrder: async () => {
          try {
            const response = await fetch("http://localhost:8000/create-order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(),
            });
            const data = await response.json();
            return data.id;
          } catch (error) {
            console.log(error);
          }
        },
        onCancel: function (data) {
          console.log("Compra cancelada");
        },
        onApprove: function (data, actions) {
          console.log(data);
          return actions.order.capture();
        },
      })
      .render("#paypal-button-container");
  }

  useEffect(() => {
    renderPaypalButton();
  }, []);

  return (
    <div>
      <div id="paypal-button-container"></div>
    </div>
  );
}

export default Paypal;
