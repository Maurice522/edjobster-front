import React from "react";
import { NavLink } from "react-router-dom";
import Notification from "../../assets/images/notification.svg";
import User from "../../assets/images/user.svg";
import Search from "../../assets/images/search.svg";

const Header = () => {
  return (
    <div className="header">
      <div className="common-width">
        <div className="header-content">
          <div className="header-logo-job">
            <NavLink to="/" className="header-logo">
              Logo
            </NavLink>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "header-job-active" : "header-job"
              }
            >
              Jobs
            </NavLink>
          </div>
          <div className="header-menu-list">
            <NavLink
              to="/candidates"
              className={({ isActive }) =>
                isActive ? "header-job-active" : "header-menu"
              }
            >
              Candidates
            </NavLink>
            <NavLink
              to="/scheduleinterview"
              className={({ isActive }) =>
                isActive ? "header-job-active" : "header-menu"
              }
            >
              Interviews
            </NavLink>
            <NavLink to="/" className="header-menu">
              Assessments
            </NavLink>
            <NavLink
              to="/sendmail"
              className={({ isActive }) =>
                isActive ? "header-job-active" : "header-menu"
              }
            >
              Settings
            </NavLink>
          </div>
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
          <div className="header-user">
            <img src={User} alt="" />
            <div>
              <p className="header-name">Austin Robertson</p>
              <p className="header-role">Marketing Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
