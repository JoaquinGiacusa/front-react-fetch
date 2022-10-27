import React, { useState } from "react";
import "./index.css";
import { ProductProps } from "src/types/Products";

type CreateProductProps = {
  producToAdd: (value: ProductProps) => void;
};

const CreateProductForm: React.FC<CreateProductProps> = ({ producToAdd }) => {
  const [newProduct, setNewProduct] = useState<ProductProps>({
    name: "",
    marca: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    newProduct[e.target.name] = e.target.value;
    setNewProduct({ ...newProduct });
  };

  const handleOnSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (newProduct.name == "" || newProduct.marca == "") return;
    console.log("get:", newProduct);

    const res = await fetch(
      "https://express-example-production-b3eb.up.railway.app/product",
      {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    producToAdd(data);
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
      <button type="submit" className="button">
        Crear
      </button>
    </form>
  );
};

export default CreateProductForm;
