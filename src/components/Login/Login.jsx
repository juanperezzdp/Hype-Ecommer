import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { FaFacebook } from "react-icons/fa";
import { ImGooglePlus3 } from "react-icons/im";

function Login({ setHidden }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { login, loginWithGoogle, resetPassword, loginWithFacebook } =
    useAuth();
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError("Email no valida");
    }
  };
  const handleFacebook = async () => {
    try {
      await loginWithFacebook();
      navigate("/home");
    } catch (error) {
      setError("Cuenta no valida");
    }
  };

  const handleResetPassword = async () => {
    if (!user.email) {
      return setError("Por favor, ingresa tu correo electrónico");
    }
    try {
      await resetPassword(user.email);
      setError(
        "Te hemos enviado un correo electrónico para que verifiques tu contraseña"
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    //Error handling and validation
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("El usuario no existe.");
      } else if (error.code === "auth/wrong-password") {
        setError("Contraseña no valida");
      } else if (error.code === "auth/invalid-email") {
        setError("Email no valido");
      }
    }
  };

  return (
    <div>
      <form className="form-login" onSubmit={handleSubmit}>
        {error && <Alert message={error} />}
        <h1>¡Hola amigo!</h1>
        <p>Ingresa tus datos personales y conoce tus muebles ideales</p>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="tuemail@company.com"
        />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Contraseña"
        />
        <div>
          <button>Iniciar sesión</button>
          <div className="container-register">
            <Link to="#!" onClick={handleResetPassword}>
              Recuperar contraseña
            </Link>
            <br />
            <button
              onClick={() => {
                setHidden(false);
              }}
            >
              Regístrate
            </button>
          </div>
        </div>
        <div>
          <FaFacebook className="icons" onClick={handleFacebook} />
          <ImGooglePlus3 className="icons" onClick={handleGoogle} />
        </div>
      </form>
    </div>
  );
}

export default Login;
