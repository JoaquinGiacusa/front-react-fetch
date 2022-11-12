import React, { useState } from "react";
import "./index.css";
import { ProductProps } from "src/types/Products";
import { fetchAPI } from "src/lib/api";

type CreateProductProps = {
  producCreated: () => void;
};

const CreateProductForm: React.FC<CreateProductProps> = ({ producCreated }) => {
  const [newProduct, setNewProduct] = useState<ProductProps>({
    name: "",
    brand: "",
  });
  const [reqStatus, setReqStatus] = useState({ message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    newProduct[e.target.name] = e.target.value;
    setNewProduct({ ...newProduct });
    setReqStatus({ message: "" });
  };

  const handleOnSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    fetchAPI("/product", { method: "POST", body: newProduct }).then((data) => {
      if (data?.message) {
        setReqStatus(data);
      } else {
        producCreated();
        setNewProduct({
          name: "",
          brand: "",
        });
      }
    });
  };

  return (
    <div className="new-product-container">
      <form onSubmit={handleOnSubmit} className="new-product-form">
        <h3>Crear Producto:</h3>
        <input
          type="text"
          placeholder="Nombre"
          name="name"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Marca"
          name="brand"
          onChange={handleChange}
        />
        {reqStatus && (
          <div style={{ fontSize: "15px", color: "#bb0b0b" }}>
            {reqStatus?.message}
          </div>
        )}
        <button className="submit-btn" type="submit">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
