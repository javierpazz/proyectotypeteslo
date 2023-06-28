import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Login from '../pages/auth/login';
import { App } from '../pages/app';
import Register from '../pages/auth/register';
import ProductPage from '../pages/product/slug';
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
                            <Route path="/auth/register" element={ <Register /> } />
                            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={ <App /> } />
                            <Route path="/product/slug" element={ <ProductPage /> } />
                            <Route path="/*" element={ <Navigate to="/" /> } />
                        </>
                    )
            }

        </Routes>
    )
}
