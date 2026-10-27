import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/global.css';
import './styles/reset.css';

// React 17: ReactDOM.render (não createRoot)
// TODO: migrar para React 18 createRoot
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
