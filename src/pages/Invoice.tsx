import { useState, useEffect } from 'react';
import '../styles/globals.css';

import { ShopLayoutInv } from '../components/layouts';
import { FullScreenLoading } from '../components/ui';
import stutzApi from '../../api/stutzApi';
import { IProduct } from '../interfaces'
// import { ProductList } from '../components/products';



export const Invoice = () => {



  return (
    <ShopLayoutInv title={'Teslo-Shop - Home'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
    {/* <Typography variant='h1' component='h1'>Tienda</Typography>
    <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography> */}



    </ShopLayoutInv>
)
}

