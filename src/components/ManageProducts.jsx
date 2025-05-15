import React, { useEffect, useState } from "react";
import authService from "../utils/token";
import { deleteProduct, getProducts } from "../services/productServices";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { CreateProductModal, EditProductModal } from "./ModalsUser";
import "../styles/table.css";

export default function ManageProducts({ seller }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messageResult, setMessageResult] = useState("");
  const user = authService.getUserDataFromStorage();

  useEffect(() => {
    getProducts(setProducts, setError, setMessageResult, setLoading);
  }, []);

  const handleDelete = (productId) => {
    deleteProduct(productId, user.id, setLoading, setError, setMessageResult);
  };

  return (
    <div className="container mt-4 container-table-user">
      {seller && (
        <div>
          <button
            className="btn-add-user"
            data-bs-toggle="modal"
            data-bs-target="#createProductModal"
          >
            Añadir Producto
          </button>
        </div>
      )}

      {messageResult && <div className="alert alert-info">{messageResult}</div>}
      {loading && <div className="alert alert-info">Cargando productos...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <table className="table table-bordered table-striped">
          <thead className="table-names">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Color</th>
              <th>Precio</th>
              {seller && <th>Editar</th>}
              {seller == false && <th>Eliminar</th>}
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td className="td-name">{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.color}</td>
                  <td>${product.price}</td>
                  {seller && (
                    <td>
                      <button
                        className="btn-edit-user"
                        data-bs-toggle="modal"
                        data-bs-target="#editProductModal"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <FaEdit />
                      </button>
                    </td>
                  )}
                  {seller == false && (
                    <td>
                      <button
                        className="btn-delete-user"
                        onClick={() => handleDelete(product.id)}
                      >
                        <RiDeleteBin2Fill />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={seller ? "7" : "6"} className="text-center">
                  No hay productos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <EditProductModal selectedProduct={selectedProduct} />

      <CreateProductModal />
    </div>
  );
}
