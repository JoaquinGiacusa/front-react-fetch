import React, { useEffect, useState } from "react";
import ProductCard from "./components/productCard";
import "./App.css";
import { ProductProps } from "./types/Products";
import CreateProductForm from "./components/newProductForm";

function App() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    fetch(`https://express-example-production-b3eb.up.railway.app/product`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => setProducts(result))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className="App">
      <section className="product-container">
        <h1 className="products-title">Lista de productos:</h1>

        {products.map((item: ProductProps) => {
          return (
            <ProductCard
              key={item.id}
              name={item.name}
              marca={item.marca}
              id={item.id}
            ></ProductCard>
          );
        })}
      </section>
      <CreateProductForm
        producToAdd={(data) => {
          setProducts([...products, data]);
        }}
      ></CreateProductForm>
    </div>
  );
}

export default App;
