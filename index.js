import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
// import App from './App'; // Commented out or removed to eliminate warnings
import ConnectFour from './components/ConnectFour'; // Import ConnectFour component
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Change from rendering <App /> to <ConnectFour /> */}
    <ConnectFour />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
