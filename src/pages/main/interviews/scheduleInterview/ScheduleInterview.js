import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Back from "../../../../assets/images/back.svg";
import SelectArrow from "../../../../assets/images/selectarrow.svg";

const ScheduleInterview = () => {
  return (
    <div className="sched-inter common-width">
      <div className="tt">
        <div className="tt-back">
          <img src={Back} alt="" />
          <p className="tt-back-create">Schedule an Interview</p>
        </div>
      </div>
      <div className="sched-inter-content-main">
        <div className="sched-inter-content">
          <div className="sched-inter-content-left">
            <div className="sched-inter-left-input">
              <label className="cc-label sched-inter-location__label">
                Name*
              </label>
              <input
                type="text"
                placeholder="Type interview name..."
                className="cc-input sched-inter__input"
              />
            </div>
            <div className="sched-inter-content-left-checkbox-main">
              <div className="sched-inter-content-left-checkbox-content">
                <input
                  type="checkbox"
                  className="sched-inter-content-left-checkbox"
                />
                <p className="cc-label">In person</p>
              </div>
              <div className="sched-inter-content-left-checkbox-content">
                <input
                  type="checkbox"
                  className="sched-inter-content-left-checkbox"
                />
                <p className="cc-label">Telephonic</p>
              </div>
              <div className="sched-inter-content-left-checkbox-content">
                <input
                  type="checkbox"
                  className="sched-inter-content-left-checkbox"
                />
                <p className="cc-label">Video</p>
              </div>
            </div>
            <div>
              <div className="sched-inter-left-input">
                <label className="cc-label sched-inter-location__label">
                  Date*
                </label>
                <input
                  type="text"
                  placeholder="3 November 2021"
                  className="cc-input sched-inter__input"
                />
              </div>
              <div className="sched-inter-left-input">
                <label className="cc-label sched-inter-location__label">
                  Time*
                </label>
                <input
                  type="text"
                  placeholder="10:00 AM"
                  className="cc-input sched-inter__input"
                />
              </div>
              <div className="sched-inter-left-input">
                <label className="cc-label sched-inter-location__label">
                  Duration
                </label>
                <input
                  type="text"
                  placeholder="45 Minutes"
                  className="cc-input sched-inter__input"
                />
              </div>
              <div className="cc-form-select sched-inter-location">
                <label className="cc-label sched-inter-location__label">
                  Location
                </label>
                <br />
                <select className="cc-input sched-inter__input">
                  <option>Select Locations</option>
                </select>
                <img
                  src={SelectArrow}
                  alt=""
                  className="cc-form-select-icon sched-inter-select-icon"
                />
              </div>
              <div className="sched-inter-left-input">
                <label className="cc-label sched-inter-location__label">
                  Interviewers
                </label>
                <input
                  type="text"
                  placeholder="Search for team memebers..."
                  className="cc-input sched-inter__input"
                />
              </div>
            </div>
          </div>
          <p className="sched-inter-content-border"></p>
          <div className="sched-inter-content-right">
            <div className="cc-form-select">
              <label className="cc-label">Select Email Template</label>
              <br />
              <select className="cc-input sched-inter__input">
                <option>Enter mobile email...</option>
              </select>
              <img src={SelectArrow} alt="" className="cc-form-select-icon" />
            </div>
            <div className="sched-inter-left-input">
              <label className="cc-label sched-inter-location__label">
                Job
              </label>
              <input
                type="text"
                placeholder="HOD - Civil"
                className="cc-input sched-inter__input"
              />
            </div>
            <div className="sched-inter-left-input">
              <label className="cc-label sched-inter-location__label">
                Subject:
              </label>
              <input
                type="text"
                placeholder="Email Template subect will come here ..."
                className="cc-input sched-inter__input"
              />
            </div>
            <div className="sched-inter-react-quill">
              <label className="cc-label">Email Body</label>
              <ReactQuill theme="snow" />
            </div>
            <div className="sched-inter-left-input sched-inter-left-input-attach">
              <p className="cc-label sched-inter-location__label">
                Attachment:
              </p>
              <label className="">
                <input
                  type="file"
                  placeholder="Email Template subect will come here ..."
                  className="sched-inter-right-file-input"
                />
                <p className="sched-inter-right-file-text">Browse</p>
              </label>
            </div>
          </div>
        </div>
        <p className="sched-inter-content-bottom-border"></p>
        <p className="sched-inter-content-btn">Schedule</p>
      </div>
    </div>
  );
};

export default ScheduleInterview;
