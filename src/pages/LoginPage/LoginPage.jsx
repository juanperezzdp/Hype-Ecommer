import { useState } from "react";
import Login from "../../components/Login/Login";
import Register from "../../components/Login/Register";
import "./LoginPage.scss";

function ProtectedRoute() {
  const [hidden, setHidden] = useState(true);
  return (
    <>
      <div className="container-login">
        {hidden ? (
          <Login setHidden={setHidden} />
        ) : (
          <Register setHidden={setHidden} />
        )}
        <div className="container-title">
          <h1 className="title-new">Nueva llegada</h1>
          <h1 className="title-colletion">
            sofá confort de una nueva colección
          </h1>
        </div>
      </div>
    </>
  );
}

export default ProtectedRoute;
