import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import IconButton from '@mui/material/IconButton';
import AccountPopover from "../../layouts/dashboard/AccountPopover";
import Notification from "../../assets/images/notification.svg";
import User from "../../assets/images/user.svg";
import Search from "../../assets/images/search.svg";

const Header = () => {
  const navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem("globalUser"))?.account
  console.log(userData)
  return (
    <div className="header">
      <div className="common-width">
        <div className="header-content">
          <div className="header-logo-job">
            <NavLink sx={{ textDecoration: "none" }} to="/dashboard/app" className="header-logo">
              <img src='../../assets/images/test-image.svg' alt="logo" />
            </NavLink >
            <NavLink sx={{ textDecoration: "none" }}
              to="/dashboard/jobs"
              className={({ isActive }) =>
                isActive ? "header-job-active" : "header-job"
              }
             >
              Jobs
            </NavLink >
          </div>
          <div className="header-menu-list">
            <NavLink sx={{ textDecoration: "none" }}
              to="/dashboard/candidates"
              className={({ isActive }) =>
                isActive ? "header-job-active" : "header-menu"
              }
             >
              Candidate
            </NavLink >
            <NavLink sx={{ textDecoration: "none" }}
              to="/dashboard/interviews"
              className={({ isActive }) =>
                isActive ? "header-job-active" : "header-menu"
              }
             >
              Interviews
            </NavLink >
            <NavLink sx={{ textDecoration: "none" }} to="/dashboard/assessments"
              className="header-menu">
              Assessments
            </NavLink >
            <NavLink sx={{ textDecoration: "none" }}
              to="/dashboard/InstituteSettings/settings"
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
                <p className="header-name">{(userData?.first_name || "Test") + (` ${userData?.last_name}` || " ")}</p>
                <p className="header-role">{(userData?.designation || "Admin")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Header;
