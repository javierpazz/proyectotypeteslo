import { Navigate, Route, Routes } from 'react-router-dom';

import {Login} from '../pages/auth/Login';
import {LoginAdm} from '../pages/auth/LoginAdm';
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
import { Customers } from '../pages/admin/Customers';
import { CustomerAdminPage } from '../pages/admin/customers/customer';
import { Proveedores } from '../pages/admin/Proveedores';
import { ProveedorAdminPage } from '../pages/admin/proveedores/proveedor';
import { Valores } from '../pages/admin/Valores';
import { ValorAdminPage } from '../pages/admin/valores/valor';
import { Encargados } from '../pages/admin/Encargados';
import { EncargadoAdminPage } from '../pages/admin/encargados/encargado';
import { Estadosorden } from '../pages/admin/Estadosorden';
import { EstadoordenAdminPage } from '../pages/admin/estadosorden/estadoorden';
import { ProductsEsc } from '../pages/admin/productsesc';
import { ProductEscAdminPage } from '../pages/admin/diligencias/productesc';
import { Comprobantes } from '../pages/admin/comprobantes';
import { Configuraciones } from '../pages/admin/Configuraciones';
import { ConfiguracionAdminPage } from '../pages/admin/configuraciones/configuracion';
import { ConfiguracionesEsc } from '../pages/admin/Configuracionesesc';
import { ConfiguracionEscAdminPage } from '../pages/admin/configuraciones/configuracionesc';
import { Partes } from '../pages/admin/Partes';
import { ParteAdminPage } from '../pages/admin/partes/parte';
import { UserAdminPage } from '../pages/admin/users/user';
import { Filtro } from '../pages/invoice/Filtro';

import { ParamInstrumento } from '../pages/invoice/ParamInstrumento';
import {EntradaListScreen} from '../pages/crmpages/EntradaListScreen';
// import {EntradaRegSinTerListScreen} from '../pages/crmpages/EntradaRegSinTerListScreen';
// import {EntradaProSinTerListScreen} from '../pages/crmpages/EntradaProSinTerListScreen';
// import {EntradaNoRegSinTerListScreen} from '../pages/crmpages/EntradaNoRegSinTerListScreen';
// import {EntradaNoProSinTerListScreen} from '../pages/crmpages/EntradaNoProSinTerListScreen';
import {DiligenciaListScreen} from '../pages/crmpages/DiligenciaListScreen';
import { useEffect } from 'react';
import { stutzApi } from '../../api';


export const AppRouter = () => {


  useEffect(() => {
    const cargado = localStorage.getItem('punto');
    if (!cargado) {

    const fetchData = async () => {
      const { data } = await stutzApi.get(`/api/configurations/`);
      localStorage.setItem('punto', data[0]._id);
      localStorage.setItem('puntonum', data[0].codCon);
      localStorage.setItem('nameCon', data[0].name);
    }
    fetchData();
    }
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
                            <Route path="/auth/login" element={ <Login /> } />
                            <Route path="/auth/loginadm" element={ <LoginAdm /> } />
                            <Route path="/auth/register" element={ <Register /> } />
                            <Route path="/*" element={ <Navigate to="/auth/loginadm" /> } />
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

                            <Route path="/salepoint" element={ <SalePointScreen /> }/>
                            <Route path="/admin/invoices" element={ <InvoiceListScreen /> } />
                            <Route path="/admin/remiter" element={ <Remits /> } />
                            <Route path="/admin/mesaentrada" element={ <MesaEntrada /> } />
                            <Route path="/admin/mesaentradaAct/:id" element={ <MesaEntradaAct /> } />
                            <Route path="/admin/mesaentradaVal/:id" element={ <MesaEntradaVal /> } />
                            <Route path="/admin/paraminstrumento" element={ <ParamInstrumento /> } />
                            <Route path="/admin/entradas" element={ <EntradaListScreen /> } />
                            {/* <Route path="/admin/entradasrst" element={ <EntradaRegSinTerListScreen /> } />
                            <Route path="/admin/entradasnrst" element={ <EntradaNoRegSinTerListScreen /> } />
                            <Route path="/admin/entradaspst" element={ <EntradaProSinTerListScreen /> } />
                            <Route path="/admin/entradasnpst" element={ <EntradaNoProSinTerListScreen /> } /> */}
                            <Route path="/admin/diligencias" element={ <DiligenciaListScreen /> } />
                            <Route path="/admin/entrada/:id" element={ <MesaEntradaCon /> } />
                            <Route path="/admin/instrumentos" element={ <Instrumentos /> } />
                            <Route path="/admin/instrumentos/instrumento/:id" element={ <InstrumentoAdminPage /> } />
                            <Route path="/admin/customers" element={ <Customers /> } />
                            <Route path="/admin/customers/customer/:id" element={ <CustomerAdminPage /> } />
                            <Route path="/admin/proveedores" element={ <Proveedores /> } />
                            <Route path="/admin/proveedores/proveedor/:id" element={ <ProveedorAdminPage /> } />
                            <Route path="/admin/valores" element={ <Valores /> } />
                            <Route path="/admin/valores/valor/:id" element={ <ValorAdminPage /> } />
                            <Route path="/admin/encargados" element={ <Encargados /> } />
                            <Route path="/admin/encargados/encargado/:id" element={ <EncargadoAdminPage /> } />
                            <Route path="/admin/estadosorden" element={ <Estadosorden /> } />
                            <Route path="/admin/estadosorden/estadoorden/:id" element={ <EstadoordenAdminPage /> } />
                            <Route path="/admin/productsesc" element={ <ProductsEsc /> } />
                            <Route path="/admin/productsesc/productesc/:title" element={ <ProductEscAdminPage /> } />
                            <Route path="/admin/comprobantes" element={ <Comprobantes /> } />
                            <Route path="/admin/configuraciones" element={ <Configuraciones /> } />
                            <Route path="/admin/configuraciones/configuracion/:id" element={ <ConfiguracionAdminPage /> } />
                            <Route path="/admin/configuracionesesc" element={ <ConfiguracionesEsc /> } />
                            <Route path="/admin/configuraciones/configuracionesc/:id" element={ <ConfiguracionEscAdminPage /> } />
                            <Route path="/admin/partes" element={ <Partes /> } />
                            <Route path="/admin/partes/parte/:id" element={ <ParteAdminPage /> } />
                            <Route path="/admin/users" element={ <Users /> } />
                            <Route path="/admin/users/user/:id" element={ <UserAdminPage /> } />
                            <Route path="/admin/filtro" element={ <Filtro /> } />

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
