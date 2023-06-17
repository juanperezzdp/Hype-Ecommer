import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Alert from "../Login/Alert";

function Navbar() {
  const [error, setError] = useState("");
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      navigate("/loginpage");
    } catch (error) {
      setError("Ha ocurrido un error, por favor inténtelo de nuevo más tarde");
    }
  };

  if (loading) {
    return <h1>cargando...</h1>;
  }
  return (
    <div
      style={{
        width: "40%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "gray",
        padding: "1rem",
      }}
    >
      {error && <Alert message={error} />}
      <img className="gg" src={user?.photoURL} alt="" />
      <h1>Usuario: {user?.displayName || user?.email}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Navbar;
