import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Box, Button, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';

import { CartContext } from '../../../context';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';
import { countries } from '../../utils';



export const Summary = () => {
 
 
    const navigate = useNavigate();
    const { shippingAddress, numberOfItems, createOrder } = useContext( CartContext );

    const [isPosting, setIsPosting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onCreateOrder = async() => {
        setIsPosting(true);
        const { hasError, message } = await createOrder(); 

        if ( hasError ) {
            setIsPosting(false);
            setErrorMessage( message );
            return;
        }

        navigate(`/orders/${ message }`);
    }


    if ( !shippingAddress ) {
        return <></>;
    }

    
    const { firstName, lastName, address, address2 = '', city, country, phone, zip } = shippingAddress;


  return (
    <ShopLayout title='Resumen de orden' pageDescription={'Resumen de la orden'}>
        <Typography variant='h1' component='h1'>Resumen de la orden</Typography>

        <Grid container>
            <Grid item xs={ 12 } sm={ 7 }>
                <CartList />
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen ({numberOfItems} { numberOfItems === 1 ? 'producto':'productos' })</Typography>
                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Dirección de entrega</Typography>
                            <NavLink to='/checkout/address'>
                                    Editar
                            </NavLink>
                        </Box>

                        <Typography>{ firstName } { lastName }</Typography>
                        <Typography>{ address }{ address2 ? `, ${address2}` : ''  } </Typography>
                        <Typography>{ city }, { zip }</Typography>
                        <Typography>{ countries.find( c => c.code === country )?.name }</Typography>
                        <Typography>{ phone }</Typography>
                        

                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='end'>
                            <NavLink to='/cart' >
                                    Editar
                            </NavLink>
                        </Box>

                        <OrderSummary />

                        <Box sx={{ mt: 3 }}  display="flex" flexDirection="column">
                            <Button color="secondary" className='circular-btn' fullWidth
                                onClick={onCreateOrder}
                                disabled={ isPosting }>
                                Confirmar Orden
                            </Button>
                            <Chip 
                                color="error"
                                label={ errorMessage }
                                sx={{ display: errorMessage ? 'flex':'none', mt: 2 }}
                            />

                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>


    </ShopLayout>
  )
}
