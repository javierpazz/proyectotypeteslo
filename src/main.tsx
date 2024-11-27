import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
// import './index.css'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from './themes';
import { AuthProvider, UiProvider, CartProvider } from './../context';


import { AppRouter } from './router/AppRouter'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <CartProvider>
    <UiProvider>
    <ThemeProvider theme={ lightTheme}>
        <CssBaseline />

    <AppRouter />
    </ThemeProvider>
    </UiProvider>
      </CartProvider>
    </AuthProvider>

    </BrowserRouter>
  // </React.StrictMode>,
)
