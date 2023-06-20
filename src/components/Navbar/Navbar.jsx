import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IconCart from "../IconCart/IconCart";
import ModalUser from "./ModalUser";
import { useAuth } from "../../Hooks/useAuth";
import "./Navbar.scss";
import UserDefault from "../../img/UserDefault.png";
import UserLogout from "../../img/UserLogout.png";

function Navbar() {
  const [modalUser, setModalUser] = useState(false);
  const [scrolled, setScrolled] = useState(false); // Estado para controlar el scroll
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <nav className={scrolled ? "nav-scrolled-white" : "nav-scrolled"}>
        <ul>
          <li
            className={scrolled ? "btn-white" : "btn-transparent"}
            onClick={() => {
              navigate("/");
            }}
          >
            Inicio
          </li>
          <li
            className={scrolled ? "btn-white" : "btn-transparent"}
            onClick={() => {
              navigate("/indexcamas");
            }}
          >
            Camas
          </li>
          <li
            className={scrolled ? "btn-white" : "btn-transparent"}
            onClick={() => {
              navigate("/indexsofa");
            }}
          >
            Sofa
          </li>
        </ul>

        <img
          onClick={() =>
            user ? setModalUser(!modalUser) : navigate("/loginpage")
          }
          className="user"
          src={user ? user?.photoURL || UserDefault : UserLogout}
          alt="user"
        />

        {modalUser && (
          <ModalUser modalUser={modalUser} setModalUser={setModalUser} />
        )}
      </nav>

      <IconCart />
    </>
  );
}

export default Navbar;
