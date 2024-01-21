import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import BasicProvider from './providers/BasicProvider.tsx'
import StatisticProvider from './providers/PlayingProvider.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BasicProvider>
      <StatisticProvider>
    <App />
    </StatisticProvider>
    </BasicProvider>
  </React.StrictMode>,
)
