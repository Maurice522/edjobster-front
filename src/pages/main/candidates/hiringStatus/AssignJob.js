import React from "react";

const AssignJob = () => {
  return (
    <div className="assjob-container">
      <p className="assjob-title">Assign a candidate to a job</p>
      <div className="assjob-input-container">
        {/* <label className="assjob-input-container-label">Search for Job</label> */}
        <input
          type="text"
          placeholder="Type job title ..."
          className="assjob-input-container-label-input"
        />
      </div>
      <div className="assjob-input-container">
        {/* <label className="assjob-input-container-label">Hiring Stage</label> */}
        <input
          type="text"
          placeholder="Choose the hiring stage"
          className="assjob-input-container-label-input"
        />
      </div>
      <div className="assjob-input-container">
        {/* <label className="assjob-input-container-label">Notes</label> */}
        <input type="text" className="assjob-input-container-label-input" />
      </div>
      <p className="assjob-submit-btn">Add</p>
    </div>
  );
};

export default AssignJob;
