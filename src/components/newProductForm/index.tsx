import React, { useState } from "react";
import "./index.css";
import { ProductProps } from "src/types/Products";
import { fetchAPI } from "src/lib/api";
import Modal from "../modal";

type CreateProductProps = {
  producCreated: () => void;
};

const CreateProductForm: React.FC<CreateProductProps> = ({ producCreated }) => {
  const [newProduct, setNewProduct] = useState<ProductProps>({
    name: "",
    brand: "",
  });
  const [reqStatus, setReqStatus] = useState({ message: "" });
  //  console.log(reqStatus);
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    newProduct[e.target.name] = e.target.value;
    setNewProduct({ ...newProduct });
    setReqStatus({ message: "" });
  };

  const handleOnSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    //if (newProduct.name == "" || newProduct.brand == "") return;

    fetchAPI("/product", { method: "POST", body: newProduct }).then((data) => {
      if (data?.message != "") {
        setReqStatus(data);
      }
    });

    producCreated();
    setNewProduct({
      name: "",
      brand: "",
    });
  };

  return (
    <div>
      <button
        onClick={() => {
          console.log("xd", modalStatus);

          setModalStatus(true);
        }}
        className="new-product-button"
      >
        +
      </button>
      {<Modal name={""} brand={""} open={modalStatus}></Modal>}
    </div>
  );
};

export default CreateProductForm;
