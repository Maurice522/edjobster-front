import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Login from './pages/Login';
import Register from './pages/Register';
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
  const auth = JSON.parse(localStorage.getItem("globalUser") || sessionStorage.getItem("globalUser"))
  console.log(auth)
  useEffect(() => {
    // if(!auth && !auth.access) {
    if (!auth) {
      <Routes>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Routes>
    }
    // else {
    //   navigate("/dashboard/app")
    // }
    //  navigate("/login") 
  }, [navigate]);
  console.log("this is the auth: ", auth)

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
      <ToastContainer limit={1} autoClose={1000} />
    </ThemeProvider>
  );
}
