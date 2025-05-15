import React from "react";
import authService from "../utils/token";
import { useNavigate } from "react-router";
import "../styles/defaultsection.css";

export default function DefaultSection() {
  const navigate = useNavigate();

  function callCloseSesion() {
    authService.logOut(navigate);
  }

  return (
    <>
      <br />
      <div className="default-section">
        <h3>¡Bienvenido! Por favor, selecciona una opción para continuar.</h3>
        <p>
          Accede a las funcionalidades disponibles para la gestión de productos
          y, en caso de contar con los permisos necesarios, también para la
          administración de usuarios.
        </p>

        <div>
          <button
            type="button"
            className="button-closesesion-defaultsection"
            onClick={callCloseSesion}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </>
  );
}
