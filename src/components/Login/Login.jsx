import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { login, loginWithGoogle, resetPassword } = useAuth();
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
      {error && <Alert message={error} />}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="youremail@company.com"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="******"
        />
        <div>
          <button>Login</button>
          <br />
          <Link to="#!" onClick={handleResetPassword}>
            Recuperar contraseña
          </Link>
          <br />
          <Link to="/register">Registrate</Link>
        </div>
      </form>

      <button onClick={handleGoogle}>Iniciar sesión con Google</button>
    </div>
  );
}

export default Login;
