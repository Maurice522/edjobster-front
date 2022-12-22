import React, { useState } from "react";
import Back from "../../../../assets/images/back.svg";
import Bar from "../../../../assets/images/bar.svg";

const TitleTop = () => {
  const [menu, setMenu] = useState(false);

  const menuToggle = () => {
    setMenu(!menu);
  };

  return (
    <div className="tt common-width">
      <div className="tt-back">
        <img src={Back} alt="" />
        <p className="tt-back-create">Abhineet Sabharwal</p>
        <p className="tt-back-info">M. Tech. (Structure)</p>
        <p className="tt-back-info">+91-9930705653</p>
      </div>
      <div className="tt-dot-bar">
        <img src={Bar} alt="" className="tt-bar" onClick={menuToggle} />
        {menu && (
          <ul className="ct-content-hs-items">
            <li className="ct-content-hs-list">Edit Candidate</li>
            <li className="ct-content-hs-list">Send Email</li>
            <li className="ct-content-hs-list">View Past Appliations</li>
            <li className="ct-content-hs-list">Delete Candidate</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default TitleTop;
