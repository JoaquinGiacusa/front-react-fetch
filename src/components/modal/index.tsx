import React, { useEffect, useState } from "react";
import EditElement from "../icons/edit";
import TrashElement from "../icons/trash";
import "./index.css";
import { fetchAPI } from "src/lib/api";

type ModalProps = {
  name: string;
  brand: string;
  id?: number;
  open: boolean;
  productChanged?: () => void;
};

const Modal: React.FC<ModalProps> = ({
  name,
  brand,
  id,
  productChanged,
  open,
}) => {
  const [modalStatus, setModalStatus] = useState<boolean>();
  const [inputs, setInputs] = useState({ name, brand });
  const [reqStatus, setReqStatus] = useState({ message: "" });
  console.log({ modalStatus });

  useEffect(() => {
    setModalStatus(open);
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputs[e.target.name as keyof typeof inputs] = e.target.value;
    setInputs({ ...inputs });
    setReqStatus({ message: "" });
  };

  const handleSubmitModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputs.name == "" || inputs.brand == "")
      return setReqStatus({ message: "Debes completar todos los campos" });
    console.log({ inputs });

    fetchAPI(`/product/${id}`, {
      method: "PUT",
      body: inputs,
    }).then((data) => {
      console.log("PUT", data);

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
      console.log("DELETE", data);

      productChanged && productChanged();
    });
  };

  return (
    <div>
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
                onClick={() => {
                  setModalStatus(false);
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Modal;
