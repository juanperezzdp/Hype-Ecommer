import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import "./GlobalStyle.scss";
import Routers from "./routers/Routers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Routers />
    </AuthProvider>
  </React.StrictMode>
);
