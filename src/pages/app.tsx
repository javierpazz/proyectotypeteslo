import '../styles/globals.css';
import { CssBaseline, ThemeProvider } from '@mui/material';


import { lightTheme } from '../themes';
import { Stutz } from './Stutz';
import { AuthProvider, UiProvider } from '../../context/';
import { CartProvider } from '../../context/cart/CartProvider';


export const App = () => {



  return (
    <AuthProvider>
    <CartProvider>
    <UiProvider>
    <ThemeProvider theme={ lightTheme}>
        <CssBaseline />
        <Stutz/>
    </ThemeProvider>
    </UiProvider>
      </CartProvider>
    </AuthProvider>
  )
}

