import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
  import { ShopLayout } from '../../components/layouts';
  
  import { ProductList } from '../../components/products';
  
  import { FullScreenLoading } from '../../components/ui';
  import stutzApi from '../../../api/stutzApi';

export const Kid = () => {



  
  const [products, setProducts] = useState([])

  const loadProducts = async() => {
    try {
      const resp = await stutzApi.get('/api/tes/products?gender=kid');
      setProducts(resp.data);
    } catch (error) {
      console.log({error})
    }

  }

useEffect(() => {
  loadProducts();
  }, [])


  return (
    <ShopLayout title={'Teslo-Shop - Kids'} pageDescription={'Encuentra los mejores productos de Teslo para niños'}>
        <Typography variant='h1' component='h1'>Niños</Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>Productos para niños</Typography>

        {
          !products
            ? <FullScreenLoading />
            : <ProductList products={ products } />
        }

        
    

    </ShopLayout>
  )
}

