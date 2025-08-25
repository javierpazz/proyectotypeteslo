import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui/ItemCounter';
import { ICartProduct, IProduct, ISize } from '../../interfaces';

import stutzApi from '../../../api/stutzApi';
import { FullScreenLoading } from '../../components/ui';
import { CartContext } from '../../../context';


const productI = 
      {
          _id: '',
          description: "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
          images: [
              '1740176-00-A_0_2000.jpg',
              '1740176-00-A_1.jpg',
          ],
          inStock: 7,
          price: 75,
          sizes: ['XS','S','M','L','XL','XXL'],
          slug: "mens_chill_crew_neck_sweatshirt",
          tags: ['sweatshirt'],
          title: "Men’s Chill Crew Neck Sweatshirt",
          type: 'shirts',
          gender: 'men',
          createdAt: '',
          updatedAt: '',
      
      }
    


export const Slug = () => {

  const navigate = useNavigate();
  const {addProductToCart} =useContext(CartContext)

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: '649f9b05c4416622ac833792',
    image: '1740176-00-A_0_2000.jpg',
    price: 1,
    porIva: 21,
    medPro: "unidad",
    size: "M",
    slug: 'mens_chill_crew_neck_sweatshirt',
    title: 'mens_chill_crew_neck_sweatshirt',
    gender: 'men',
    quantity: 1,
  })

const onAddProduct = () => {

  if (!tempCartProduct.size ) {return;}
  // console.log(tempCartProduct);
  addProductToCart(tempCartProduct);
  navigate ("/cart");
}

  const [product, setProduct] = useState(productI);
  const params = useParams();
  const { slug } = params;



  useEffect(() => {
    loadProduct()
   }, [])


  const loadProduct = async() => {
    try {
      const resp = await stutzApi.get<IProduct>(`/api/tes/products/${ slug }`);
      setProduct(resp.data);

      setTempCartProduct({
        _id: resp.data._id,
        image: resp.data.images[0],
        price: resp.data.price,
        porIva: resp.data.porIva,
        medPro: resp.data.medPro,
        size: "M",
        slug: resp.data.slug,
        title: resp.data.title,
        gender: resp.data.gender,
        quantity: 1,
      })
    } catch (error) {
      // console.log(error)
      
    }
   }
 
   const selectedSize = ( size: ISize ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      size
    }));
 
  }

  const onUpdateQuantity = ( quantity: number ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      quantity
    }));
 
  }


  

   if (!product)  return <FullScreenLoading/>
  
    return (
      <ShopLayout title={ product.title } pageDescription={ product.description }>
      
        <Grid container spacing={3}>
  
          <Grid item xs={12} sm={ 7 }>
            <ProductSlideshow 
              images={ product.images }
            />
          </Grid>
  
          <Grid item xs={ 12 } sm={ 5 }>
            <Box display='flex' flexDirection='column'>
  
              {/* titulos */}
              <Typography variant='h1' component='h1'>{ product.title }</Typography>
              <Typography variant='subtitle1' component='h2'>{ `$${product.price}` }</Typography>
  
              {/* Cantidad */}
              <Box sx={{ my: 2 }}>
                <Typography variant='subtitle2'>Cantidad</Typography>
                <ItemCounter
                currentValue={tempCartProduct.quantity}
                updatedQuantity={onUpdateQuantity}
                maxValue={product.inStock > 10 ? 10 : product.inStock}
             
                
                />
                {/* <SizeSelector 
                  // selectedSize={ product.sizes[2] } 
                  sizes={ product.sizes as ISize[]}
                  selectedSize={ tempCartProduct.size }
                  onSelectedSize={selectedSize}

                /> */}
              </Box>
  
  
            {/* Agregar al carrito */}
            {
              (product.inStock > 0)
               ? (
                  <Button 
                    color="secondary" 
                    className='circular-btn'
                    onClick={onAddProduct}
                  >
                    {
                      tempCartProduct.size
                        ? 'Agregar al carrito'
                        : 'Seleccione una talla'
                    }
                  </Button>
               )
               : (
                 <Chip label="No hay disponibles" color="error" variant='outlined' />
               )
            }
              {/* Descripción */}
              <Box sx={{ mt:3 }}>
                <Typography variant='subtitle2'>Descripción</Typography>
                <Typography variant='body2'>{ product.description }</Typography>
              </Box>
  
            </Box>
          </Grid>
  
  
        </Grid>
  
      </ShopLayout>
    )
  }
    