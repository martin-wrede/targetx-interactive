import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import { ContextProvider } from './Context'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ContextProvider>
    <BrowserRouter  basename="/targetx-interactive" >
    <App />
    </BrowserRouter >
  </ContextProvider>
    ,
)
