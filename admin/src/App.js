import { myStore } from './store/store';

import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Loading from './components/Loading/loading';
import AuthPage from './components/AuthPage/authPage';

import StartPage from './components/StartPage/startPage';

const apiUrl = process.env.REACT_APP_API_URL;

function App() {
  const setLoading = myStore(state => state.setLoading);
  useEffect(() => {
    checkToken();
  }, []);

  async function checkToken() {
    if (window.location.pathname === '/login') return;
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}checkToken`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.status === 401) {
        window.location.href = '/login';
        return;
      }
      setLoading(false);
    }
    catch (error) {
      setLoading(false);
      toast.error('An error occurred while checking token');
    }

  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/" element={<StartPage />} />
        </Routes>
      </Router>
      <Loading />
      <ToastContainer />
    </div >
  );
}

export default App;
