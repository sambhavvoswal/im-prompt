import React from 'react'
import ReactDOM from 'react-dom/client'
import ReactGA from 'react-ga4/src/index.js'
import App from './App.jsx'
import './index.css'

ReactGA.initialize('G-6GQDFYDV5F')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
