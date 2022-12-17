import React from "react";
import ExpendArrow from "../../../../assets/images/expendarrow.svg";


const CandidateProfileLeft = () => {
  return (
    <div className="can-pro-left">
      <div className="can-pro-left-content">
        <p className="can-pro-left-title">Candidate Profile</p>
        <div className="can-pro-left-item">
          <p className="can-pro-left-item-title">Headline</p>
          <p className="can-pro-left-item-des">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper
            ut vitae vitae, cursus euismod volutpat.
          </p>
        </div>
        <div className="can-pro-left-item">
          <p className="can-pro-left-item-title">Summary</p>
          <p className="can-pro-left-item-des">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper
            ut vitae vitae, cursus euismod volutpat. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Ullamcorper ut vitae vitae, cursus
            euismod volutpat.
          </p>
        </div>
        <div className="can-pro-left-item">
          <p className="can-pro-left-item-title">Total Experience </p>
          <p className="can-pro-left-item-des">12 Years</p>
        </div>
        <div className="can-pro-left-item">
          <p className="can-pro-left-item-title">Skills</p>
          <p className="can-pro-left-item-des">
            Teaching, Team Management, Change Management, Operations,
            Construction Management, Project Management
          </p>
        </div>
      </div>
      <div className="can-pro-left-content">
        <p className="can-pro-left-title">Work Experience</p>
        <div className="can-pro-left-item can-pro-left-item__work">
          <p className="can-pro-left-work-title">May 2019 - Present</p>
          <div className="can-pro-left-work-des-item">
            <p className="can-pro-left-work-des">
              Assistant Professor at Lovely Professional University
            </p>
            <img src={ExpendArrow} alt="" />
          </div>
        </div>
        <div className="can-pro-left-item can-pro-left-item__work">
          <p className="can-pro-left-work-title">Jun 2016 - Apr 2019</p>
          <div className="can-pro-left-work-des-item">
            <p className="can-pro-left-work-des">
              Assistant Professor at Amity Univeristy
            </p>
            <img src={ExpendArrow} alt="" />
          </div>
        </div>
        <div className="can-pro-left-item can-pro-left-item__work">
          <p className="can-pro-left-work-title">Dec 2009 - Apr 2016</p>
          <div className="can-pro-left-work-des-item">
            <p className="can-pro-left-work-des">
              Assistant Professor at Pune University
            </p>
            <img src={ExpendArrow} alt="" />
          </div>
        </div>
      </div>
      <div className="can-pro-left-content">
        <p className="can-pro-left-title">Work Experience</p>
        <div className="can-pro-left-item can-pro-left-item__work">
          <p className="can-pro-left-work-title">May 2019 - Present</p>
          <div className="can-pro-left-work-des-item">
            <p className="can-pro-left-work-des">
              M Tech (Structure) from Mumbai University
            </p>
            <img src={ExpendArrow} alt="" />
          </div>
        </div>
        <div className="can-pro-left-item can-pro-left-item__work">
          <p className="can-pro-left-work-title">Jun 2016 - Apr 2019</p>
          <div className="can-pro-left-work-des-item">
            <p className="can-pro-left-work-des">
              Assistant Professor at Amity Univeristy
            </p>
            <img src={ExpendArrow} alt="" />
          </div>
        </div>
        <div className="can-pro-left-item can-pro-left-item__work">
          <p className="can-pro-left-work-title">Dec 2009 - Apr 2016</p>
          <div className="can-pro-left-work-des-item">
            <p className="can-pro-left-work-des">
              BE Civil from Mumbai University
            </p>
            <img src={ExpendArrow} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfileLeft;
