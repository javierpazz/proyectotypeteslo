import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';


const Instrumentos = lazy(() =>
  import('../../pages/admin/Instrumentos').then(m => ({ default: m.Instrumentos }))
);

const InstrumentoAdminPage = lazy(() =>
  import('../../pages/admin/instrumentos/instrumento').then(m => ({ default: m.InstrumentoAdminPage }))
);

const Customers = lazy(() =>
  import('../../pages/admin/Customers').then(m => ({ default: m.Customers }))
);

const CustomerAdminPage = lazy(() =>
  import('../../pages/admin/customers/customer').then(m => ({ default: m.CustomerAdminPage }))
);

const ComprobanteAdminPage = lazy(() =>
  import('../../pages/admin/comprobantes/comprobante').then(m => ({ default: m.ComprobanteAdminPage }))
);

const Proveedores = lazy(() =>
  import('../../pages/admin/Proveedores').then(m => ({ default: m.Proveedores }))
);

const ProveedorAdminPage = lazy(() =>
  import('../../pages/admin/proveedores/proveedor').then(m => ({ default: m.ProveedorAdminPage }))
);

const Valores = lazy(() =>
  import('../../pages/admin/Valores').then(m => ({ default: m.Valores }))
);

const ValorAdminPage = lazy(() =>
  import('../../pages/admin/valores/valor').then(m => ({ default: m.ValorAdminPage }))
);

const Encargados = lazy(() =>
  import('../../pages/admin/Encargados').then(m => ({ default: m.Encargados }))
);

const EncargadoAdminPage = lazy(() =>
  import('../../pages/admin/encargados/encargado').then(m => ({ default: m.EncargadoAdminPage }))
);

const Estadosorden = lazy(() =>
  import('../../pages/admin/Estadosorden').then(m => ({ default: m.Estadosorden }))
);

const EstadoordenAdminPage = lazy(() =>
  import('../../pages/admin/estadosorden/estadoorden').then(m => ({ default: m.EstadoordenAdminPage }))
);

const ProductsEsc = lazy(() =>
  import('../../pages/admin/productsesc').then(m => ({ default: m.ProductsEsc }))
);

const ProductEscAdminPage = lazy(() =>
  import('../../pages/admin/diligencias/productesc').then(m => ({ default: m.ProductEscAdminPage }))
);

const ProductsFac = lazy(() =>
  import('../../pages/admin/productsfac').then(m => ({ default: m.ProductsFac }))
);

const ProductFacAdminPage = lazy(() =>
  import('../../pages/admin/productsfac/productfac').then(m => ({ default: m.ProductFacAdminPage }))
);

const Comprobantes = lazy(() =>
  import('../../pages/admin/comprobantes').then(m => ({ default: m.Comprobantes }))
);

const Configuraciones = lazy(() =>
  import('../../pages/admin/Configuraciones').then(m => ({ default: m.Configuraciones }))
);

const ConfiguracionAdminPage = lazy(() =>
  import('../../pages/admin/configuraciones/configuracion').then(m => ({ default: m.ConfiguracionAdminPage }))
);

const ConfiguracionesEsc = lazy(() =>
  import('../../pages/admin/Configuracionesesc').then(m => ({ default: m.ConfiguracionesEsc }))
);

const ConfiguracionEscAdminPage = lazy(() =>
  import('../../pages/admin/configuraciones/configuracionesc').then(m => ({ default: m.ConfiguracionEscAdminPage }))
);

const Partes = lazy(() =>
  import('../../pages/admin/Partes').then(m => ({ default: m.Partes }))
);

const ParteAdminPage = lazy(() =>
  import('../../pages/admin/partes/parte').then(m => ({ default: m.ParteAdminPage }))
);

const UserAdminPage = lazy(() =>
  import('../../pages/admin/users/user').then(m => ({ default: m.UserAdminPage }))
);

const UserPerfilPage = lazy(() =>
  import('../../pages/admin/users/perfil').then(m => ({ default: m.UserPerfilPage }))
);

const UserPerfilAdmPage = lazy(() =>
  import('../../pages/admin/users/perfiladm').then(m => ({ default: m.UserPerfilAdmPage }))
);







const Users = lazy(() =>
  import('../../pages/admin/Users').then(m => ({ default: m.Users }))
);

const ForgetPassword = lazy(() =>
  import('../../pages/admin/users/forgetPassword').then(m => ({ default: m.ForgetPassword }))
);

const ResetPassword = lazy(() =>
  import('../../pages/admin/users/resetPassword').then(m => ({ default: m.ResetPassword }))
);

const Products = lazy(() =>
  import('../../pages/admin/products').then(m => ({ default: m.Products }))
);

const ProductAdminPage = lazy(() =>
  import('../../pages/admin/products/product').then(m => ({ default: m.ProductAdminPage }))
);

const Orders = lazy(() =>
  import('../../pages/admin/Orders').then(m => ({ default: m.Orders }))
);

const Order = lazy(() =>
  import('../../pages/admin/orders/Order').then(m => ({ default: m.Order }))
);


const ProductListPrint = lazy(() =>
  import('../../pages/listados/ProductListPrint').then(m => ({ default: m.ProductListPrint }))
);

const Precios = lazy(() =>
  import('../../pages/invoice/Precios').then(m => ({ default: m.Precios }))
);

const CajaIngEgrListScreen = lazy(() =>
  import('../../pages/listados/CajaIngEgrListScreen').then(m => ({ default: m.CajaIngEgrListScreen }))
);

const IngEgrListScreen = lazy(() =>
  import('../../pages/listados/IngEgrListScreen').then(m => ({ default: m.IngEgrListScreen }))
);

const AppCon = lazy(() =>
  import('../../pages/crmpages/AppCon').then(m => ({ default: m.AppCon }))
);

const AppBuyCon = lazy(() =>
  import('../../pages/crmpages/AppBuyCon').then(m => ({ default: m.AppBuyCon }))
);


//
const CtaCusListScreen = lazy(() =>
  import('../../pages/listados/CtaCusListScreen').then(m => ({ default: m.CtaCusListScreen }))
);

const CtaSupListScreen = lazy(() =>
  import('../../pages/listados/CtaSupListScreen').then(m => ({ default: m.CtaSupListScreen }))
);

const CusProListScreen = lazy(() =>
  import('../../pages/listados/CusProListScreen').then(m => ({ default: m.CusProListScreen }))
);

const SupProListScreen = lazy(() =>
  import('../../pages/listados/SupProListScreen').then(m => ({ default: m.SupProListScreen }))
);

const ProCusListScreen = lazy(() =>
  import('../../pages/listados/ProCusListScreen').then(m => ({ default: m.ProCusListScreen }))
);

const ProSupListScreen = lazy(() =>
  import('../../pages/listados/ProSupListScreen').then(m => ({ default: m.ProSupListScreen }))
);

const ProiyeListScreen = lazy(() =>
  import('../../pages/listados/ProiyeListScreen').then(m => ({ default: m.ProiyeListScreen }))
);

const AppRemCon = lazy(() =>
  import('../../pages/crmpages/AppRemCon').then(m => ({ default: m.AppRemCon }))
);

const AppRemBuyCon = lazy(() =>
  import('../../pages/crmpages/AppRemBuyCon').then(m => ({ default: m.AppRemBuyCon }))
);

const AppRempvCon = lazy(() =>
  import('../../pages/crmpages/AppRempvCon').then(m => ({ default: m.AppRempvCon }))
);

const AppBuyRempvCon = lazy(() =>
  import('../../pages/crmpages/AppBuyRempvCon').then(m => ({ default: m.AppBuyRempvCon }))
);

const AppRecCon = lazy(() =>
  import('../../pages/crmpages/AppRecCon').then(m => ({ default: m.AppRecCon }))
);

const AppBuyRecCon = lazy(() =>
  import('../../pages/crmpages/AppBuyRecCon').then(m => ({ default: m.AppBuyRecCon }))
);

const AppCajIngCon = lazy(() =>
  import('../../pages/crmpages/AppCajIngCon').then(m => ({ default: m.AppCajIngCon }))
);

const AppCajEgrCon = lazy(() =>
  import('../../pages/crmpages/AppCajEgrCon').then(m => ({ default: m.AppCajEgrCon }))
);
//






export default function AdminRoutes() {
  return (
    <Routes>
        <Route path="/admin/users" element={ <Users /> } />
        <Route path="/admin/products" element={ <Products /> } />
        <Route path="/admin/products/product/:slugadm" element={ <ProductAdminPage /> } />
        <Route path="/admin/orders/order/:id" element={ <Order /> } />
        <Route path="/admin/orders" element={ <Orders /> } />

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


    </Routes>
  );
}