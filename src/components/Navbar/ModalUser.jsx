import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import Alert from "../Login/Alert";
import Loading from "../Loading/Loading";

function ModalUser({ userModal, setModalUser }) {
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
    return <Loading />;
  }
  return (
    <div className="container-modal">
      {error && <Alert message={error} />}
      <AiOutlineClose
        onClick={() => setModalUser(!userModal)}
        className="x-modal"
      />
      <img className="user-modal" src={user?.photoURL} alt="" />
      <h3>Usuario: {user?.displayName || user?.email}</h3>
      <button className="btn-modal" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default ModalUser;
