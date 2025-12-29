import { Navigate, Route, Routes } from 'react-router-dom';

import {Login} from '../pages/auth/Login';
import {LoginAdm} from '../pages/auth/LoginAdm';
import {Register} from '../pages/auth/Register';
import {Slug} from '../pages/product/Slug';
import {Query} from '../pages/search/Query';
import { EmptyPage } from '../pages/cart/EmptyPage';
import { Address } from '../pages/checkout/Address';
import { Summary} from '../pages/checkout/Summary.tsx';
import { History} from '../pages/orders/History.tsx';
import { CartPage } from '../pages/cart/CartPage';
import {Men} from './../pages/category/Men';
import {Women} from './../pages/category/Women';
import {Kid} from './../pages/category/Kid';
import { Blanco } from '../pages/Blanco';
import { Ecommerce } from '../pages/Ecommerce.tsx';
import { Invoice } from '../pages/Invoice.tsx';
import { Escribania } from '../pages/Escribania.tsx';
// import { AuthContext } from '../../context';
import {OrderPage} from '../pages/orders/OrderPage';
import { Dashboard } from '../pages/admin/Dashboard';
import { Dashboard1 } from '../pages/admin/Dashboard1';
import { Users } from '../pages/admin/Users';
import { Products } from '../pages/admin/products';
import { ProductAdminPage } from '../pages/admin/products/product';
import { Orders } from '../pages/admin/Orders';
import { Order } from '../pages/admin/orders/Order';

  

import { AppInvOrd } from '../pages/invoice/AppInvOrd';
import { AppInvRem } from '../pages/invoice/AppInvRem';
import { AppInvIns } from '../pages/invoice/AppInvIns';
import { App } from '../pages/invoice/App';
import { AppBuy } from '../pages/invoice/AppBuy';
import { AppRem } from '../pages/invoice/AppRem';
import { AppRemBuy } from '../pages/invoice/AppRemBuy';
import { AppRempv } from '../pages/invoice/AppRempv';
import { AppRemBuypv } from '../pages/invoice/AppRemBuypv';
import { AppRec } from '../pages/invoice/AppRec';
import { AppRecBuy } from '../pages/invoice/AppRecBuy';
import { AppCajIng } from '../pages/invoice/AppCajIng';
import { AppCajEgr } from '../pages/invoice/AppCajEgr';

import { ProductListPrint } from '../pages/listados/ProductListPrint';
import { Precios } from '../pages/invoice/Precios.tsx';
import { CajaIngEgrListScreen } from '../pages/listados/CajaIngEgrListScreen';
import { IngEgrListScreen } from '../pages/listados/IngEgrListScreen';
import { CtaCusListScreen } from '../pages/listados/CtaCusListScreen';
import { CtaSupListScreen } from '../pages/listados/CtaSupListScreen';
import { CusProListScreen } from '../pages/listados/CusProListScreen';
import { SupProListScreen } from '../pages/listados/SupProListScreen';
import { ProCusListScreen } from '../pages/listados/ProCusListScreen';
import { ProSupListScreen } from '../pages/listados/ProSupListScreen';
import { ProiyeListScreen } from '../pages/listados/ProiyeListScreen';




import { AppCon } from '../pages/crmpages/AppCon';
import { AppBuyCon } from '../pages/crmpages/AppBuyCon';
import { AppRemCon } from '../pages/crmpages/AppRemCon';
import { AppRemBuyCon } from '../pages/crmpages/AppRemBuyCon';
import { AppRempvCon } from '../pages/crmpages/AppRempvCon';
import { AppBuyRempvCon } from '../pages/crmpages/AppBuyRempvCon';
import { AppRecCon } from '../pages/crmpages/AppRecCon';
import { AppBuyRecCon } from '../pages/crmpages/AppBuyRecCon';
import { AppCajIngCon } from '../pages/crmpages/AppCajIngCon';
import { AppCajEgrCon } from '../pages/crmpages/AppCajEgrCon';

// import { CajaIngEgrListScreen } from '../pages/crminfor/CajaIngListScreen';



import {SalePointScreen} from '../pages/crmpages/SalePointScreen';
import {InvoiceListScreen} from '../pages/crmpages/InvoiceListScreen';
import {RemitListScreen} from '../pages/crmpages/RemitListScreen';
import {CajaIngListScreen} from '../pages/crmpages/CajaIngListScreen';
import {CajaEgrListScreen} from '../pages/crmpages/CajaEgrListScreen';
import {ReceiptListScreen} from '../pages/crmpages/ReceiptListScreen';
import {ReceiptBuyListScreen} from '../pages/crmpages/ReceiptBuyListScreen';
import {RemitpvListScreen} from '../pages/crmpages/RemitpvListScreen';
import {InvoiceBuyListScreen} from '../pages/crmpages/InvoiceBuyListScreen';
import {RemitBuyListScreen} from '../pages/crmpages/RemitBuyListScreen';
import {RemitBuypvListScreen} from '../pages/crmpages/RemitBuypvListScreen';
import {MesaEntrada} from '../pages/invoice/MesaEntrada';
import {MesaEntradaAct} from '../pages/invoice/MesaEntradaAct';
import {MesaEntradaVal} from '../pages/invoice/MesaEntradaVal';
import {MesaEntradaCon} from '../pages/invoice/MesaEntradaCon';
import { Instrumentos } from '../pages/admin/Instrumentos';
import { InstrumentoAdminPage } from '../pages/admin/instrumentos/instrumento';
import { Customers } from '../pages/admin/Customers';
import { CustomerAdminPage } from '../pages/admin/customers/customer';
import { ComprobanteAdminPage } from '../pages/admin/comprobantes/comprobante';
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
import { ProductsFac } from '../pages/admin/productsfac';
import { ProductFacAdminPage } from '../pages/admin/productsfac/productfac';
import { Comprobantes } from '../pages/admin/comprobantes';
import { Configuraciones } from '../pages/admin/Configuraciones';
import { ConfiguracionAdminPage } from '../pages/admin/configuraciones/configuracion';
import { ConfiguracionesEsc } from '../pages/admin/Configuracionesesc';
import { ConfiguracionEscAdminPage } from '../pages/admin/configuraciones/configuracionesc';
import { Partes } from '../pages/admin/Partes';
import { ParteAdminPage } from '../pages/admin/partes/parte';
import { UserAdminPage } from '../pages/admin/users/user';
import { UserPerfilPage } from '../pages/admin/users/perfil';
import { UserPerfilAdmPage } from '../pages/admin/users/perfiladm';
import { Filtro } from '../pages/invoice/Filtro';
import { FiltroCrm } from '../pages/invoice/FiltroCrm';

import { ParamInstrumento } from '../pages/invoice/ParamInstrumento';
import {EntradaListScreen} from '../pages/crmpages/EntradaListScreen';
// import {EntradaRegSinTerListScreen} from '../pages/crmpages/EntradaRegSinTerListScreen';
// import {EntradaProSinTerListScreen} from '../pages/crmpages/EntradaProSinTerListScreen';
// import {EntradaNoRegSinTerListScreen} from '../pages/crmpages/EntradaNoRegSinTerListScreen';
// import {EntradaNoProSinTerListScreen} from '../pages/crmpages/EntradaNoProSinTerListScreen';
import {DiligenciaListScreen} from '../pages/crmpages/DiligenciaListScreen';


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
                            <Route path="/category/men" element={ <Men /> } />
                            <Route path="/category/women" element={ <Women /> } />
                            <Route path="/category/kid" element={ <Kid /> } />
                            <Route path="/checkout/address" element={ <Address /> } />
                            <Route path="/checkout/summary" element={ <Summary /> } />
                            <Route path="/admin/dashboard" element={ <Dashboard /> } />
                            <Route path="/admin/dashboard1" element={ <Dashboard1 /> } />
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
