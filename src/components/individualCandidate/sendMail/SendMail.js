import React from "react";
import { Link } from 'react-router-dom';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Back from "../../../assets/images/back.svg";
import SelectArrow from "../../../assets/images/selectarrow.svg";


const SendMail = () => {
  return (
    <div className="send-mail common-width">
      <div className="tt">
        <div className="tt-back">
         <Link to="/dashboard/candidates/candidate"> <img src={Back} alt="" /></Link>
          <p className="tt-back-create">Send Email</p>
        </div>
      </div>
      <div className="sched-inter-content-main">
        <div className="sched-inter-content-right">
          <div className="cc-form-select">
            <label htmlFor="cc-label" className="cc-label">Select Email Template
            <br />
            <select className="cc-input sched-inter__input">
              <option>Interview meeting</option>
            </select>
            </label>
            <img src={SelectArrow} alt="" className="cc-form-select-icon" />
          </div>
          <div className="sched-inter-left-input">
            <label htmlFor="cc-label" className="cc-label sched-inter-location__label">
              From:
            <input
              type="text"
              placeholder="zubair.khan@gmail.com"
              className="cc-input sched-inter__input"
            />
            </label>
          </div>
          <div className="sched-inter-left-input">
            <label htmlFor="cc-label"className="cc-label sched-inter-location__label">To:
            <input
              type="text"
              placeholder="abhineet.sabharwal@gmail.com"
              className="cc-input sched-inter__input"
            />
            </label>
          </div>
          <div className="sched-inter-left-input">
            <label htmlFor="cc-label"className="cc-label sched-inter-location__label">
              Subject:
            <input
              type="text"
              placeholder="Type your subject here..."
              className="cc-input sched-inter__input"
            />
            </label>
          </div>
          <div className="sched-inter-react-quill">
            <label htmlFor="cc-label" className="cc-label">Email Body
            <ReactQuill theme="snow" />
            <input
              type="text"
              placeholder="Body..."
              className="cc-input sched-inter__input"
            />
            </label>
          </div>
          <div className="sched-inter-left-input sched-inter-left-input-attach">
            <p className="cc-label sched-inter-location__label">Attachment:</p>
            <label htmlFor="cc-label"className="">
              <input
                type="file"
                placeholder="Email Template subect will come here ..."
                className="sched-inter-right-file-input"
              />
              <p className="sched-inter-right-file-text">Browse</p>
            </label>
          </div>
          <p className="sched-inter-content-btn sched-inter-content-btn__send">Send</p>
        </div>
      </div>
    </div>
  );
};

export default SendMail;
