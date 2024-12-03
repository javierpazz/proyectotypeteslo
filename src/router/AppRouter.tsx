import { useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import {Login} from '../pages/auth/Login';
import { App } from '../pages/app';
import {Register} from '../pages/auth/Register';
import {Slug} from '../pages/product/Slug';
import {Query} from '../pages/search/Query';
import { EmptyPage } from '../pages/cart/EmptyPage';
import { Address } from '../pages/checkout/Address';
import { Summary} from '../pages/checkout/Summary';
import { History} from '../pages/orders/History';
import { CartPage } from '../pages/cart/CartPage';
import {Men} from './../pages/category/Men';
import {Women} from './../pages/category/Women';
import {Kid} from './../pages/category/Kid';
import { Stutz } from '../pages/Stutz';
// import { AuthContext } from '../../context';
import {OrderPage} from '../pages/orders/OrderPage';
import { Dashboard } from '../pages/admin/Dashboard';
import { Users } from '../pages/admin/Users';
import { Products } from '../pages/admin/products';
import { ProductAdminPage } from '../pages/admin/products/product';
import { Orders } from '../pages/admin/Orders';
import { Order } from '../pages/admin/orders/Order';


export const AppRouter = () => {

    // const { isLoggedIn } = useContext( AuthContext );
    // const { user, isLoggedIn } = useContext(  AuthContext );      

    // console.log(user, isLoggedIn);
    return (
        <Routes>
            {/* {
                ( !isLoggedIn )  
                ? ( */}
                    <>
                            <Route path="/auth/*" element={ <Login /> } />
                            <Route path="/auth/register" element={ <Register /> } />
                            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                        {/* </>
                    )
                    : (
                        <> */}
                            <Route path="/" element={ <Stutz /> } />
                            <Route path="/category/men" element={ <Men /> } />
                            <Route path="/category/women" element={ <Women /> } />
                            <Route path="/category/kid" element={ <Kid /> } />
                            <Route path="/checkout/address" element={ <Address /> } />
                            <Route path="/checkout/summary" element={ <Summary /> } />
                            <Route path="/admin" element={ <Dashboard /> } />
                            <Route path="/admin/users" element={ <Users /> } />
                            <Route path="/admin/products" element={ <Products /> } />
                            <Route path="/admin/products/product/:slugadm" element={ <ProductAdminPage /> } />
                            <Route path="/admin/orders/order/:id" element={ <Order /> } />
                            <Route path="/admin/orders" element={ <Orders /> } />
                            <Route path="/orders/history" element={ <History /> } />
                            <Route path="/orders/:id" element={ <OrderPage /> } />
                            <Route path="product/:slug" element={<Slug />} />
                            <Route path="search/:query" element={<Query />} />
                            <Route path="/cart/empty" element={ <EmptyPage /> } />
                            <Route path="/cart" element={ <CartPage /> } />
                            <Route path="/*" element={ <Navigate to="/" /> } />
                        </>
                    {/* )
            } */}

        </Routes>
    )
}
