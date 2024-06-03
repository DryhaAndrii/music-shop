import { myStore } from './store/store';
import './App.css';
import AuthForm from '../src/components/AuthForm/authForm';
import Loading from './components/Loading/loading';
import { createPortal } from 'react-dom';


function App() {
  const loading = myStore(state => state.loading);
  const setLoading = myStore(state => state.setLoading);
  function handleButton() {
    setLoading(!loading);
    setTimeout(() => {
      setLoading(false);
    }, 200000);
  }

  return (
    <div className="App">
      <AuthForm />

      { }

      {loading === true ? createPortal(
        <Loading />,
        document.body
      ) : null}
      <button onClick={handleButton}>KEK</button>
    </div>
  );
}

export default App;
