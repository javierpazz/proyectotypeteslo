import { Navigate, Route, Routes } from 'react-router-dom';

import {Login} from '../pages/auth/Login.tsx';
import {LoginAdm} from '../pages/auth/LoginAdm.tsx';
import {Register} from '../pages/auth/Register.tsx';
import {Slug} from '../pages/product/Slug.tsx';
import {Query} from '../pages/search/Query.tsx';
import { EmptyPage } from '../pages/cart/EmptyPage.tsx';
import { Address } from '../pages/checkout/Address.tsx';
import { Summary} from '../pages/checkout/Summary.tsx';
import { History} from '../pages/orders/History.tsx';
import { CartPage } from '../pages/cart/CartPage.tsx';
import { Blanco } from '../pages/Blanco.tsx';
import { Ecommerce } from '../pages/Ecommerce.tsx';
import { Invoice } from '../pages/Invoice.tsx';
import { Escribania } from '../pages/Escribania.tsx';
// import { AuthContext } from '../../context';
import {OrderPage} from '../pages/orders/OrderPage.tsx';
// import { DashboardEsc } from '../pages/admin/Dashboardesc';
import { Dashboard } from '../pages/admin/Dashboard.tsx';
import { DashboardEsc } from '../pages/admin/DashboardEsc.tsx';
import { Users } from '../pages/admin/Users.tsx';
import { ForgetPassword } from '../pages/admin/users/forgetPassword.tsx';
import { ResetPassword } from '../pages/admin/users/resetPassword.tsx';
import { Products } from '../pages/admin/products.tsx';
import { ProductAdminPage } from '../pages/admin/products/product.tsx';
import { Orders } from '../pages/admin/Orders.tsx';
import { Order } from '../pages/admin/orders/Order.tsx';

  

import { AppInvOrd } from '../pages/invoice/AppInvOrd.tsx';
import { AppInvRem } from '../pages/invoice/AppInvRem.tsx';
import { AppInvIns } from '../pages/invoice/AppInvIns.tsx';
import { App } from '../pages/invoice/App.tsx';
import { AppBuy } from '../pages/invoice/AppBuy.tsx';
import { AppRem } from '../pages/invoice/AppRem.tsx';
import { AppRemBuy } from '../pages/invoice/AppRemBuy.tsx';
import { AppRempv } from '../pages/invoice/AppRempv.tsx';
import { AppRemBuypv } from '../pages/invoice/AppRemBuypv.tsx';
import { AppRec } from '../pages/invoice/AppRec.tsx';
import { AppRecBuy } from '../pages/invoice/AppRecBuy.tsx';
import { AppCajIng } from '../pages/invoice/AppCajIng.tsx';
import { AppCajEgr } from '../pages/invoice/AppCajEgr.tsx';

import { ProductListPrint } from '../pages/listados/ProductListPrint.tsx';
import { Precios } from '../pages/invoice/Precios.tsx';
import { CajaIngEgrListScreen } from '../pages/listados/CajaIngEgrListScreen.tsx';
import { IngEgrListScreen } from '../pages/listados/IngEgrListScreen.tsx';
import { CtaCusListScreen } from '../pages/listados/CtaCusListScreen.tsx';
import { CtaSupListScreen } from '../pages/listados/CtaSupListScreen.tsx';
import { CusProListScreen } from '../pages/listados/CusProListScreen.tsx';
import { SupProListScreen } from '../pages/listados/SupProListScreen.tsx';
import { ProCusListScreen } from '../pages/listados/ProCusListScreen.tsx';
import { ProSupListScreen } from '../pages/listados/ProSupListScreen.tsx';
import { ProiyeListScreen } from '../pages/listados/ProiyeListScreen.tsx';




import { AppCon } from '../pages/crmpages/AppCon.tsx';
import { AppBuyCon } from '../pages/crmpages/AppBuyCon.tsx';
import { AppRemCon } from '../pages/crmpages/AppRemCon.tsx';
import { AppRemBuyCon } from '../pages/crmpages/AppRemBuyCon.tsx';
import { AppRempvCon } from '../pages/crmpages/AppRempvCon.tsx';
import { AppBuyRempvCon } from '../pages/crmpages/AppBuyRempvCon.tsx';
import { AppRecCon } from '../pages/crmpages/AppRecCon.tsx';
import { AppBuyRecCon } from '../pages/crmpages/AppBuyRecCon.tsx';
import { AppCajIngCon } from '../pages/crmpages/AppCajIngCon.tsx';
import { AppCajEgrCon } from '../pages/crmpages/AppCajEgrCon.tsx';

// import { CajaIngEgrListScreen } from '../pages/crminfor/CajaIngListScreen';



import {SalePointScreen} from '../pages/crmpages/SalePointScreen.tsx';
import {InvoiceListScreen} from '../pages/crmpages/InvoiceListScreen.tsx';
import {RemitListScreen} from '../pages/crmpages/RemitListScreen.tsx';
import {CajaIngListScreen} from '../pages/crmpages/CajaIngListScreen.tsx';
import {CajaEgrListScreen} from '../pages/crmpages/CajaEgrListScreen.tsx';
import {ReceiptListScreen} from '../pages/crmpages/ReceiptListScreen.tsx';
import {ReceiptBuyListScreen} from '../pages/crmpages/ReceiptBuyListScreen.tsx';
import {RemitpvListScreen} from '../pages/crmpages/RemitpvListScreen.tsx';
import {InvoiceBuyListScreen} from '../pages/crmpages/InvoiceBuyListScreen.tsx';
import {RemitBuyListScreen} from '../pages/crmpages/RemitBuyListScreen.tsx';
import {RemitBuypvListScreen} from '../pages/crmpages/RemitBuypvListScreen.tsx';
import {MesaEntrada} from '../pages/invoice/MesaEntrada.tsx';
import {MesaEntradaAct} from '../pages/invoice/MesaEntradaAct.tsx';
import {MesaEntradaVal} from '../pages/invoice/MesaEntradaVal.tsx';
import {MesaEntradaCon} from '../pages/invoice/MesaEntradaCon.tsx';
import { Instrumentos } from '../pages/admin/Instrumentos.tsx';
import { InstrumentoAdminPage } from '../pages/admin/instrumentos/instrumento.tsx';
import { Customers } from '../pages/admin/Customers.tsx';
import { CustomerAdminPage } from '../pages/admin/customers/customer.tsx';
import { ComprobanteAdminPage } from '../pages/admin/comprobantes/comprobante.tsx';
import { Proveedores } from '../pages/admin/Proveedores.tsx';
import { ProveedorAdminPage } from '../pages/admin/proveedores/proveedor.tsx';
import { Valores } from '../pages/admin/Valores.tsx';
import { ValorAdminPage } from '../pages/admin/valores/valor.tsx';
import { Encargados } from '../pages/admin/Encargados.tsx';
import { EncargadoAdminPage } from '../pages/admin/encargados/encargado.tsx';
import { Estadosorden } from '../pages/admin/Estadosorden.tsx';
import { EstadoordenAdminPage } from '../pages/admin/estadosorden/estadoorden.tsx';
import { ProductsEsc } from '../pages/admin/productsesc.tsx';
import { ProductEscAdminPage } from '../pages/admin/diligencias/productesc.tsx';
import { ProductsFac } from '../pages/admin/productsfac.tsx';
import { ProductFacAdminPage } from '../pages/admin/productsfac/productfac.tsx';
import { Comprobantes } from '../pages/admin/comprobantes.tsx';
import { Configuraciones } from '../pages/admin/Configuraciones.tsx';
import { ConfiguracionAdminPage } from '../pages/admin/configuraciones/configuracion.tsx';
import { ConfiguracionesEsc } from '../pages/admin/Configuracionesesc.tsx';
import { ConfiguracionEscAdminPage } from '../pages/admin/configuraciones/configuracionesc.tsx';
import { Partes } from '../pages/admin/Partes.tsx';
import { ParteAdminPage } from '../pages/admin/partes/parte.tsx';
import { UserAdminPage } from '../pages/admin/users/user.tsx';
import { UserPerfilPage } from '../pages/admin/users/perfil.tsx';
import { UserPerfilAdmPage } from '../pages/admin/users/perfiladm.tsx';
import { Filtro } from '../pages/invoice/Filtro.tsx';
import { FiltroCrm } from '../pages/invoice/FiltroCrm.tsx';

import { ParamInstrumento } from '../pages/invoice/ParamInstrumento.tsx';
import {EntradaListScreen} from '../pages/crmpages/EntradaListScreen.tsx';
// import {EntradaRegSinTerListScreen} from '../pages/crmpages/EntradaRegSinTerListScreen';
// import {EntradaProSinTerListScreen} from '../pages/crmpages/EntradaProSinTerListScreen';
// import {EntradaNoRegSinTerListScreen} from '../pages/crmpages/EntradaNoRegSinTerListScreen';
// import {EntradaNoProSinTerListScreen} from '../pages/crmpages/EntradaNoProSinTerListScreen';
import {DiligenciaListScreen} from '../pages/crmpages/DiligenciaListScreen.tsx';


export const AppRouter = () => {


//   useEffect(() => {
//     const cargado = localStorage.getItem('punto');
//     if (!cargado) {

//     const fetchData = async () => {
//       const { data } = await stutzApi.get(`/api/configurations/`);
//       localStorage.setItem('punto', data[0]._id);
//       localStorage.setItem('puntonum', data[0].codCon);
//       localStorage.setItem('nameCon', data[0].name);
//     }
//     fetchData();
//     }
//   }, []);





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
                            {/* <Route path="/" element={ <Blanco /> } />    */}
                            <Route path="/blanco" element={ <Blanco /> } />
                            <Route path="/" element={ <Ecommerce /> } />
                            <Route path="/factura" element={ <Invoice /> } />
                            <Route path="/escribania" element={ <Escribania /> } />
                            <Route path="/checkout/address" element={ <Address /> } />
                            <Route path="/checkout/summary" element={ <Summary /> } />
                            <Route path="/admin/dashboard" element={ <Dashboard /> } />
                            <Route path="/admin/dashboardesc" element={ <DashboardEsc /> } />
                            <Route path="/admin/users" element={ <Users /> } />
                            <Route path="/admin/products" element={ <Products /> } />
                            <Route path="/admin/products/product/:slugadm" element={ <ProductAdminPage /> } />
                            <Route path="/admin/orders/order/:id" element={ <Order /> } />
                            <Route path="/admin/orders" element={ <Orders /> } />

                            <Route path="/salepoint" element={ <SalePointScreen /> }/>

                            <Route path="/admin/invoicerord/:id" element={ <AppInvOrd />  }/>
                            <Route path="/admin/invoicerrem/:id" element={ <AppInvRem />  }/>
                            <Route path="/admin/invoicerins/:id" element={ <AppInvIns />  }/>
                            <Route path="/admin/invoicer" element={ <App />  }/>
                            <Route path="/admin/remiter" element={ <AppRem />  }/>
                            <Route path="/admin/remiterpv" element={ <AppRempv />  }/>
                            <Route path="/admin/invoicerBuy" element={ <AppBuy />  }/>
                            <Route path="/admin/remiterBuy" element={ <AppRemBuy />  }/>
                            <Route path="/admin/remiterBuypv" element={ <AppRemBuypv />  }/>
                            <Route path="/admin/invoicerRec" element={ <AppRec />  }/>
                            <Route path="/admin/invoicerBuyRec" element={ <AppRecBuy />  }/>
                            <Route path="/admin/invoicerCajIng" element={ <AppCajIng />  }/>
                            <Route path="/admin/invoicerCajEgr" element={ <AppCajEgr />  }/>

                            <Route path="/admin/productsList" element={<ProductListPrint /> }/>
                            <Route path="/admin/precios" element={<Precios /> }/>
                            <Route path="/admin/invoicesCajIngEgr" element={ <CajaIngEgrListScreen /> } />
                            <Route path="/admin/informe/IngEgr" element={ <IngEgrListScreen /> } />
                            <Route path="/admin/informe/ctacus" element={ <CtaCusListScreen /> } />
                            <Route path="/admin/informe/ctasup" element={ <CtaSupListScreen /> } />
                            <Route path="/admin/informe/cuspro" element={ <CusProListScreen /> } />
                            <Route path="/admin/informe/suppro" element={ <SupProListScreen /> } />
                            <Route path="/admin/informe/procus" element={ <ProCusListScreen /> } />
                            <Route path="/admin/informe/prosup" element={ <ProSupListScreen /> } />
                            <Route path="/admin/informe/proiye" element={ <ProiyeListScreen /> } />



                            <Route path="/admin/invoicerRemCon/:id" element={ <AppRemCon />  }/>
                            <Route path="/admin/invoicerRemBuyCon/:id" element={ <AppRemBuyCon />  }/>
                            <Route path="/admin/invoicerRempvCon/:id" element={ <AppRempvCon />  }/>
                            <Route path="/admin/invoicerBuyRempvCon/:id" element={ <AppBuyRempvCon />  }/>
                            <Route path="/admin/invoicerCon/:id" element={ <AppCon />  }/>
                            <Route path="/admin/invoicerBuyCon/:id" element={ <AppBuyCon />  }/>
                            <Route path="/admin/invoicerRecCon/:id" element={ <AppRecCon />  }/>
                            <Route path="/admin/invoicerBuyRecCon/:id" element={ <AppBuyRecCon />  }/>
                            <Route path="/admin/invoicerCajIngCon/:id" element={ <AppCajIngCon />  }/>
                            <Route path="/admin/invoicerCajEgrCon/:id" element={ <AppCajEgrCon />  }/>

                            {/* <Route path="/admin/invoicesCajIngEgr" element={ <CajaIngEgrListScreen />  }/> */}

                            <Route path="/admin/invoices" element={ <InvoiceListScreen /> } />
                            <Route path="/admin/remits" element={ <RemitListScreen /> } />
                            <Route path="/admin/invoicesBuy" element={ <InvoiceBuyListScreen /> } />
                            <Route path="/admin/remitsBuy" element={ <RemitBuyListScreen /> } />
                            <Route path="/admin/remitspv" element={ <RemitpvListScreen /> } />
                            <Route path="/admin/invoicesCajIng" element={ <CajaIngListScreen /> } />
                            <Route path="/admin/invoicesCajEgr" element={ <CajaEgrListScreen /> } />
                            <Route path="/admin/invoicesRec" element={ <ReceiptListScreen /> } />
                            <Route path="/admin/invoicesBuyRec" element={ <ReceiptBuyListScreen /> } />
                            <Route path="/admin/remitsBuypv" element={ <RemitBuypvListScreen /> } />

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
                            <Route path="/admin/comprobantes/comprobante/:id" element={ <ComprobanteAdminPage /> } />
                            <Route path="/admin/proveedores" element={ <Proveedores /> } />
                            <Route path="/admin/proveedores/proveedor/:id" element={ <ProveedorAdminPage /> } />
                            <Route path="/admin/valores" element={ <Valores /> } />
                            <Route path="/admin/valores/valor/:id" element={ <ValorAdminPage /> } />
                            <Route path="/admin/encargados" element={ <Encargados /> } />
                            <Route path="/admin/encargados/encargado/:id" element={ <EncargadoAdminPage /> } />
                            <Route path="/admin/estadosorden" element={ <Estadosorden /> } />
                            <Route path="/admin/estadosorden/estadoorden/:id" element={ <EstadoordenAdminPage /> } />
                            <Route path="/admin/productsesc" element={ <ProductsEsc /> } />
                            <Route path="/admin/productsesc/productesc/:slugadm" element={ <ProductEscAdminPage /> } />
                            <Route path="/admin/productsfac" element={ <ProductsFac /> } />
                            <Route path="/admin/productsfac/productfac/:slugadm" element={ <ProductFacAdminPage /> } />
                            <Route path="/admin/comprobantes" element={ <Comprobantes /> } />
                            <Route path="/admin/configuraciones" element={ <Configuraciones /> } />
                            <Route path="/admin/configuraciones/configuracion/:id" element={ <ConfiguracionAdminPage /> } />
                            <Route path="/admin/configuracionesesc" element={ <ConfiguracionesEsc /> } />
                            <Route path="/admin/configuraciones/configuracionesc/:id" element={ <ConfiguracionEscAdminPage /> } />
                            <Route path="/admin/partes" element={ <Partes /> } />
                            <Route path="/admin/partes/parte/:id" element={ <ParteAdminPage /> } />
                            <Route path="/admin/users/forgetPasword" element={ <ForgetPassword /> } />
                            <Route path="/reset-password/:token" element={ <ResetPassword /> } />
                            <Route path="/admin/users" element={ <Users /> } />
                            <Route path="/admin/users/user/:id" element={ <UserAdminPage /> } />
                            <Route path="/admin/profile/:id" element={ <UserPerfilPage /> } />
                            <Route path="/admin/profileadm" element={ <UserPerfilAdmPage /> } />
                            <Route path="/admin/filtro" element={ <Filtro /> } />
                            <Route path="/admin/filtrocrm" element={ <FiltroCrm /> } />

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
