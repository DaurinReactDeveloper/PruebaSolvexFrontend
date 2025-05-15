import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import "../styles/navbar.css";
import authService from "../utils/token";

export default function NavbarLayout() {
  const user = authService.getUserRole();

  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  }

  const navigate = useNavigate();

  function callCloseSesion() {
    authService.logOut(navigate);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            <img src="/img/logo-solvex.svg" alt="logo-solvex" />
            <hr />
            <p></p>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"></li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={"/products"}
                >
                  Productos
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={"/seller"}
                >
                  Vendedor
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={"/admin"}
                >
                  Administrador
                </Link>
              </li>

              {user == "User" && (
                <li className="nav-item nav-item-button">
                  <button
                    className="btn-closesesion-navbar"
                    aria-current="page"
                    onClick={callCloseSesion}
                  >
                    Cerrar Sesion
                  </button>
                </li>
              )}
            </ul>
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="¿buscar productos?"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-search-navbar" type="submit">
                <BiSearchAlt />
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
