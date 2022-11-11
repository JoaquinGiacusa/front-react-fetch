import React, { useEffect, useState } from "react";
import CreateProductForm from "../newProductForm";
import SearcherComp from "../searcher";
import "./index.css";

type HeaderProps = {
  refresh: () => void;
};

const Header: React.FC<HeaderProps> = ({ refresh }) => {
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  return (
    <header className="header">
      <div className="header-content">
        <button
          onClick={() => setModalStatus(!modalStatus)}
          className="new-product-button"
        >
          +
        </button>
        <SearcherComp className="search-comp"></SearcherComp>
      </div>
      <div className="new-product-container">
        {modalStatus && (
          <CreateProductForm
            producCreated={() => {
              setModalStatus(false);
              refresh();
            }}
          ></CreateProductForm>
        )}
      </div>
    </header>
  );
};

export default Header;
