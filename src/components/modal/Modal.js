import React from "react";
import ModalClose from "../../assets/images/modalclose.svg";

const Modal = ({ children, modalHandler }) => {
  return (
    <div>
      <div className="modal">
        <div className="modal-close" >
          {/* <img src={ModalClose} alt="" onClick={() => modalHandler(false)}/> */}
        </div>
        {children}
      </div>
      <p className="modal-overlay" />
    </div>
  );
};

export default Modal;
