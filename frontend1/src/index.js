import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
        domain="dev-ss6k1xj5sqpfz1ix.us.auth0.com"
        clientId="nA1qyRiIYS4zSe8yq5iP6kmy5wbRW3a0"
        authorizationParams={{
        redirect_uri: window.location.origin
        }}
        cacheLocation="localstorage"  >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
