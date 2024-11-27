import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';



import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { IProduct } from '../../interfaces';
import stutzApi from '../../../api/stutzApi';



export const Query = () => {


  const [products, setProducts] = useState([])

  const loadProducts = async() => {
    try {
      const resp = await stutzApi.get('/products');
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
    <Typography variant='h1' component='h1'>Buscar ProductoTienda</Typography>
    <Typography variant='h2' sx={{ mb: 1 }}>ABC ---- 123</Typography>

    {
          !products
            ? <FullScreenLoading />
            : <ProductList products={ products } />
        }


    </ShopLayout>
)
}

