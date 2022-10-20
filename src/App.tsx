import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

type ProductProps = {
  name: string;
  marca: string;
  id: number;
};

function App() {
  const [products, setProducts] = useState<ProductProps[]>([]);

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
    console.log("GET");

    setProducts(data);
  };
  const handlePost = async () => {
    const res = await fetch("http://localhost:3000/product", {
      method: "POST",
      body: JSON.stringify({ name: "Test", marca: "Marca Test" }),
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("POST");
    console.log(data);
  };

  return (
    <div className="App">
      <section className="section get">
        <button className="btn" onClick={handleGet}>
          GET
        </button>
        <div>
          Data:
          {products.map((item: ProductProps, index: number) => {
            return (
              <div key={`item-${index}`}>
                <p>
                  Nombre: <span>{item.name}</span>
                </p>
                <p>
                  Marca:<span>{item.marca}</span>
                </p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="section post">
        <button className="btn" onClick={handlePost}>
          POST
        </button>
        <p>Data:{""}</p>
      </section>
      <section className="section put">
        <button className="btn">PUT</button>
        <p>Data:{""}</p>
      </section>
      <section className="section delete">
        <button className="btn">DELETE</button>
        <p>Data:{""}</p>
      </section>
    </div>
  );
}

export default App;
