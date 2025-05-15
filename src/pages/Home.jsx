import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { getUser } from "../services/userServices";
import { useNavigate } from "react-router";
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [messageEmail, setMessageEmail] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageResult, setMessageResult] = useState("");

  const handleSubmit = (e) => {
    getUser(
      e,
      navigate,
      email,
      password,
      setMessageEmail,
      setMessagePassword,
      setError,
      setLoading,
      setMessageResult
    );
  };

  return (
    <>
      <section className="row row-home">
        <article className="col-sm-12 col-md-12 col-lg-4 col-xl-5">
          <img
            src="/img/img-section-home.gif"
            alt="img-section-home"
            className="img-fluid"
          />
        </article>

        <article className="col-sm-12 col-md-12 col-lg-6 col-xl-4">
          <h3>
            BIENVENIDOS A MI <span>SOLUCIÓN</span> DE SU{" "}
            <span>PRUEBA TÉCNICA</span> - INICIAR SESIÓN
          </h3>

          <form className="form-home" onSubmit={handleSubmit}>
            <div>
              <p>
                <AiOutlineMail /> Email
              </p>
              <input
                type="email"
                placeholder="Inserte su email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {messageEmail && <p className="error-message">{messageEmail}</p>}
            </div>

            <div>
              <p>
                <RiLockPasswordLine /> Contraseña
              </p>
              <input
                type="password"
                placeholder="Inserte su contraseña..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {messagePassword && (
                <p className="error-message">{messagePassword}</p>
              )}
            </div>

            {error && <p className="error-message">{error}</p>}
            {messageResult && (
              <p className="success-message">{messageResult}</p>
            )}

            <div className="div-button-form-home">
              <button type="submit" disabled={loading}>
                {loading ? "Iniciando sesión..." : "INICIAR SESIÓN"}
              </button>
            </div>
          </form>
        </article>
      </section>
    </>
  );
}
