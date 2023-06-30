import '../styles/globals.css';
import { CssBaseline, ThemeProvider, Typography } from '@mui/material';

import { lightTheme } from '../themes';


import { ShopLayout } from '../components/layouts';
import { initialData } from '../database/products';
import { ProductList } from '../components/products';


export const App = () => {
  return (
    <ThemeProvider theme={ lightTheme}>
        <CssBaseline />
        <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
        <Typography variant='h1' component='h1'>Tienda</Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography>

        <ProductList 
          products={ initialData.products as any }
      />
    

    </ShopLayout>


    </ThemeProvider>
  )
}

