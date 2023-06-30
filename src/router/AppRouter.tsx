import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import {Login} from '../pages/auth/Login';
import { App } from '../pages/app';
// import Register from '../pages/auth/register';
import {Slug} from '../pages/product/Slug';
import { Custom404 } from '../pages/Custom404';
import { Address } from '../pages/checkout/Address';
import { Summary} from '../pages/checkout/Summary';
import { History} from '../pages/orders/History';
import { CartPage } from '../pages/cart/CartPage';
//import { useAuthStore } from '../hooks';


export const AppRouter = () => {

//    const { status, checkAuthToken } = useAuthStore();
      const status = 'authenticated' ;

// const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';

    // useEffect(() => {
    //     checkAuthToken();
    // }, [])
    


    // if ( status === 'checking' ) {
    //     return (
    //         <h3>Cargando...</h3>
    //     )
    // }

    
    return (
        <Routes>
            {
                ( status === 'not-authenticated')  
                    ? (
                        <>
                            <Route path="/auth/*" element={ <Login /> } />
                            {/* <Route path="/auth/register" element={ <Register /> } /> */}
                            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={ <App /> } />
                            <Route path="/checkout/address" element={ <Address /> } />
                            <Route path="/checkout/summary" element={ <Summary /> } />
                            <Route path="/orders/history" element={ <History /> } />
                            <Route path="/slug" element={ <Slug /> } />
                            <Route path="/cart/empty" element={ <Custom404 /> } />
                            <Route path="/cart" element={ <CartPage /> } />
                            <Route path="/*" element={ <Navigate to="/" /> } />
                        </>
                    )
            }

        </Routes>
    )
}
