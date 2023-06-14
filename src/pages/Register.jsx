import React from "react";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";

function Register() {
  const authentication = useContext(authContext);

  console.log(authentication);
  return <div>Register</div>;
}

export default Register;
