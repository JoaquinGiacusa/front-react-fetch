import React, { useState } from "react";
import "./index.css";

type ProductCardProps = {
  name: string;
  marca: string;
  id?: number;
};

const ProductCard: React.FC<ProductCardProps> = ({ name, marca, id }) => {
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [inputs, setInputs] = useState({ name, marca });
  console.log({ inputs });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    inputs[e.target.name] = e.target.value;
    setInputs({ ...inputs });
  };

  const handleSubmitModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputs.name == "" || inputs.marca == "") return;

    fetch(
      `https://express-example-production-b3eb.up.railway.app/product/${id}`,
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
        setModalStatus(!modalStatus);
        window.location.reload();
      });
  };

  const handleDelete = () => {
    console.log("delete");

    fetch(
      `https://express-example-production-b3eb.up.railway.app/product/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((result) => result.json())
      .then(() => {
        window.location.reload();
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
        <img
          className="icon"
          src={"./edit.svg"}
          onClick={() => setModalStatus(!modalStatus)}
        ></img>
        <img className="icon" src={"./trash.svg"} onClick={handleDelete}></img>
      </div>
    </article>
  );
};

export default ProductCard;
