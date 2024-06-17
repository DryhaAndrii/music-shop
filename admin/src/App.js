import { myStore } from './store/store';

import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Loading from './components/Loading/loading';
import AuthPage from './components/AuthPage/authPage';
import AddCategoryPage from './components/addCategoryPage/addCategoryPage';
import StartPage from './components/StartPage/startPage';
import Header from './components/header/header';

const apiUrl = process.env.REACT_APP_API_URL;

function App() {
  const setLoading = myStore(state => state.setLoading);
  useEffect(() => {
    checkToken();
    
  });

  async function checkToken() {

    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}checkToken`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.status === 401) {
        if (window.location.pathname === '/login') {//if we do not have valid token and we are on login page we stay here to log in
          setLoading(false);
          return
        }
        window.location.href = '/login'; //if we do not have valid token and we are not on login page we redirect to login page
        return;
      }
      setLoading(false);
      if (window.location.pathname === '/login') { //if we have valid token and we are on login page we redirect to start page
        window.location.href = '/';
      };

    }
    catch (error) {
      toast.error('An error occurred while checking token, maybe server is not working so you can do nothing now');
    }

  }

  return (
    <div className="App">
      <Loading />
      <ToastContainer />
      <Header />
      <Router>
        <Routes>
          <Route path="/addCategory" element={<AddCategoryPage />} />
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<AuthPage />} />

        </Routes>
      </Router>
      
    </div >
  );
}

export default App;
