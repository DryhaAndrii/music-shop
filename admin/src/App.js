
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import AuthPage from './pages/authPage/authPage';
import AddCategoryPage from './pages/addCategoryPage/addCategoryPage';
import StartPage from './pages/startPage/startPage';
import Header from './components/header/header';
import CategoryInfoPage from './pages/categoryInfoPage/categoryInfoPage';
import AddProductPage from './pages/addProductPage/addProductPage';
import EditCategoryPage from './pages/editCategoryPage/editCategoryPage';
import Loading, { useLoading } from './components/Loading/loading';
import EditProductPage from './pages/editProductPage/editProductPage';

const apiUrl = process.env.REACT_APP_API_URL;

function App() {
  const { hideLoading, showLoading, isShow } = useLoading();
  useEffect(() => {
    checkToken();
  }, []);
  async function checkToken() {
    try {
      showLoading();
      const response = await fetch(`${apiUrl}checkToken`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.status === 401) {
        if (window.location.pathname === '/login') {//if we do not have valid token and we are on login page we stay here to log in
          hideLoading();
          return
        }
        window.location.href = '/login'; //if we do not have valid token and we are not on login page we redirect to login page
        return;
      }
      hideLoading();
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
      <Loading isShow={isShow} />
      <ToastContainer />
      <Header />
      <Router>
        <Routes>
          <Route path="/addCategory/:parentCategoryId" element={<AddCategoryPage />} />
          <Route path="/addCategory" element={<AddCategoryPage />} />
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/categoryInfo/:categoryId" element={<CategoryInfoPage />} />
          <Route path="/addProduct/:categoryId" element={<AddProductPage />} />
          <Route path="/editCategory/:categoryId" element={<EditCategoryPage />} />
          <Route path="/editProduct/:productId" element={<EditProductPage />} />
        </Routes>
      </Router>
    </div >
  );
}
export default App;
