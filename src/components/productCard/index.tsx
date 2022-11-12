import React, { useState } from "react";
import EditElement from "../icons/edit";
import TrashElement from "../icons/trash";
import "./index.css";
import { fetchAPI } from "src/lib/api";

type ProductCardProps = {
  name: string;
  brand: string;
  id?: number;
  productChanged?: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  brand,
  id,
  productChanged,
}) => {
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [inputs, setInputs] = useState({ name, brand });
  const [reqStatus, setReqStatus] = useState({ message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputs[e.target.name as keyof typeof inputs] = e.target.value;
    setInputs({ ...inputs });
    setReqStatus({ message: "" });
  };

  const handleSubmitModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputs.name == "" || inputs.brand == "")
      return setReqStatus({ message: "Debes completar todos los campos" });

    fetchAPI(`/product/${id}`, {
      method: "PUT",
      body: inputs,
    }).then((data) => {
      if (data?.message != "") {
        setReqStatus(data);
      }
      setModalStatus(!modalStatus);
      productChanged && productChanged();
    });
  };

  const handleDelete = () => {
    fetchAPI(`/product/${id}`, {
      method: "DELETE",
    }).then((data) => {
      productChanged && productChanged();
    });
  };

  return (
    <article>
      {modalStatus && (
        <div className="modal-container">
          <form onSubmit={handleSubmitModal} className="modal">
            <input
              type="text"
              placeholder="Nombre"
              name="name"
              value={inputs.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Marca"
              name="brand"
              value={inputs.brand}
              onChange={handleChange}
            />
            {reqStatus && (
              <div style={{ fontSize: "12px", color: "red" }}>
                {reqStatus?.message}
              </div>
            )}
            <div className="buttons-container">
              <button type="submit">Guardar</button>
              <button
                className="cancel"
                type="button"
                onClick={() => setModalStatus(!modalStatus)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="data-container">
        <label>
          <p>Nombre:</p>
          <span>{name}</span>
        </label>
        <label>
          <p>Marca:</p>
          <span>{brand}</span>
        </label>
      </div>

      <div className="icons-container">
        <EditElement
          onClick={() => setModalStatus(!modalStatus)}
          className={"icon"}
        />
        <TrashElement className="icon" onClick={handleDelete}></TrashElement>
      </div>
    </article>
  );
};

export default ProductCard;
