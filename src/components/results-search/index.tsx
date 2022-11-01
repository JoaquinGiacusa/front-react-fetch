import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../productCard";
import { ProductProps } from "../../types/Products";

type ResultSearchProp = {};

const ResultSearch: React.FC<ResultSearchProp> = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [result, setResult] = useState([]);
  const query = searchParams.get("search");

  console.log({ result });

  useEffect(() => {
    fetch(
      `https://express-example-production-4d54.up.railway.app/search?q=${query}`
    )
      .then((res) => res.json())
      .then((data) => {
        setResult(data.serachResult);
      });
  }, [query]);

  return (
    <div>
      {result?.length > 0 ? (
        result?.map((item: ProductProps) => {
          return (
            <ProductCard
              key={item.id}
              name={item.name}
              marca={item.marca}
              productChanged={() => {
                console.log("productChanged");
              }}
            ></ProductCard>
          );
        })
      ) : (
        <div>Error de busqueda</div>
      )}
    </div>
  );
};

export default ResultSearch;
