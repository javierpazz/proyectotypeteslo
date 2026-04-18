import { FC, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { Box, Button, Grid, Typography } from '@mui/material';

import { ItemCounter } from '../ui';
import { CartContext } from '../../../context';
import { ICartProduct, IOrderItem } from '../../interfaces';


interface Props {
    editable?: boolean;
    products?: IOrderItem[];
}

export const CartServList: FC<Props> = ({ editable = false, products }) => {

    const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

    const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
        product.quantity = newQuantityValue;
        updateCartQuantity( product );
    }

    const productsToShow = products ? products : cart;

  return (
    <>
        {
            productsToShow.map( product => (
                <Grid container spacing={2} key={ product.slug + product.size} sx={{ mb:1 }}>
                    <Grid item xs={3}>
                        {/* TODO: llevar a la página del producto */}
                        <MuiLink component={RouterLink} to={`/product/${ product.slug }`}>
                                {/* <CardActionArea>
                                    <CardMedia 
                                        image={ product.image }
                                        component='img'
                                        sx={{ borderRadius: '5px' }}
                                    />
                                </CardActionArea> */}
                        </MuiLink>
                    </Grid>
                    <Grid item xs={7}>
                        <Box display='flex' flexDirection='column'>
                            <Typography variant='body1'>{ product.title }</Typography>
                            {/* <Typography variant='body1'>Talla: <strong>{ product.size }</strong></Typography> */}

                            {
                                editable 
                                ? (
                                    <ItemCounter 
                                        currentValue={ product.quantity }
                                        maxValue={ 10 } 
                                        updatedQuantity={ ( value ) => onNewCartQuantityValue(product as ICartProduct, value )}
                                        // unimed={ product.medPro }
                                        unimed={ "" }
                                    />
                                )

                                : <Typography variant='h5'>{ product.quantity }</Typography>
                            }
                            
                        </Box>
                    </Grid>
                    <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                        <Typography variant='subtitle1'>{ `$${ product.price }` }</Typography>
                        
                        {
                                editable && (
                                    <Button 
                                        variant='text' 
                                        color='secondary' 
                                        onClick={ () => removeCartProduct( product as ICartProduct ) }
                                    >
                                        Remover
                                    </Button>
                                )
                            }
                    </Grid>
                </Grid>
            ))
        }
    </>
  )
}
