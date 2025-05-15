import React, { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../services/userServices";
import { FaUserEdit } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";
import authService from "../utils/token";
import { CreateUserModal, EditUserModal } from "./ModalsUser";
import "../styles/table.css";

export default function ShowUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messageresult, setMessageResult] = useState("");
  const current_user = authService.getUserDataFromStorage();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getUsers(setUsers, setError, setLoading);
  }, []);

  const handleDelete = (userId) => {
    deleteUser(userId, current_user.id, setLoading, setError, setMessageResult);
  };

  let counter = 1;

  return (
    <div className="container mt-4 container-table-user">
      <button
        type="button"
        className="btn-add-user"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Crear Usuario
      </button>

      {messageresult && <div className="alert alert-info">{messageresult}</div>}

      {loading && <div className="alert alert-info">Cargando usuarios...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <table className="table table-bordered table-striped">
          <thead className="table-names">
            <tr className="tr-tablet-user">
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Actualizar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => {
                const rowId = counter++;

                return (
                  <tr key={user.id} className="tr-tablet-user">
                    <td>{rowId}</td>
                    <td className="td-name">{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        className="btn-edit-user"
                        data-bs-toggle="modal"
                        data-bs-target="#editUserModal"
                        onClick={() => setSelectedUser(user)}
                      >
                        <FaUserEdit />
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn-delete-user"
                        onClick={() => handleDelete(user.id)}
                      >
                        <TiUserDelete />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <CreateUserModal setMessageResult={setMessageResult} />
      <EditUserModal selectedUser={selectedUser} />
    </div>
  );
}
