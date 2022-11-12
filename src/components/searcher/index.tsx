import React, { useState } from "react";
import SearchIcon from "../icons/search";
import "./index.css";
import { useSearchParams } from "react-router-dom";

type SearcherCompProp = {
  onSearch?: (value: string) => void;
};

const SearcherComp: React.FC<SearcherCompProp> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState<string>("");
  let [searchParams, setSearchParams] = useSearchParams();

  const handleOnSerach = () => {
    if (inputValue.trim() === "") return;
    setSearchParams({ search: inputValue, page: "1" });
    setInputValue("");
  };
  return (
    <div className="searcher-container">
      <input
        type="text"
        placeholder="Buscar..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleOnSerach()}
      />
      <SearchIcon className="search-icon" onClick={handleOnSerach}></SearchIcon>
    </div>
  );
};

export default SearcherComp;
