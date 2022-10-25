import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

type ProductProps = {
  name: string;
  marca: string;
  id?: number;
};

function App() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [newProduct, setNewProduct] = useState<ProductProps>({
    name: "",
    marca: "",
  });
  const [editModal, setEditMoral] = useState<Boolean>(false);

  useEffect(() => {
    fetch("http://localhost:3000/product", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => setProducts(result))
      .catch((error) => console.log("error", error));
  }, []);

  const handleGet = async () => {
    const res = await fetch("http://localhost:3000/product");
    const data = await res.json();
    setProducts(data);
  };

  const handleOnSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/product", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    setProducts((prev) => {
      return [...prev, data];
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    newProduct[e.target.name] = e.target.value;
    setNewProduct({ ...newProduct });
  };

  return (
    <div className="App">
      <section className="product-container">
        <div>
          Data:
          {products.map((item: ProductProps, index: number) => {
            return (
              <div key={`item-${index}`} className={"product-card"}>
                {editModal && (
                  <div>
                    <input type="text" name="name" />
                    <input type="text" name="marca" />
                  </div>
                )}
                <p>
                  Nombre: <span>{item.name}</span>
                </p>
                <p>
                  Marca:<span>{item.marca}</span>
                </p>
                <div>
                  <button onClick={() => setEditMoral(!editModal)}>
                    Editar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <form onSubmit={handleOnSubmit}>
        <input type="text" name="name" onChange={handleChange} />
        <input type="text" name="marca" onChange={handleChange} />
        <button type="submit">Crear nuevo</button>
      </form>
    </div>
  );
}

export default App;
