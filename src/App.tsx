import React, { useEffect, useState } from "react";
import ResultSearch from "./components/results-search";
import Header from "./components/header";
import "./App.css";

function App() {
  const [reFetchCount, setReFetchCount] = useState<number>(0);
  console.log({ reFetchCount });

  return (
    <div className="App">
      <Header
        refresh={() => {
          setReFetchCount(reFetchCount + 1);
        }}
      ></Header>
      <ResultSearch refresh={reFetchCount}></ResultSearch>
    </div>
  );
}

export default App;
