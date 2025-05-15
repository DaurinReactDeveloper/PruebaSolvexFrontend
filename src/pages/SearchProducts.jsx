import React, { useEffect, useState } from "react";
import { searchProductsByName } from "../services/productServices";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router";
import "../styles/products.css";
import ProductList from "../components/ProductList";

export default function SearchProducts() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";

  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [messageProducts, setMessageProducts] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      searchProductsByName(
        query,
        setProducts,
        setError,
        setMessageProducts,
        setLoading
      );
    }
  }, [query]);

  return (
    <section className="products-section">
      <br />
      <h1 className="h1-products">RESULTADOS DE BÚSQUEDA</h1>

      {messageProducts && (
        <div className="alert alert-info">{messageProducts}</div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Buscando productos...</div>}

      {!loading && !error && products.length > 0 ? (
        <Pagination data={products} itemsPerPage={2} render={ProductList} />
      ) : (
        !loading &&
        !error && <p className="text-center">No se encontraron productos.</p>
      )}

      <br />
    </section>
  );
}
