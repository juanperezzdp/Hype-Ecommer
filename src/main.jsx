import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import "./GlobalStyle.scss";
import Routers from "./routers/Routers";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <PayPalScriptProvider
        options={{
          /* eslint-disable-line no-undef */
          "clientId":
            "AaHyZ4_bC8yPdFYTOUZe7xP8nQIR4gjHxCAbQwVdbItVi9RsR1KFplKv6Kc4X9ZE5rGdwzKT_VlJtKVa",
        }}
      >
        <Routers />
      </PayPalScriptProvider>
    </AuthProvider>
  </React.StrictMode>
);
