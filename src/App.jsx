import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import authService from "./services/authService"; // ✅ your own backend service
import { login, logout } from "./store/authSlice";
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authService.getCurrentUser(token)
        .then((userData) => {
          if (userData) {
            dispatch(login({ userData }));
          } else {
            dispatch(logout());
          }
        })
        .catch(() => dispatch(logout()))
        .finally(() => setLoading(false));
    } else {
      dispatch(logout());
      setLoading(false);
    }
  }, [dispatch]);

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
