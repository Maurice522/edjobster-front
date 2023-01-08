import React from "react";
import { NavLink } from "react-router-dom";
import AccountPopover from "../../layouts/dashboard/AccountPopover";
import Notification from "../../assets/images/notification.svg";
import User from "../../assets/images/user.svg";
import Search from "../../assets/images/search.svg";

const Header = () => {
  const userData = JSON.parse(localStorage.getItem("globalUser")).account
  console.log(userData)
  return (
    <div className="header">
      <div className="common-width">
        <div className="header-content">
          <div className="header-logo-job">
            <NavLink to="/" className="header-logo">
              Logo
            </NavLink>
            <NavLink
              to="/dashboard/jobs"
              className={({ isActive }) =>
                isActive ? "header-job-active" : "header-job"
              }
            >
              Jobs
            </NavLink>
          </div>
          <div className="header-menu-list">
            <NavLink
              to="/dashboard/candidates"
              className={({ isActive }) =>
                isActive ? "header-job-active" : "header-menu"
              }
            >
              Candidates
            </NavLink>
            <NavLink
              to="/dashboard/interviews"
              className={({ isActive }) =>
                isActive ? "header-job-active" : "header-menu"
              }
            >
              Interviews
            </NavLink>
            <NavLink to="/dashboard/assessments" 
          className="header-menu">
              Assessments
            </NavLink>
            <NavLink
              to="/dashboard/InstituteSettings"
              className={({ isActive }) =>
                isActive ? "header-job-active" : "header-menu"
              }
            >
              Settings
            </NavLink>
            {/* <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "header-job-active" : "header-menu"
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? "header-job-active" : "header-menu"
              }
            >
              Register
            </NavLink> */}
          </div>
          <div className="Header-lower-bar">
            <div className="header-search">
              <img src={Search} alt="" className="header-search-icon" />
              <input
                type="text"
                className="header-search-input"
                placeholder="Search…"
              />
            </div>
          
            <div>
              <img src={Notification} alt="" />
            </div>
            <AccountPopover />
            <div className="header-user">
              <div>
                <p className="header-name">{(userData.first_name || "Test")+(` ${userData.last_name}` || " ")}</p>
                <p className="header-role">{(userData.designation || "Admin")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Header;
