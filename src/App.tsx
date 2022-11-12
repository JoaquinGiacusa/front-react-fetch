import React, { useEffect, useState } from "react";
import ResultSearch from "./components/results-search";
import Header from "./components/header";

function App() {
  const [reFetchCount, setReFetchCount] = useState<number>(0);

  return (
    <div>
      <Header
        refresh={() => {
          setReFetchCount(reFetchCount + 1);
        }}
      ></Header>
      <ResultSearch refresh={() => reFetchCount}></ResultSearch>
    </div>
  );
}

export default App;
