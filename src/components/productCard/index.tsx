import React, { useState } from "react";
import EditElement from "../icons/edit";
import TrashElement from "../icons/trash";
import "./index.css";

type ProductCardProps = {
  name: string;
  marca: string;
  id?: number;
  productChanged?: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  marca,
  id,
  productChanged,
}) => {
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [inputs, setInputs] = useState({ name, marca });
  const [reqStatus, setReqStatus] = useState({ message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputs[e.target.name as keyof typeof inputs] = e.target.value;
    setInputs({ ...inputs });
    setReqStatus({ message: "" });
  };

  const handleSubmitModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputs.name == "" || inputs.marca == "")
      return setReqStatus({ message: "Debes completar todos los campos" });

    fetch(
      `https://express-example-production-4d54.up.railway.app/product/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(inputs),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((result) => result.json())
      .then((data) => {
        if (data?.message != "") {
          setReqStatus(data);
        }
        setModalStatus(!modalStatus);
        productChanged && productChanged();
      });
  };

  const handleDelete = () => {
    fetch(
      `https://express-example-production-4d54.up.railway.app/product/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((result) => result.json())
      .then((data) => {
        console.log("DELETE", data);

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
              name="marca"
              value={inputs.marca}
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
          <span>{marca}</span>
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
