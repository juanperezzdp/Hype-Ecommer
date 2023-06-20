import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import Alert from "../Login/Alert";
import Loading from "../Loading/Loading";
import UserDefault from "../../img/UserDefault.png";

function ModalUser({ modalUser, setModalUser }) {
  const [error, setError] = useState("");
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      navigate("/");
      setModalUser(!modalUser);
    } catch (error) {
      setError("Ha ocurrido un error, por favor inténtelo de nuevo más tarde");
    }
  };

  if (loading) {
    return <Loading />;
  }
  console.log(user);
  return (
    <div className="container-modal">
      {error && <Alert message={error} />}
      <AiOutlineClose
        onClick={() => setModalUser(!modalUser)}
        className="x-modal"
      />
      <img
        className="user-modal"
        src={user?.photoURL || UserDefault}
        alt="user"
      />
      <div className="user-info">
        <h3 className="user-email">{user?.displayName || user?.email}</h3>
      </div>
      <button className="btn-modal" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
}

export default ModalUser;
