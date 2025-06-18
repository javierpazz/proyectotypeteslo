import { useState, useEffect } from 'react';
import '../styles/globals.css';
import { Typography } from '@mui/material';

import { ShopLayout } from '../components/layouts';
import { ProductList } from '../components/products';
import { FullScreenLoading } from '../components/ui';
import stutzApi from '../../api/stutzApi';
import { IProduct } from '../interfaces'



export const Stutz = () => {


  // const [products, setProducts] = useState<IProduct>()
  const [products, setProducts] = useState<IProduct[]>()

  const loadProducts = async() => {
    try {
      const resp = await stutzApi.get<IProduct[]>('api/tes/products');
      setProducts(resp.data);
    } catch (error) {
      console.log({error})
    }

  }

useEffect(() => {
  loadProducts();
  }, [])




  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
    {/* <Typography variant='h1' component='h1'>Tienda</Typography>
    <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography> */}

    {
          !products
            ? <FullScreenLoading />
            // : <ProductList products={ products } />
            : <></>

            // :    <MultipleImageUploader/>


        }


    </ShopLayout>
)
}

