import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import {
  List,
  ListItem,
  ListItemText,
  Rating as MuiRating,
  TextField,
  CircularProgress,
} from "@mui/material";
import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow } from '../../components/products';
import { ItemCounter } from '../../components/ui/ItemCounter';
import { ICartProduct } from '../../interfaces';

import stutzApi from '../../../api/stutzApi';
import { FullScreenLoading } from '../../components/ui';
import { AuthContext, CartContext } from '../../../context';


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
          rating: 0,
          numReviews: 0,
          reviews: [
              {
              _id: '',  
              name: '',
              comment: '',
              rating: 0,
              createdAt: ','
            }
          ],
          createdAt: '',
          updatedAt: '',
      
      }
    


export const Slug = () => {

  const navigate = useNavigate();
  const {addProductToCart} =useContext(CartContext)

    // let reviewsRef = useRef();
    let reviewsRef = useRef<HTMLDivElement>(null);

    const { user : userInfo } = useContext(AuthContext);
    // const [rating, setRating] = useState(0);
    const [rating, setRating] = useState<number | null>(0);
    const [comment, setComment] = useState('');
    const [loadingCreateReview, setLoadingCreateReview] = useState(false);



  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: '649f9b05c4416622ac833792',
    codigoPro: '649f9b05c4416622ac833792',
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
      // const resp = await stutzApi.get<IProduct>(`/api/tes/products/${ slug }`);
      const resp = await stutzApi.get(`/api/tes/products/${ slug }`);
      setProduct(resp.data);

      setTempCartProduct({
        _id: resp.data._id,
        codigoPro: resp.data.codigoPro,
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
 

  const onUpdateQuantity = ( quantity: number ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      quantity
    }));
 
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment || !rating) {
        if (window.confirm('Please enter comment and rating')) {}
      return;
    }
    try {
        setLoadingCreateReview(true);
        const { data } = await stutzApi.post(
        `/api/products/${product._id}/reviews`,
        { rating, comment, name: userInfo!.name },
        {
          headers: { Authorization: `Bearer ${userInfo!}` },
        }
      );
        setLoadingCreateReview(false)
        if (window.confirm('Review submitted successfully')) {}
      product.reviews.unshift(data.review);
      product.numReviews = data.numReviews;
      product.rating = data.rating;
      window.scrollTo({
        behavior: 'smooth',
        top: reviewsRef.current!.offsetTop,
      });
    } catch (error) {
    }
  };



  

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

    <Box my={3}>
      <Typography variant="h5" gutterBottom>
        Calificaciones
      </Typography>

      {product.reviews.length === 0 ? (
        <Typography color="text.secondary">No hay Calificación</Typography>
      ) : (
        <List>
          {product.reviews.map((review) => (
            <ListItem key={review._id} alignItems="flex-start" divider>
              <ListItemText
                primary={
                  <>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {review.name}
                    </Typography>
                    <MuiRating value={review.rating} readOnly />
                  </>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      {review.createdAt!.substring(0, 10)}
                    </Typography>
                    <Typography>{review.comment}</Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}

      <Box mt={3}>
        {userInfo ? (
          <form onSubmit={submitHandler}>
            <Typography variant="h6" gutterBottom>
              Escriba una Calificación
            </Typography>

            <Box mb={2}>
              <Typography component="legend">Rating</Typography>
              <MuiRating
                value={rating}
                onChange={(_, newValue) => setRating(newValue)}
              />
            </Box>

            <TextField
              label="Comentario"
              variant="outlined"
              fullWidth
              multiline
              minRows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loadingCreateReview || !rating || !comment.trim()}
            >
              {loadingCreateReview ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Enviar"
              )}
            </Button>
          </form>
        ) : (
          <Typography>
            Por favor{" "}
            <a href={`/signin?redirect=/product/${product.slug}`}>Inicie sesión</a>{" "}
            para escribir una calificación.
          </Typography>
        )}
      </Box>
    </Box>  
      </ShopLayout>
    )
  }
    