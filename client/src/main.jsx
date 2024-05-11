import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ContextAPIProvider } from './context/ContextAPI.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextAPIProvider>
      <App />
    </ContextAPIProvider>
  </React.StrictMode>,
)
