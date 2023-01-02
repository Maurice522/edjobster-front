import React from 'react';
// import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, useField, ErrorMessage, useFormik, isInteger } from "formik";
import 'react-quill/dist/quill.snow.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Back from '../../../assets/images/back.svg';
import SelectArrow from '../../../assets/images/selectarrow.svg';
/* eslint-disable camelcase */


const ScheduleInterview = () => {
  const baseUrl= "http://127.0.0.1:8000";
  const navigate= useNavigate()

  
  const navigatecancel = () =>{
    navigate('/dashboard/interviews')
  }

  const validate = (values) => {
    const errors = {}
  
    // if (!values.email) {
    //   errors.email = 'Required'
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //   errors.email = 'Invalid email address'
    // }
    if (!values.name) {
      errors.name = 'Required'
    }
    
    if (!values.date) {
      errors.date = 'Required'
    }
    if (!values.time) {
      errors.time = 'Required'
    }
    if (!values.duration) {
      errors.duration = 'Required'
    }
    
    if (!values.location) {
      errors.location = 'Required'
    }
    if (!values.emai_template) {
      errors.emai_template = 'Required'
    }
    if (!values.job) {
      errors.job = 'Required'
    }
    if (!values.subject) {
      errors.subject = 'Required'
    }
    if (!values.body) {
      errors.body = 'Required'
    }
    if (!values.interviewer) {
      errors.interviewer = 'Required'
    }
    return errors
  }
  
  const formik = useFormik({
    initialValues: {
      name: "",
      date: "",
      time: "",
      duration: "",
      location: "",
      emai_template: "",
      job: "",
      subject: "",
      body: "",
      interviewer: "",
      // confirmpassword: "",
    },
    validate,
    onSubmit: async(values) => {
      // const navigate= useNavigate()
     
      const {name,
      date,
      time,
      duration,
      location,
      emai_template,
      job,
      subject,
      body,
      interviewer,
      } = values;
    
      const res = await fetch(`${baseUrl}/interview/schedule/`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name,
          date,
          time,
          duration,
          location,
          emai_template,
          job,
          subject,
          body,
          interviewer
        })
      });
  
      const data = await res.json();
      if(res.status === 422 || !data){
        window.alert("Failed Scheduling");
        console.log("Failed Scheduling");
      }else{
        window.alert("Interview Scheduled Successfully");
        console.log("Interview Scheduled Successfully");
        navigate("/dashboard/interviews");
      }


      
      alert(JSON.stringify(values, null, 2));
      console.log(values);
      // history.push("/dashboard/user/adduser/createpassword");
    //  navigate('/dashboard/user/adduser/createpassword')
      
    },
  });


  return (
    <div className="sched-inter common-width">
      <div className="tt">
        <div className="tt-back">
          <ArrowBackIosIcon onClick={navigatecancel} sx={{
                  cursor:"pointer"
                }}
          />
          <p className="tt-back-create">Schedule an Interview</p>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="sched-inter-content-main">
          <div className="sched-inter-content">
            <div className="sched-inter-content-left">
              <div className="rowstack">
                <label htmlFor="cc-label" className="cc-label sched-inter-location__label">Name*
                <input 
                type="text" 
                placeholder="Type interview name..." 
                className="cc-input sched-inter__input"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
                </label>
              </div>
              <div className="sched-inter-content-left-checkbox-main">
                <div className="sched-inter-content-left-checkbox-content">
                  <input 
                  type="checkbox" 
                  className="sched-inter-content-left-checkbox" />
                  <p className="cc-label">In person</p>
                </div>
                <div className="sched-inter-content-left-checkbox-content">
                  <input 
                  type="checkbox" 
                  className="sched-inter-content-left-checkbox" />
                  <p className="cc-label">Telephonic</p>
                </div>
                <div className="sched-inter-content-left-checkbox-content">
                  <input 
                  type="checkbox" 
                  className="sched-inter-content-left-checkbox" />
                  <p className="cc-label">Video</p>
                </div>
              </div>
              <div>
                <div className="rowstack sched-inter-left-input">
                  <label htmlFor="cc-label" className="cc-label sched-inter-location__label">Date*
                  <input 
                  type="date" 
                  placeholder="3 November 2021" 
                  className="cc-input sched-inter__input"
                  id="date"
                  name="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.date} 
                  />
                  {formik.touched.date && formik.errors.date ? <div>{formik.errors.last_name}</div> : null}
                  </label>
                </div>
                <div className="rowstack sched-inter-left-input">
                  <label htmlFor="cc-label" className="cc-label sched-inter-location__label">Time*
                  <input 
                  type="time" 
                  placeholder="10:00 AM"
                  id="time"
                  name="time" 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.time}
                  className="cc-input sched-inter__input" />
                  {formik.touched.time && formik.errors.time ? <div>{formik.errors.last_name}</div> : null}
                  </label>
                </div>
                <div className="rowstack sched-inter-left-input">
                  <label htmlFor="cc-label" className="cc-label sched-inter-location__label">Duration
                  <input 
                  type="text" 
                  placeholder="45 Minutes" 
                  id="duration"
                  name="duration"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.duration}
                  className="cc-input sched-inter__input" />
                  {formik.touched.duration && formik.errors.duration ? <div>{formik.errors.email}</div> : null}
                  </label>
                </div>
                <div className="rowstack cc-form-select sched-inter-location">
                  <label htmlFor="cc-label" className="cc-label sched-inter-location__label">Location
                  <br />
                  <select 
                  id="location"
                  name="location"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.location}
                  className="rowstack cc-input sched-inter__input">
                    <option>Select Locations</option>
                  </select>
                  {formik.touched.location && formik.errors.location ? <div>{formik.errors.email}</div> : null}

                  </label>
                </div>
                <div className="rowstack sched-inter-left-input">
                  <label htmlFor="cc-label" className="cc-label sched-inter-location__label">Interviewers
                  <input 
                  type="text" 
                  id="interviewer"
                  name="interviewer"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.interviewer}
                  placeholder="Search for team memebers..." className="cc-input sched-inter__input" />
                  {formik.touched.interviewer && formik.errors.interviewer ? <div>{formik.errors.email}</div> : null}
                  </label>
                </div>
              </div>
            </div>
            <p className="sched-inter-content-border"/>
            <div className="sched-inter-content-right">
              <div className="cc-form-select">
                <label htmlFor='cc-label' className="cc-label">Select Email Template
                <br />
                <select 
                id="email_template"
                name="email_template"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.emai_template}
                className="cc-input sched-inter__input">
                  <option>Enter mobile email...</option>
                {formik.touched.emai_template && formik.errors.emai_template ? <div>{formik.errors.email}</div> : null}
                </select>
                </label>
                <img src={SelectArrow} alt="" className="cc-form-select-icon" />
              </div>
              <div className="sched-inter-left-input">
                <label htmlFor="cc-label" className="cc-label sched-inter-location__label">Job
                <input 
                type="text" 
                placeholder="HOD - Civil"
                id="job"
                name="job" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.job}
                className="cc-input sched-inter__input" />
                {formik.touched.job && formik.errors.job ? <div>{formik.errors.email}</div> : null}
                </label>
              </div>
              <div className="sched-inter-left-input">
                <label htmlFor="cc-label" className="cc-label sched-inter-location__label">Subject:
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subject}
                  placeholder="Email Template subect will come here ..."
                  className="cc-input sched-inter__input"
                />
                {formik.touched.subject && formik.errors.subject ? <div>{formik.errors.email}</div> : null}
                </label>
              </div>
              <div className="sched-inter-react-quill">
                <label htmlFor='cc-label'className="cc-label">Email Body
                <ReactQuill theme="snow" />
                <input
                    type="text"
                    id="body"
                    name="body"
                    placeholder="Body ..."
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.body}
                  />
                  {formik.touched.subject && formik.errors.body ? <div>{formik.errors.body}</div> : null}
                </label>
              </div>
              <div className="sched-inter-left-input sched-inter-left-input-attach">
                <p className="cc-label sched-inter-location__label">Attachment:</p>
                <label htmlFor="cclF-label"  className="">
                  <input
                    type="file"
                    id="file"
                    name="file"
                    placeholder="Email Template subect will come here ..."
                    className="sched-inter-right-file-input"
                  />
                  <p className="sched-inter-right-file-text">Browse</p>
                </label>
              </div>
            </div>
          </div>
          <p className="sched-inter-content-bottom-border"/>
          <button type="submit"className="sched-inter-content-btn">Schedule</button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleInterview;
