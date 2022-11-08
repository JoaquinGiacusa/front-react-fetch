import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../productCard";
import { ProductProps } from "../../types/Products";
import "./index.css";

type ResultSearchProp = {};

const ResultSearch: React.FC<ResultSearchProp> = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsloading] = useState<Boolean>(true);
  const [result, setResult] = useState([]);
  const query = searchParams.get("search");
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset");
  const [reFetchCount, setReFetchCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(
    offset === "0" ? 1 : Number(offset) / 4 + 1
  );
  console.log({ currentPage, offset });

  useEffect(() => {
    if (query != null) console.log("cambie");

    fetch(
      `https://express-example-production-4d54.up.railway.app/search?q=${query}&limit=${limit}&offset=${offset}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("llege aca");
        console.log(data.serachResult);
        setResult(data.serachResult);

        setIsloading(false);
      });
  }, [query, reFetchCount, currentPage]);

  /////////
  let maxPages = 10;
  let items = [];
  let leftSide = currentPage - 2;
  if (leftSide <= 0) leftSide = 1;
  let rightSide = currentPage + 2;
  if (rightSide > maxPages) rightSide = maxPages;
  for (let number = leftSide; number <= rightSide; number++) {
    items.push(
      <div
        key={number}
        className={
          number === currentPage ? "round-effect active" : "round-effect"
        }
        onClick={() => {
          setCurrentPage(number);
        }}
      >
        {number}
      </div>
    );
  }

  // useEffect(() => {
  //   setSearchParams({
  //     search: query as string,
  //     limit: limit as string,
  //     offset: (currentPage * 4).toString(),
  //   });
  // }, [currentPage]);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setSearchParams({
        search: query as string,
        limit: limit as string,
        offset: (Number(offset) - 4).toString(),
      });
    }
  };

  const nextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
      setSearchParams({
        search: query as string,
        limit: limit as string,
        offset: (currentPage * 4).toString(),
      });
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>Cargando</div>
      ) : result?.length > 0 ? (
        <div>
          {result?.map((item: ProductProps) => {
            return (
              <ProductCard
                key={item.id}
                name={item.name}
                marca={item.marca}
                id={item.id}
                productChanged={() => {
                  setReFetchCount((prev) => prev + 1);
                }}
              />
            );
          })}
          <div className="pagination-container">
            <div className="flex-container">
              <div> currentPage : {currentPage} </div>

              <div className="paginate-ctn">
                <div className="round-effect" onClick={prevPage}>
                  {" "}
                  &lsaquo;{" "}
                </div>
                {items}
                <div className="round-effect" onClick={nextPage}>
                  {" "}
                  &rsaquo;{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          No se encontraron resultados para:{" "}
          <span style={{ fontWeight: "bold" }}>{query}</span>
        </div>
      )}
    </div>
  );
};

export default ResultSearch;
