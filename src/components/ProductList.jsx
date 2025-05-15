import React from "react";

const ProductList = (items) => {
  if (!items || items.length === 0) {
    return <p>No se encontraron productos</p>;
  }

  return (
    <article className="product-list">
      {items.map(({ id, imageUrl, name, description, color, price }) => (
        <div key={id} className="product-item">
          <div className="div-img-product">
            <img src={imageUrl} alt={name} className="product-img img-fluid" />
          </div>
          <div className="div-description-product">
            <h3>{name}</h3>
            <p>{description}</p>
            <p>
              <strong>Color:</strong> {color}
            </p>
            <p className="p-precio-product">
              <strong>Precio:</strong> ${parseFloat(price).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </article>
  );
};

export default ProductList;
