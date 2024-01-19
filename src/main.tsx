import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import BasicProvider from './providers/BasicProvider.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BasicProvider>
    <App />
    </BasicProvider>
  </React.StrictMode>,
)
