import React from "react";
import Home from "./Home";
import IconCart from "../components/IconCart/IconCart";
import Navbar from "../components/Navbar/Navbar";

function IndexHome() {
  return (
    <div>
      <Navbar />
      <Home />
      <IconCart />
    </div>
  );
}

export default IndexHome;
