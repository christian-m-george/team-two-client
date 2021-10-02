import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from './Context/UserContext';

const user = {};

ReactDOM.render(
  
  <React.StrictMode>
    <UserContext.Provider value={user}>
    <BrowserRouter>
      <App />
      </BrowserRouter>
      </UserContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);