import { Container } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Back from '../../../assets/images/back.svg';
import Bar from '../../../assets/images/bar.svg';


const TitleTop = () => {
  const [menu, setMenu] = useState(false);

  const menuToggle = () => {
    setMenu(!menu);
  };

  return (
    <div className="tt common-width">
      <div className="tt-back">
        <Link to="/dashboard/candidates">
          <img src={Back} alt="" />
        </Link>
        <p className="tt-back-create">Abhineet Sabharwal</p>
        <p className="tt-back-info">M. Tech. (Structure)</p>
        <p className="tt-back-info">+91-9930705653</p>
      </div>
      <Container className="tt-dot-bar" onClick={menuToggle}>
        {/* <img src={Bar} alt="" className="tt-bar"  />
        {menu && (
          <ul className="ct-content-hs-items">
            <li className="ct-content-hs-list">Edit Candidate</li>
            <Link to="/dashboard/candidates/sendmail">
              <li className="ct-content-hs-list"> Send Email</li>
            </Link>
            <li className="ct-content-hs-list">View Past Appliations</li>
            <li className="ct-content-hs-list">Delete Candidate</li>
          </ul>
        )} */}
        Dessignation
      </Container>
    </div>
  );
};

export default TitleTop;
