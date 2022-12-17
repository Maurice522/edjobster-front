import React from 'react';
import { Link } from 'react-router-dom';
import Back from '../../../assets/images/back.svg';


const TitleTop = () => {
  return (
    <div className="tt common-width">
      <div className="tt-back">
        <Link to="/dashboard/candidates">
          <img src={Back} alt="" />
        </Link>
        <p className="tt-back-create">Create a candidate</p>
      </div>
      <div>
        <p className="tt-create">Create</p>
      </div>
    </div>
  );
};

export default TitleTop;
