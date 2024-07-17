import React from 'react';
import { metaLogin } from '../services/meta';

const MetaLogin = () => {
  const { REACT_APP_FB_SCOPES } = process.env

  const handleLogin = () => {
    metaLogin(REACT_APP_FB_SCOPES, response => {
      // Save token information safely somewhere
      // . . . (TO DO)

      console.log(response)
    })
  };

  return (
    <div>
      <h1>Meta Login Component</h1>
      <button onClick={handleLogin}>Login on Meta</button>
    </div>
  );
};

export default MetaLogin;