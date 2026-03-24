import '../styles/globals.css';

import { ShopLayoutBla } from '../components/layouts';
// import { ProductList } from '../components/products';

localStorage.removeItem('modulo');


export const Blanco = () => {



  return (
    <ShopLayoutBla title={'Teslo-Shop - Home'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
    {/* <Typography variant='h1' component='h1'>Tienda</Typography>
    <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography> */}



    </ShopLayoutBla>
)
}
