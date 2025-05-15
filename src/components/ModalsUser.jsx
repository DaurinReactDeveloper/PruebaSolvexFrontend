import React, { useState, useEffect } from "react";
import { saveUser, updateUser } from "../services/userServices";
import authService from "../utils/token";
import { saveProduct, update } from "../services/productServices";
import { colors } from "../data/colors";
import "../styles/modals.css";

export function CreateUserModal() {
  const userId = authService.getUserDataFromStorage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [messageEmail, setMessageEmail] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const [messageName, setMessageName] = useState("");
  const [messageRole, setMessageRole] = useState("");
  const [messageResult, setMessageResult] = useState("");

  async function handleSubmit() {
    await saveUser(
      userId.id,
      name,
      email,
      role,
      password,
      setMessageEmail,
      setMessagePassword,
      setMessageName,
      setMessageRole,
      setError,
      setLoading,
      setMessageResult
    );
  }

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Crear Usuario
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  minLength={9}
                  maxLength={23}
                  required
                />
                {messageName && (
                  <div className="alert alert-warning">{messageName}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  minLength={11}
                  maxLength={99}
                  required
                />
                {messageEmail && (
                  <div className="alert alert-warning">{messageEmail}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={9}
                  maxLength={14}
                  required
                />
                {messagePassword && (
                  <div className="alert alert-warning">{messagePassword}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Rol
                </label>
                <select
                  className="form-select"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="User">Usuario</option>
                  <option value="Admin">Administrador</option>
                  <option value="Seller">Vendedor</option>
                </select>
                {messageRole && (
                  <div className="alert alert-warning">{messageRole}</div>
                )}
              </div>

              {error && <div className="alert alert-danger">{error}</div>}
              {messageResult && (
                <div className="alert alert-success">{messageResult}</div>
              )}

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-close-modal"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button type="submit" className="btn-add" disabled={loading}>
                  {loading ? "Cargando..." : "Crear Usuario"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EditUserModal({ selectedUser }) {
  const currentUser = authService.getUserDataFromStorage();

  const [name, setName] = useState(selectedUser?.name || "");
  const [email, setEmail] = useState(selectedUser?.email || "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(selectedUser?.role || "User");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [messageEmail, setMessageEmail] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const [messageName, setMessageName] = useState("");
  const [messageRole, setMessageRole] = useState("");
  const [messageResult, setMessageResult] = useState("");

  useEffect(() => {
    setName(selectedUser?.name || "");
    setEmail(selectedUser?.email || "");
    setRole(selectedUser?.role || "User");
    setPassword("");
  }, [selectedUser]);

  const handleSubmit = async () => {
    await updateUser(
      selectedUser.id,
      name,
      email,
      role,
      password,
      currentUser.id,
      setMessageEmail,
      setMessageRole,
      setMessagePassword,
      setMessageName,
      setError,
      setLoading,
      setMessageResult
    );
  };

  return (
    <div
      className="modal fade"
      id="editUserModal"
      tabIndex="-1"
      aria-labelledby="editUserModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editUserModalLabel">
              Editar Usuario
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="mb-3">
                <label htmlFor="edit-name" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="edit-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  minLength={9}
                  maxLength={23}
                  required
                />
                {messageName && (
                  <div className="alert alert-warning">{messageName}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="edit-email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="edit-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  minLength={11}
                  maxLength={99}
                  required
                />
                {messageEmail && (
                  <div className="alert alert-warning">{messageEmail}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="edit-password" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="edit-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={0}
                  maxLength={14}
                />
                {messagePassword && (
                  <div className="alert alert-warning">{messagePassword}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="edit-role" className="form-label">
                  Rol
                </label>
                <select
                  className="form-select"
                  id="edit-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="User">Usuario</option>
                  <option value="Admin">Administrador</option>
                  <option value="Seller">Vendedor</option>
                </select>
                {messageRole && (
                  <div className="alert alert-warning">{messageRole}</div>
                )}
              </div>

              {error && <div className="alert alert-danger">{error}</div>}
              {messageResult && (
                <div className="alert alert-success">{messageResult}</div>
              )}

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-close-modal"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button type="submit" className="btn-add" disabled={loading}>
                  {loading ? "Cargando..." : "Actualizar Usuario"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CreateProductModal() {
  const user = authService.getUserDataFromStorage();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [img, setImg] = useState(null);
  const [price, setPrice] = useState(0);
  const [messageName, setMessageName] = useState("");
  const [messageDescription, setMessageDescription] = useState("");
  const [messagePrice, setMessagePrice] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [messageResult, setMessageResult] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  };

  async function handleSubmit() {
    await saveProduct(
      name,
      description,
      img,
      color,
      price,
      user.id,
      setMessageName,
      setMessageDescription,
      setMessageColor,
      setMessagePrice,
      setError,
      setLoading,
      setMessageResult
    );
  }

  return (
    <div
      className="modal fade"
      id="createProductModal"
      tabIndex="-1"
      aria-labelledby="createProductModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header modal-header-add-product">
            <h5 className="modal-title" id="createProductModalLabel">
              Crear Producto
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="mb-3">
                <label htmlFor="productImg" className="form-label">
                  Imagen
                </label>

                <input
                  type="file"
                  className="form-control"
                  id="productImg"
                  accept="image/jpeg, image/webp"
                  onChange={handleFileChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="productName" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  minLength={9}
                  maxLength={48}
                  required
                />
                {messageName && (
                  <div className="form-text text-danger">{messageName}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="productDescription" className="form-label">
                  Descripción
                </label>
                <textarea
                  className="form-control"
                  id="productDescription"
                  rows="2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  minLength={21}
                  maxLength={149}
                  required
                />
                {messageDescription && (
                  <div className="form-text text-danger">
                    {messageDescription}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="productColor" className="form-label">
                  Color
                </label>
                <select
                  id="productColor"
                  className="form-select"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  required
                >
                  <option value="">Seleccionar color</option>
                  {colors.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
                {messageColor && (
                  <div className="form-text text-danger">{messageColor}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="productPrice" className="form-label">
                  Precio
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="productPrice"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min={1}
                  required
                />
                {messagePrice && (
                  <div className="form-text text-danger">{messagePrice}</div>
                )}
              </div>

              {error && <div className="alert alert-danger">{error}</div>}
              {messageResult && (
                <div className="alert alert-success">{messageResult}</div>
              )}

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-close-modal"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button type="submit" className="btn-add" disabled={loading}>
                  {loading ? "Cargando..." : "Crear Producto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EditProductModal({ selectedProduct }) {
  const currentUser = authService.getUserDataFromStorage();
  const [name, setName] = useState(selectedProduct?.name || "");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(selectedProduct?.price || 0);
  const [color, setColor] = useState(selectedProduct?.color || "");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [messageName, setMessageName] = useState("");
  const [messageDescription, setMessageDescription] = useState("");
  const [messagePrice, setMessagePrice] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [messageResult, setMessageResult] = useState("");

  useEffect(() => {
    setName(selectedProduct?.name || "");
    setPrice(selectedProduct?.price || "");
    setColor(selectedProduct?.color || "");
  }, [selectedProduct]);

  const handleSubmit = async () => {
    await update(
      selectedProduct.id,
      name,
      description,
      color,
      price,
      currentUser.id,
      setMessageName,
      setMessageDescription,
      setMessageColor,
      setMessagePrice,
      setError,
      setLoading,
      setMessageResult
    );
  };

  return (
    <div
      className="modal fade"
      id="editProductModal"
      tabIndex="-1"
      aria-labelledby="editProductModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header modal-header-edit-product">
            <h5 className="modal-title" id="editProductModalLabel">
              Editar Producto
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="mb-3">
                <label htmlFor="edit-product-name" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="edit-product-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  minLength={9}
                  maxLength={48}
                  required
                />
                {messageName && (
                  <div className="alert alert-warning">{messageName}</div>
                )}
              </div>

              <div className="mb-3">
                <label
                  htmlFor="edit-product-description"
                  className="form-label"
                >
                  Descripción
                </label>
                <textarea
                  className="form-control"
                  id="edit-product-description"
                  rows="2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  minLength={21}
                  maxLength={149}
                  required
                />
                {messageDescription && (
                  <div className="alert alert-warning">
                    {messageDescription}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="edit-product-price" className="form-label">
                  Precio
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="edit-product-price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min={1}
                  required
                />
                {messagePrice && (
                  <div className="alert alert-warning">{messagePrice}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="edit-product-color" className="form-label">
                  Color
                </label>
                <select
                  id="edit-product-color"
                  className="form-select"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  required
                >
                  <option value="">Seleccionar color</option>
                  {colors.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
                {messageColor && (
                  <div className="alert alert-warning">{messageColor}</div>
                )}
              </div>

              {error && <div className="alert alert-danger">{error}</div>}
              {messageResult && (
                <div className="alert alert-success">{messageResult}</div>
              )}

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-close-modal"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button type="submit" className="btn-add" disabled={loading}>
                  {loading ? "Cargando..." : "Actualizar Producto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
