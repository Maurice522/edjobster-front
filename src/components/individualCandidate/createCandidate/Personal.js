import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {useGetCandidateListQuery,
       useGetCandidateDetailsQuery,
      useAddApplyJobMutation,
      useAddCandidateResumeMutation,
      useUpdateCandidateMutation,
      useDeleteCandidateMutation} from '../../../redux/services/candidate/CandidateServices'
import { authTokenAction, authAction } from '../../../redux/auth/AuthReducer';
import SelectArrow from "../../../assets/images/selectarrow.svg";

const CreateCandidate = () => {

  const navigate = useNavigate();
  const dispatch =useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [AddCandidate, AddCandidateInfo] = 


  return (
    <div>
      <p className="cc-pd">Personal Details</p>
      <div className="cc-form-content">
        <div>
          <label htmlFor="cc-label" className="cc-label">
            First Name*
            <input
            type="text"
            placeholder="Enter first name..."
            className="cc-input"
          />
          </label>
          <br />
          
        </div>
        <div>
          <label htmlFor="cc-label" className="cc-label">
            Last Name*
            <input
            type="text"
            placeholder="Enter last name..."
            className="cc-input"
          />
            </label>
          <br />
          
        </div>
      </div>
      <div className="cc-form-content">
        <div className="cc-form-select">
          <label htmlFor="cc-label" className="cc-label">
            Email*
            <input
            type="email"
            placeholder="Email ID"
            className="cc-input"
          />
          </label>
          <br />
        </div>
        <div>
          <label htmlFor="cc-label" className="cc-label">
            Mobile Number*
            <input
            type="number"
            placeholder="Enter mobile number..."
            className="cc-input"
          />
          </label>
          <br />
          
        </div>
      </div>
      <div className="cc-form-content">
        <div>
          <label htmlFor="cc-label" className="cc-label">
            Alternate Email
            <input
            type="email"
            placeholder="Enter mobile email..."
            className="cc-input"
          />
          </label>
          <br />
          
        </div>
        <div className="cc-form-select">
          <label htmlFor="cc-label" className="cc-label">
            Enter mobile number...
            <input
            type="number"
            placeholder="Enter mobile number..."
            className="cc-input"
          />
          </label>
          <br />
        </div>
      </div>
      <div className="cc-form-content">
        <div className="cc-form-select">
          <label htmlFor="cc-label" className="cc-label">
            Address
            <input
            type="text"
            placeholder="Enter Address..."
            className="cc-input"
          />
          </label>
          <br />
        </div>
        <div className="cc-form-select">
          <label htmlFor="cc-label" className="cc-label">
            Country
            <input
            type="text"
            placeholder="Enter Country..."
            className="cc-input"
          />
          </label>
          <br />
        </div>
      </div>
      <div className="cc-form-content">
        <div className="cc-form-select">
          <label htmlFor="cc-label" className="cc-label">
            State
            <select className="cc-input">
            <option>Select state...</option>
          </select>
          </label>
          <br />

        </div>
        <div className="cc-form-select">
          <label htmlFor="cc-label" className="cc-label">
            City
            <select className="cc-input cc-form-select-double">
            <option>City...</option>
          </select>
          </label>
          <br />

        </div>
        <div className="cc-form-select">
          <label htmlFor="cc-label" className="cc-label">
            Zip Code
            <select className="cc-input cc-form-select-double">
            <option>Zip Code</option>
          </select>
          </label>
          <br />

        </div>
      </div>
      <div className="cc-form-content">
        <div className="cc-form-select">
          <label htmlFor="cc-label" className="cc-label">
            Highest Degree
            <select className="cc-input cc-form-select-double">
            <option>Select Degree</option>
          </select>
          </label>
          <br />

        </div>
        <div className="cc-form-select">
          <label htmlFor="cc-label" className="cc-label">
            Total Experience
            <select className="cc-input cc-form-select-double">
            <option>Select</option>
          </select>
          </label>
          <br />
        </div>
      </div>
    </div>
  );
};

export default CreateCandidate;
