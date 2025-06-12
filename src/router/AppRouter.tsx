import { Navigate, Route, Routes } from 'react-router-dom';

import {Login} from '../pages/auth/Login';
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
import {SalePointScreen} from '../pages/crmpages/SalePointScreen';
import {InvoiceListScreen} from '../pages/crmpages/InvoiceListScreen';
import {Remits} from '../pages/invoice/Remits';
import {MesaEntrada} from '../pages/invoice/MesaEntrada';
import {MesaEntradaAct} from '../pages/invoice/MesaEntradaAct';
import {MesaEntradaVal} from '../pages/invoice/MesaEntradaVal';
import {MesaEntradaCon} from '../pages/invoice/MesaEntradaCon';
import { Instrumentos } from '../pages/admin/Instrumentos';
import { InstrumentoAdminPage } from '../pages/admin/instrumentos/instrumento';
import { ParamInstrumento } from '../pages/invoice/ParamInstrumento';
import {EntradaListScreen} from '../pages/crmpages/EntradaListScreen';
import {DiligenciaListScreen} from '../pages/crmpages/DiligenciaListScreen';
import { useEffect } from 'react';
import { stutzApi } from '../../api';


export const AppRouter = () => {

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await stutzApi.get(`/api/configurations/`);
      localStorage.setItem('punto', data[0]._id);
      localStorage.setItem('puntonum', data[0].codCon);

    }
    fetchData();
  }, []);




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

                            <Route path="/admin/instrumentos" element={ <Instrumentos /> } />
                            <Route path="/salepoint" element={ <SalePointScreen /> }/>
                            <Route path="/admin/invoices" element={ <InvoiceListScreen /> } />
                            <Route path="/admin/remiter" element={ <Remits /> } />
                            <Route path="/admin/mesaentrada" element={ <MesaEntrada /> } />
                            <Route path="/admin/mesaentradaAct/:id" element={ <MesaEntradaAct /> } />
                            <Route path="/admin/mesaentradaVal/:id" element={ <MesaEntradaVal /> } />
                            <Route path="/admin/instrumentos/instrumento/:slugadm" element={ <InstrumentoAdminPage /> } />
                            <Route path="/admin/paraminstrumento" element={ <ParamInstrumento /> } />
                            <Route path="/admin/entradas" element={ <EntradaListScreen /> } />
                            <Route path="/admin/diligencias" element={ <DiligenciaListScreen /> } />
                            <Route path="/admin/entrada/:id" element={ <MesaEntradaCon /> } />

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
