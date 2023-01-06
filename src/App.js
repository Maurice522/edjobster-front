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
  const auth = useSelector((state) => {
    console.log(state);
    return state.login.auth
  });
  useEffect(() => {
    // if (!auth && !(window.location.pathname === '/client') && !(window.location.pathname === '/client/404') && !(window.location.pathname === '/client/a*')) {
    if (!auth) {
      navigate('/register');
    }
  }, [auth, navigate]);

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
      <ToastContainer limit={1} autoClose={1000} />
    </ThemeProvider>
  );
}
