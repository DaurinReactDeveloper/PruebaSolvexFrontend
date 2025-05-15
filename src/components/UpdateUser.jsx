import React, { useState, useEffect } from "react";
import { update } from "../services/userServices";

const UpdateUser = ({
  show,
  handleClose,
  user,
  setMessageResult,
  setError,
  setLoading,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  const handleSubmit = async () => {
    setLoading(true);
    await update(
      user.id,
      name,
      email,
      password,
      user.id,
      setError,
      setLoading,
      setMessageResult
    );
    handleClose();
  };

  return (
    <div
      className={`modal ${show ? "d-block" : "d-none"}`}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="updateUserModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="updateUserModalLabel">
              Actualizar Usuario
            </h5>
            <button
              type="button"
              className="close"
              onClick={handleClose}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Ingrese el nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Ingrese el correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Ingrese la contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Rol</label>
                <select
                  className="form-control"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="User">Usuario</option>
                  <option value="Admin">Administrador</option>
                  <option value="Seller">Vendedor</option>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Actualizar Usuario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
