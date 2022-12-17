import React, { useState } from "react";
import AssignJob from "./AssignJob";
import Modal from "../modal/Modal";
import TitleTop from "./TitleTop";
import ContentTop from "./ContentTop";
import CandidateProfileLeft from "./CandidateProfileLeft";
import CandidateProfileRight from "./CandidateProfileRight";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const modalHandler = (value) => {
    setModalOpen(value);
  };

  return (
    <div>
      <TitleTop />
      <ContentTop modalHandler={modalHandler} />
      <div className="common-width">
        <p className="content-top-border content-top-border__can-pro"/>
        <div className="can-pro">
          <CandidateProfileLeft />
          <CandidateProfileRight />
        </div>
      </div>
      {modalOpen && (
        <Modal modalHandler={modalHandler}>
          <AssignJob />
        </Modal>
      )}
    </div>
  );
};

export default Index;
