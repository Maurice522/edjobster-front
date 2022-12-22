import React, { useState } from "react";
import BtnArrow from "../../../../assets/images/btnarrow.svg";

const ContentTop = ({ modalHandler }) => {
  const [menu, setMenu] = useState({
    toggle: false,
    menuName: "Hiring Stage",
  });

  const menuToggle = (value) => {
    setMenu({
      toggle: !menu.toggle,
      menuName: value,
    });
  };

  return (
    <div className="common-width">
      <p className="content-top-border" />
      <div className="ct-content">
        <div className="ct-content ct-content__left">
          <div>
            <p className="ct-content-title">Last Job Applied</p>
            <p className="ct-content-des">HOD, Civil</p>
          </div>
          <div>
            <p className="ct-content-title">Hiring Status</p>
            <p className="ct-content-des">Shortlisted</p>
          </div>
          <div>
            <p className="ct-content-title">Resume</p>
            <p className="ct-content-des">View</p>
          </div>
        </div>
        <div className="ct-content ct-content__right">
          <p className="ct-content-btn">Schedule Interview</p>
          <button className="ct-content-btn" onClick={() => modalHandler(true)} onKeyDown={modalHandler(true)}>
            Assign to a job
          </button>
          <div className="ct-content-hs-reletive">
            <div
              className="ct-content-hs"
            >
              <button className="ct-content-btn ct-content-btn__hs" onClick={() => menuToggle(menu.menuName)}>
                {menu.menuName}
              </button>
              <img src={BtnArrow} alt="" className="ct-content-btn-icon" />
            </div>
            {menu.toggle && (
              <ul className="ct-content-hs-items">
                <button
                  className="ct-content-hs-list"
                  onClick={() => menuToggle("Hiring Stage")}
                >
                  Hiring Stage
                </button>
                <button
                  className="ct-content-hs-list"
                  onClick={() => menuToggle("Applied")}
                >
                  Applied
                </button>
                <button
                  className="ct-content-hs-list"
                  onClick={() => menuToggle("Shortlisted")}
                >
                  Shortlisted
                </button>
                <button
                  className="ct-content-hs-list"
                  onClick={() => menuToggle("In Review")}
                >
                  In Review
                </button>
                <button
                  className="ct-content-hs-list"
                  onClick={() => menuToggle("  HR Interview")}
                >
                  HR Interview
                </button>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentTop;
