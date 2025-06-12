import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';

import { FullScreenLoading } from '../../components/ui';
import stutzApi from '../../../api/stutzApi';


export const Men = () => {


  
  const [products, setProducts] = useState([])

  const loadProducts = async() => {
    try {
      const resp = await stutzApi.get('/api/tes/products?gender=men');
      setProducts(resp.data);
    } catch (error) {
      console.log({error})
    }

  }

useEffect(() => {
  loadProducts();
  }, [])

    

  return (
    <ShopLayout title={'Teslo-Shop - Men'} pageDescription={'Encuentra los mejores productos de Teslo para ellos'}>
        <Typography variant='h1' component='h1'>Hombres</Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>Productos para ellos</Typography>

        {
          !products
            ? <FullScreenLoading />
            : <ProductList products={ products } />
        }

        
    

    </ShopLayout>
  )
}

