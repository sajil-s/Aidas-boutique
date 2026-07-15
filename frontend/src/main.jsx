import { StrictMode } from 'react'
import ReactDOM  from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import './index.css'
import App from './App.jsx';

import {AuthProvider} from "./context/AuthContext.jsx";
import { CartProvider } from './context/CartContext.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
  <CartProvider>
    <App />
    <Toaster />
  </CartProvider>
</AuthProvider>
    
    </BrowserRouter>
  </StrictMode>,
)
