import { myStore } from './store/store';
import './App.css';
import AuthForm from '../src/components/AuthForm/authForm';
import Loading from './components/Loading/loading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <div className="App">
      <AuthForm />

      <Loading />
      <ToastContainer />
    </div >
  );
}

export default App;
