import React from "react";
import axios from "axios";
import SelectArrow from "../../../assets/images/selectarrow.svg";

const CreateCandidate = () => {
  return (
    <div className="cc-edu">
      <p className="cc-pd">Education Details</p>
      <div className="cc-form-content">
        <div>
          <label htmlFor="cc-label" className="cc-label">
            Institute
            <input
            type="text"
            placeholder="Search for the country name..."
            htmlFor="cc-label"
            className="cc-input"
          />
          </label>
          <br />
          <input
            type="text"
            placeholder="Search for the country name..."
            htmlFor="cc-label"
            className="cc-input"
          />
        </div>
        <div>
          <label htmlFor="cc-label" className="cc-label">
            Degree
            <input
            type="text"
            placeholder="Search for the city name..."
            htmlFor="cc-label"
            className="cc-input"
          />
          </label>
          <br />
          <input
            type="text"
            placeholder="Search for the city name..."
            htmlFor="cc-label"
            className="cc-input"
          />
        </div>
      </div>
      <div className="cc-form-content">
        <div className="cc-form-select">
          <label htmlFor="cc-label" className="cc-label">
            From
            <input
            type="month"
            htmlFor="cc-label"
            className="cc-input"
          />
          </label>
          <br />
        </div>
        <div className="cc-form-select">
          <label htmlFor="cc-label" className="cc-label">
            To
            <input
            type="month"
            htmlFor="cc-label"
            className="cc-input"
          />
          </label>
          <br />
        </div>
      </div>
    </div>
  );
};

export default CreateCandidate;
