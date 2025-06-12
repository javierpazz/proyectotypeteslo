import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';


import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
// import { IProduct } from '../../interfaces';
import stutzApi from '../../../api/stutzApi';



export const Query = () => {

  const params = useParams();
  const { searchTerm } = params;
  console.log(params.query);
  
  const [products, setProducts] = useState([])

  const loadProducts = async() => {
    try {
      const resp = await stutzApi.get(`/api/tes/products/getproductsbysear/${params.query}`);
      setProducts(resp.data);
      const foundProducts = resp.data.length > 0;
      if ( !foundProducts ) {
        // products = await dbProducts.getAllProducts(); 
        const respaux = await stutzApi.get("/api/tes/products/getproductsbysear/Onesie");
        setProducts(respaux.data);
      }

    } catch (error) {
      console.log({error})
    }

  }

useEffect(() => {
  loadProducts();
  }, [params.query])




  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
    <Typography variant='h1' component='h1'>Buscar ProductoTienda</Typography>
    <Typography variant='h2' sx={{ mb: 1 }}>{searchTerm}</Typography>

    {
          !products
            ? <FullScreenLoading />
            : <ProductList products={ products } />
        }


    </ShopLayout>
)
}

