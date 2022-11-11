import React, { useState } from "react";
import "./index.css";
import { ProductProps } from "src/types/Products";
import { fetchAPI } from "src/lib/api";
import Modal from "../modal";

type CreateProductProps = {
  producCreated: () => void;
  className?: string;
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
      console.log(data);
      console.log("product created");
      if (data?.message) {
        console.log("eroeroerre");

        setReqStatus(data);
      } else {
        console.log("product created");

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
          // value={inputs.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Marca"
          name="brand"
          // value={inputs.brand}
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
