import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  ListItemIcon,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogContent,
  Box,
} from '@mui/material';
import BtnArrow from '../../../assets/images/btnarrow.svg';


const ContentTop = ({ modalHandler }) => {
  const [menu, setMenu] = useState({
    toggle: false,
    menuName: 'Hiring Stage',
  });
  const [jobmenu, setJobMenu] = useState({
    toggle: false,
    menuName: 'Job',
  });

  const menuToggle = (value) => {
    setMenu({
      toggle: !menu.toggle,
      menuName: value,
    });
  };

  return (
    <div className="common-width">
      <p className="content-top-border" />
      <div className="ct-content">
        <div className="ct-content ct-content__left">
          <div>
            <p className="ct-content-title">Hiring Status</p>
            <p className="ct-content-des">Shortlisted</p>
          </div>
          <div>
            <p className="ct-content-title">Resume</p>
            <p className="ct-content-des">View</p>
          </div>
        </div>
        <div className="ct-content ct-content__right">
          <Button
            sx={{ height: "57px" }}
            variant="contained"
            component={Link}
            to="/dashboard/candidates/scheduleinterview"
          >
            Schedule Interview
          </Button>
          <Button
            sx={{ height: "57px",width:"150px" }}
            variant="contained"
            onClick={() => modalHandler(true)}
          >
            Assign Job
          </Button>
          <div className="ct-content-hs-reletive">
            <button className="ct-content-hs" onClick={() => menuToggle(menu.menuName)}>
              <p className="ct-content-btn ct-content-btn__hs">{menu.menuName}</p>
              <img src={BtnArrow} alt="" className="ct-content-btn-icon" />
            </button>
            {menu.toggle && (
              <ul className="ct-content-hs-items">
                <buttton className="ct-content-hs-list" onClick={() => menuToggle('Hiring Stage')}>
                  Hiring Stage
                </buttton>
                <button className="ct-content-hs-list" onClick={() => menuToggle('Applied')}>
                  Applied
                </button>
                <button className="ct-content-hs-list" onClick={() => menuToggle('Shortlisted')}>
                  Shortlisted
                </button>
                <button className="ct-content-hs-list" onClick={() => menuToggle('In Review')}>
                  In Review
                </button>
                <button className="ct-content-hs-list" onClick={() => menuToggle('  HR Interview')}>
                  HR Interview
                </button>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentTop;
