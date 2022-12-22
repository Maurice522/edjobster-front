import React from "react";

const AssignJob = () => {
  return (
    <div className="assjob-container">
      <p className="assjob-title">Assign a candidate to a job</p>
      <div className="assjob-input-container">
        <label htmlFor="text"className="assjob-input-container-label">
          Search for Job
          <input
          type="text"
          placeholder="Type job title ..."
          className="assjob-input-container-label-input"
        />
        </label>
        
      </div>
      <div className="assjob-input-container">
        <label htmlFor="text"className="assjob-input-container-label">
          Hiring Stage
        <input
          type="text"
          placeholder="Choose the hiring stage"
          className="assjob-input-container-label-input"
        />
        </label>
      </div>
      <div className="assjob-input-container">
        <label htmlFor="text"className="assjob-input-container-label">
          Notes
        <input type="text" className="assjob-input-container-label-input" />
        </label>
      </div>
      <p className="assjob-submit-btn">Add</p>
    </div>
  );
};

export default AssignJob;
