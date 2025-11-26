// import { BrowserRouter } from 'react-router-dom'
import {  HashRouter  } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
// import './index.css'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from './themes';
import { AuthProvider, UiProvider, CartProvider, ReceiptProvider } from './../context';


import { AppRouter } from './router/AppRouter'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    // <BrowserRouter>
    <HashRouter>
    <AuthProvider>
    <CartProvider>
    <ReceiptProvider>
    <UiProvider>
    <ThemeProvider theme={ lightTheme}>
        <CssBaseline />

    <AppRouter />
    </ThemeProvider>
    </UiProvider>
    </ReceiptProvider>
    </CartProvider>
    </AuthProvider>
    </HashRouter>

    // </BrowserRouter>
  // </React.StrictMode>,
)
