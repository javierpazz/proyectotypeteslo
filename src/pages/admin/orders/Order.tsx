import { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import { Link, Box, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { ShopLayout } from '../../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../../components/cart';
import { IOrder } from '../../../interfaces';
import { stutzApi } from '../../../../api';
import { AuthContext } from '../../../../context';

const OrderI:IOrder = {
    _id : '',
    user: '',
    orderItems: [],
    shippingAddress: {
        firstName: '',
        lastName : '',
        address  : '',
        address2 : '',
        zip      : '',
        city     : '',
        country  : '',
        phone    : '',
    },
//    paymentResult: '',

    numberOfItems: 0,
    subTotal     : 0,
    tax          : 0,
    total        : 0,

    isPaid  : false,
    paidAt : '',
}


export const Order = () => {


    
//  const { user } = useContext(  AuthContext );
 const [order, setOrder] = useState(OrderI);
 const params = useParams();
 const { id } = params;

//  useEffect(() => {
//     if ( !user ) {
//         navigate (`/auth/login?p=/orders/${ id }`);
//     }
//     }, [])

 useEffect(() => {
    const loadProduct = async() => {
        try {
            const resp = await stutzApi.get<IOrder>(`orders/getorderbyid/${ id }`);
            setOrder({
                _id: resp.data._id,
                user: resp.data.user,
                orderItems: resp.data.orderItems,
                shippingAddress: resp.data.shippingAddress,
            //    paymentResult: '',
            
                numberOfItems: resp.data.numberOfItems,
                subTotal     : resp.data.subTotal,
                tax          : resp.data.tax,
                total        : resp.data.total,
            
                isPaid  : resp.data.isPaid,
                paidAt : resp.data.paidAt
             });
        
     
        } catch (error) {
          console.log(error)
          
        }
       }
         loadProduct()
        }, [id])

    const { shippingAddress } = order;
//////
 
//   if ( !order ) {
//     navigate (`/orders/history`);
//     }
//   if ( order.user !== user?._id ) {
//         navigate (`/orders/history`);
//     }

  return (
    <ShopLayout title='Resumen de la orden 123671523' pageDescription={'Resumen de la orden'}>
        <Typography variant='h1' component='h1'>Orden: {order._id} </Typography>

{
    order.isPaid
    ? (

        
                <Chip 
                    sx={{ my: 2 }}
                    label="Orden ya fue pagada"
                    variant='outlined'
                    color="success"
                    icon={ <CreditScoreOutlined /> }
                />
    ):(
                <Chip 
                    sx={{ my: 2 }}
                    label="Pendiente de pago"
                    variant='outlined'
                    color="error"
                    icon={ <CreditCardOffOutlined /> }
                />

    )
}

        <Grid container>
            <Grid item xs={ 12 } sm={ 7 }>
                <CartList products={  order.orderItems } />                
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen ({ order.numberOfItems } { order.numberOfItems > 1 ? 'productos': 'producto'})</Typography>
                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Dirección de entrega</Typography>
                        </Box>

                        
                        <Typography>{ shippingAddress.firstName } { shippingAddress.lastName }</Typography>
                        <Typography>{ shippingAddress.address } { shippingAddress.address2 ? `, ${ shippingAddress.address2 }`: '' }</Typography>
                        <Typography>{ shippingAddress.city }, { shippingAddress.zip }</Typography>
                        <Typography>{ shippingAddress.country }</Typography>
                        <Typography>{ shippingAddress.phone }</Typography>

                        <Divider sx={{ my:1 }} />


                        <OrderSummary 
                            orderValues={{
                                numberOfItems: order.numberOfItems,
                                subTotal: order.subTotal,
                                total: order.total,
                                tax: order.tax,
                            }} 
                        />

                        <Box sx={{ mt: 3 }} display="flex" flexDirection='column'>
                            {/* TODO */}
                            {
                                order.isPaid
                                ? (

                            <Chip 
                                sx={{ my: 2 }}
                                label="Orden ya fue pagada"
                                variant='outlined'
                                color="success"
                                icon={ <CreditScoreOutlined /> }
                            />

                            ):(
                                <Chip 
                                sx={{ my: 2 }}
                                label="Pendiente de pago"
                                variant='outlined'
                                color="error"
                                icon={ <CreditCardOffOutlined /> }
                            />
                                        )
                        }

                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>


    </ShopLayout>
  )
}

