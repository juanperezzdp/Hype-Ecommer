import { useEffect, useState } from "react";
import "./Login.scss";

function Alert({ message }) {
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (message) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  }, [message]);

  return (
    <>
      {alert && (
        <div className="container-alert">
          <div className="alert">
            <p>{message}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Alert;
