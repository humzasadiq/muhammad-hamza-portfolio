import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import oneko from './services/neko.jsx'; // Correctly import the module

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

oneko(); // Initialize the neko script
