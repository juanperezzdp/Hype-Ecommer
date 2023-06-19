import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import IconCart from "../IconCart/IconCart";
import ModalUser from "./ModalUser";
import { useAuth } from "../../Hooks/useAuth";
import "./Navbar.scss";

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
        </ul>
        <img
          onClick={() => setModalUser(!modalUser)}
          className="user"
          src={user?.photoURL}
          alt=""
        />
        {modalUser && (
          <ModalUser userModal={modalUser} setModalUser={setModalUser} />
        )}
      </nav>

      <IconCart />
    </>
  );
}

export default Navbar;
