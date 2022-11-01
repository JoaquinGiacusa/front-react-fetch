import React, { useState } from "react";
import "./index.css";
import { ProductProps } from "src/types/Products";

type CreateProductProps = {
  producCreated: () => void;
};

const CreateProductForm: React.FC<CreateProductProps> = ({ producCreated }) => {
  const [newProduct, setNewProduct] = useState<ProductProps>({
    name: "",
    marca: "",
  });
  const [reqStatus, setReqStatus] = useState({ message: "" });
  //  console.log(reqStatus);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    newProduct[e.target.name] = e.target.value;
    setNewProduct({ ...newProduct });
    setReqStatus({ message: "" });
  };

  const handleOnSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    //if (newProduct.name == "" || newProduct.marca == "") return;

    const res = await fetch(
      "https://express-example-production-4d54.up.railway.app/product",
      {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (data?.message != "") {
      setReqStatus(data);
    }

    producCreated();
    setNewProduct({
      name: "",
      marca: "",
    });
  };

  return (
    <form className="new-product-container" onSubmit={handleOnSubmit}>
      <h3 className="new-product-title">Crear nuevo producto:</h3>
      <input
        className="input"
        type="text"
        name="name"
        onChange={handleChange}
        placeholder={"Nombre"}
        value={newProduct.name}
      />
      <input
        className="input"
        type="text"
        name="marca"
        onChange={handleChange}
        placeholder={"Marca"}
        value={newProduct.marca}
      />
      {reqStatus && (
        <div style={{ fontSize: "12px", color: "red" }}>
          {reqStatus?.message}
        </div>
      )}
      <button type="submit" className="button">
        Crear
      </button>
    </form>
  );
};

export default CreateProductForm;
