import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../productCard";
import { ProductProps } from "../../types/Products";
import "./index.css";
import { fetchAPI } from "src/lib/api";

type ResultSearchProp = {
  refresh: () => void;
};

const ResultSearch: React.FC<ResultSearchProp> = ({ refresh }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [result, setResult] = useState([]);
  const [reFetchCount, setReFetchCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setSearchParams({
      search: query as string,
      page: currentPage.toString(),
    });
    setReFetchCount((prev) => prev + 1);
  }, [currentPage]);

  useEffect(() => {
    setIsloading(true);
    fetchAPI(
      `/product?search=${query || ""}&limit=${"4"}&page=${currentPage}`
    ).then((data) => {
      if (data.result.length == 0) {
        setCurrentPage((prev) => (prev = 1));
      } else {
        setResult(data.result);
        setTotalPages(data.totalPage);
        setIsloading(false);
      }
    });
  }, [reFetchCount, query, page, refresh]);

  /////////
  let items = [];
  for (let number = 1; number <= totalPages!; number++) {
    items.push(
      <div
        key={number}
        className={
          number === currentPage ? "round-effect active" : "round-effect"
        }
        onClick={() => {
          setCurrentPage(number);
          setReFetchCount((prev) => prev + 1);
        }}
      >
        {number}
      </div>
    );
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setReFetchCount((prev) => prev + 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages!) {
      setCurrentPage(currentPage + 1);
      setReFetchCount((prev) => prev + 1);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="lds-circle">
          <div></div>
          <p>Cargando...</p>
        </div>
      ) : result?.length > 0 ? (
        <div>
          <div className="cards-container">
            {result?.map((item: ProductProps) => {
              return (
                <ProductCard
                  key={item.id}
                  name={item.name}
                  brand={item.brand}
                  id={item.id}
                  productChanged={() => {
                    setReFetchCount((prev) => prev + 1);
                  }}
                />
              );
            })}
          </div>
          <div className="pagination-container">
            <div className="paginate-ctn">
              <div className="round-effect" onClick={prevPage}>
                &lsaquo;
              </div>
              {items}
              <div className="round-effect" onClick={nextPage}>
                &rsaquo;
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          No se encontraron resultados para:
          <span style={{ fontWeight: "bold" }}>{query}</span>
        </div>
      )}
    </div>
  );
};

export default ResultSearch;
