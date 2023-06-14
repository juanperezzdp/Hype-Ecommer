import React, { useState } from "react";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });

  return (
    <>
      <div>
        <form>
          <input type="email" />
          <input type="password" />
        </form>
      </div>
    </>
  );
}

export default Login;
