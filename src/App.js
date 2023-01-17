import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

// ----------------------------------------------------------------------

export default function App() {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("globalUser"))
  useEffect(() => {
    // if(!auth && !auth.account) {
    //   navigate("/register")
    // }
    // else {
    if(!auth && !auth.account)
      navigate("/login")
    // }
  }, [navigate]);

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
      <ToastContainer limit={1} autoClose={1000} />
    </ThemeProvider>
  );
}
