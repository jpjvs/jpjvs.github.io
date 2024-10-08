import logo from './logo.svg';
import MetaLogin from './components/MetaLogin';
import './App.css';
import { useEffect } from 'react';
import { initFBSDK } from './services/meta';

function App() {
  const { REACT_APP_FB_APP_ID } = process.env

  useEffect(() => {
    initFBSDK(REACT_APP_FB_APP_ID)
  }, [REACT_APP_FB_APP_ID])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Social Login Hub
        </p>
        <MetaLogin />
      </header>
    </div>
  );
}

export default App;
