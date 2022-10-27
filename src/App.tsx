import React, { useEffect, useState } from "react";
import ProductCard from "./components/productCard";
import "./App.css";
import { ProductProps } from "./types/Products";
import CreateProductForm from "./components/newProductForm";

function App() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [reFetchCount, setReFetchCount] = useState<number>(0);

  useEffect(() => {
    fetch(`https://express-example-production-b3eb.up.railway.app/product`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => setProducts(result))
      .catch((error) => console.log("error", error));
  }, [reFetchCount]);

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
              productChanged={() => {
                setReFetchCount((prev) => {
                  return prev + 1;
                });
              }}
            ></ProductCard>
          );
        })}
      </section>
      <CreateProductForm
        producCreated={() => {
          setReFetchCount((prev) => {
            return prev + 1;
          });
        }}
      ></CreateProductForm>
    </div>
  );
}

export default App;
