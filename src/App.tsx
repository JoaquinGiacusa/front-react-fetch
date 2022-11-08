import React, { useEffect, useState } from "react";
import ProductCard from "./components/productCard";
import "./App.css";
import { ProductProps } from "./types/Products";
import CreateProductForm from "./components/newProductForm";
import SearcherComp from "./components/searcher";
import ResultSearch from "./components/results-search";
import { useSearchParams } from "react-router-dom";

function App() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [reFetchCount, setReFetchCount] = useState<number>(0);
  // console.log(products);
  let [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search");

  useEffect(() => {
    fetch(`https://express-example-production-4d54.up.railway.app/product`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => setProducts(result))
      .catch((error) => console.log("error", error));
  }, [reFetchCount]);

  return (
    <div className="App">
      <section className="product-container">
        <SearcherComp></SearcherComp>
        {query ? (
          <ResultSearch></ResultSearch>
        ) : (
          products?.map((item: ProductProps) => {
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
          })
        )}
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
