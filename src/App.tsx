import React, { useEffect, useState } from "react";
import ProductCard from "./components/productCard";
import "./App.css";
import { ProductProps } from "./types/Products";
import CreateProductForm from "./components/newProductForm";
import SearcherComp from "./components/searcher";
import ResultSearch from "./components/results-search";
import { useSearchParams } from "react-router-dom";

function App() {
  const [reFetchCount, setReFetchCount] = useState<number>(0);

  return (
    <div className="App">
      <header className="header">
        <SearcherComp></SearcherComp>
        <CreateProductForm
          producCreated={() => {
            setReFetchCount((prev) => {
              return prev + 1;
            });
          }}
        ></CreateProductForm>
      </header>
      <ResultSearch refresh={reFetchCount}></ResultSearch>
    </div>
  );
}

export default App;
