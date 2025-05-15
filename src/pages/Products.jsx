import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productServices";
import Pagination from "../components/Pagination";
import ProductList from "../components/ProductList";
import "../styles/products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts(setProducts, setError, setMessage, setLoading);
  }, []);

  return (
    <section className="products-section">
      <br />
      <h1 className="h1-products">PRODUCTOS</h1>
      {message && <div className="alert alert-info">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Cargando productos...</div>}

      {!loading && !error && products.length > 0 ? (
        <Pagination data={products} itemsPerPage={2} render={ProductList} />
      ) : (
        !loading &&
        !error && <p className="text-center">No hay productos disponibles.</p>
      )}

      <br />
    </section>
  );
}
