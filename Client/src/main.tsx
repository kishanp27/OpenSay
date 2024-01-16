import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import axios from 'axios'
import AuthContextProvider from './contexts/AuthContext.tsx'

axios.defaults.baseURL = 'http://localhost:8080/api';
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthContextProvider >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthContextProvider>
  ,
)
