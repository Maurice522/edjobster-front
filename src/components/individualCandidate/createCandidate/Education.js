import React from "react";
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
            From Month
            <input
            type="text"
            htmlFor="cc-label"
            className="cc-input"
          />
          </label>
          <br />
          <select className="cc-input cc-form-select-double">
            <option>Month</option>
          </select>
          <img src={SelectArrow} alt="" className="cc-form-select-icon" />
        </div>
        <div className="cc-form-select">
          <label htmlFor="cc-label" className="cc-label">
            From Year
            <input
            type="text"
            htmlFor="cc-label"
            className="cc-input"
          />
          </label>
          <br />
          <select className="cc-input cc-form-select-double">
            <option>Year</option>
          </select>
          <img src={SelectArrow} alt="" className="cc-form-select-icon" />
        </div>
        <div className="cc-form-select">
          <label htmlFor="cc-label" className="cc-label">
            To Month
            <input
            type="text"
            htmlFor="cc-label"
            className="cc-input"
          />
          </label>
          <input htmlFor="cc-label" type="date" id="date" />
          <br />
          <select className="cc-input cc-form-select-double">
            <option>Month</option>
          </select>
          <img src={SelectArrow} alt="" className="cc-form-select-icon" />
        </div>
        <div className="cc-form-select">
          <label htmlFor="cc-label" className="cc-label">
            To Year
            <input
            type="text"
            htmlFor="cc-label"
            className="cc-input"
          />
          </label>
          <br />
          <select className="cc-input cc-form-select-double">
            <option>Year</option>
          </select>
          <img src={SelectArrow} alt="" className="cc-form-select-icon" />
        </div>
      </div>
    </div>
  );
};

export default CreateCandidate;
