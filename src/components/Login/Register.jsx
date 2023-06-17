import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { AiOutlineClose } from "react-icons/ai";

function Register({ setHidden }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    //Error handling and validation
    try {
      await signup(user.email, user.password);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("Email no valido");
      } else if (error.code === "auth/weak-password") {
        setError("La contraseña debe tener al menos 6 caracteres");
      } else if (error.code === "auth/email-already-in-use") {
        setError("El correo electrónico ya está registrado.");
      }
    }
  };

  return (
    <div>
      <form className="form-login" onSubmit={handleSubmit}>
        {error && <Alert message={error} />}
        <AiOutlineClose className="x" onClick={() => setHidden(true)} />
        <h1>¡Registrate!</h1>
        <p>
          Ingresa tus email y una contraseña para que conozca todos nuestros
          productos
        </p>
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
        <button type="submit">Regístrase</button>
      </form>
    </div>
  );
}

export default Register;
