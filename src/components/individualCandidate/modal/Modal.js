import React from "react";
import ModalClose from "../../../assets/images/modalclose.svg";

const Modal = ({ children, modalHandler }) => {
  return (
    <div>
      <div className="modal">
        <button className="modal-close" onClick={() => modalHandler(false)}>
          <img src={ModalClose} alt="" />
        </button>
        {children}
      </div>
      <p className="modal-overlay"/>
    </div>
  );
};

export default Modal;
