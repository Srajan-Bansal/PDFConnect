import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ContextAPIProvider } from './context/ContextAPI.jsx';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ContextAPIProvider>
        <App />
      </ContextAPIProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
