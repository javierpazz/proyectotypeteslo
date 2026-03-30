import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';


const Instrumentos = lazy(() =>
  import('../../pages/admin/Instrumentos').then(m => ({ default: m.Instrumentos }))
);

const InstrumentoAdminPage = lazy(() =>
  import('../../pages/admin/instrumentos/instrumento').then(m => ({ default: m.InstrumentoAdminPage }))
);

const Trabajos = lazy(() =>
  import('../../pages/admin/Trabajos').then(m => ({ default: m.Trabajos }))
);
const TrabajoAdminPage = lazy(() =>
  import('../../pages/admin/instrumentos/trabajo').then(m => ({ default: m.TrabajoAdminPage }))
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

const ProductsSer = lazy(() =>
  import('../../pages/admin/productsser').then(m => ({ default: m.ProductsSer }))
);

const ProductSerAdminPage = lazy(() =>
  import('../../pages/admin/diligencias/productser').then(m => ({ default: m.ProductSerAdminPage }))
);

const ProductsFac = lazy(() =>
  import('../../pages/admin/productsfac').then(m => ({ default: m.ProductsFac }))
);

const ProductFacAdminPage = lazy(() =>
  import('../../pages/admin/productsfac/productfac').then(m => ({ default: m.ProductFacAdminPage }))
);
const Maquinas = lazy(() =>
  import('../../pages/admin/Maquinas').then(m => ({ default: m.Maquinas }))
);
const MaquinaAdminPage = lazy(() =>
  import('../../pages/admin/maquinas/maquina').then(m => ({ default: m.MaquinaAdminPage }))
);

const Comprobantes = lazy(() =>
  import('../../pages/admin/Comprobantes').then(m => ({ default: m.Comprobantes }))
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


const Dashboard = lazy(() =>
  import('../../pages/admin/Dashboard').then(m => ({ default: m.Dashboard }))
);

const DashboardEsc = lazy(() =>
  import('../../pages/admin/DashboardEsc').then(m => ({ default: m.DashboardEsc }))
);

const DashboardSer = lazy(() =>
  import('../../pages/admin/DashboardSer').then(m => ({ default: m.DashboardSer }))
);
const DashboardSerMaq = lazy(() =>
  import('../../pages/admin/DashboardSerMaq').then(m => ({ default: m.DashboardSerMaq }))
);

const DashboardSerPar = lazy(() =>
  import('../../pages/admin/DashboardSerPar').then(m => ({ default: m.DashboardSerPar }))
);
const DashboardSerTar = lazy(() =>
  import('../../pages/admin/DashboardSerTar').then(m => ({ default: m.DashboardSerTar }))
);



const MesaEntrada = lazy(() =>
  import('../../pages/invoice/MesaEntrada').then(m => ({ default: m.MesaEntrada }))
);

const OrdenTrabajo = lazy(() =>
  import('../../pages/invoice/OrdenTrabajo').then(m => ({ default: m.OrdenTrabajo }))
);

const OrdenTrabajoCon = lazy(() =>
  import('../../pages/invoice/OrdenTrabajoCon').then(m => ({ default: m.OrdenTrabajoCon }))
);
const OrdenTrabajoAct = lazy(() =>
  import('../../pages/invoice/OrdenTrabajoAct').then(m => ({ default: m.OrdenTrabajoAct }))
);
const MesaEntradaAct = lazy(() =>
  import('../../pages/invoice/MesaEntradaAct').then(m => ({ default: m.MesaEntradaAct }))
);

const MesaEntradaVal = lazy(() =>
  import('../../pages/invoice/MesaEntradaVal').then(m => ({ default: m.MesaEntradaVal }))
);

const MesaEntradaCon = lazy(() =>
  import('../../pages/invoice/MesaEntradaCon').then(m => ({ default: m.MesaEntradaCon }))
);

const Filtro = lazy(() =>
  import('../../pages/invoice/Filtro').then(m => ({ default: m.Filtro }))
);

const FiltroCrm = lazy(() =>
  import('../../pages/invoice/FiltroCrm').then(m => ({ default: m.FiltroCrm }))
);

const FiltroSer = lazy(() =>
  import('../../pages/invoice/FiltroSer').then(m => ({ default: m.FiltroSer }))
);

const ParamInstrumento = lazy(() =>
  import('../../pages/invoice/ParamInstrumento').then(m => ({ default: m.ParamInstrumento }))
);

const ParamTrabajo = lazy(() =>
  import('../../pages/invoice/ParamTrabajo').then(m => ({ default: m.ParamTrabajo }))
);


const AppRemBuy = lazy(() =>
  import('../../pages/invoice/AppRemBuy').then(m => ({ default: m.AppRemBuy }))
);

const AppRempv = lazy(() =>
  import('../../pages/invoice/AppRempv').then(m => ({ default: m.AppRempv }))
);

const AppRemBuypv = lazy(() =>
  import('../../pages/invoice/AppRemBuypv').then(m => ({ default: m.AppRemBuypv }))
);

const AppRec = lazy(() =>
  import('../../pages/invoice/AppRec').then(m => ({ default: m.AppRec }))
);

const AppRecBuy = lazy(() =>
  import('../../pages/invoice/AppRecBuy').then(m => ({ default: m.AppRecBuy }))
);

const AppCajIng = lazy(() =>
  import('../../pages/invoice/AppCajIng').then(m => ({ default: m.AppCajIng }))
);

const AppCajEgr = lazy(() =>
  import('../../pages/invoice/AppCajEgr').then(m => ({ default: m.AppCajEgr }))
);

const AppInvOrd = lazy(() =>
  import('../../pages/invoice/AppInvOrd').then(m => ({ default: m.AppInvOrd }))
);

const AppInvRem = lazy(() =>
  import('../../pages/invoice/AppInvRem').then(m => ({ default: m.AppInvRem }))
);

const AppInvIns = lazy(() =>
  import('../../pages/invoice/AppInvIns').then(m => ({ default: m.AppInvIns }))
);
const AppInvSer = lazy(() =>
  import('../../pages/invoice/AppInvSer').then(m => ({ default: m.AppInvSer }))
);

const App = lazy(() =>
  import('../../pages/invoice/App').then(m => ({ default: m.App }))
);

const AppBuy = lazy(() =>
  import('../../pages/invoice/AppBuy').then(m => ({ default: m.AppBuy }))
);

const AppRem = lazy(() =>
  import('../../pages/invoice/AppRem').then(m => ({ default: m.AppRem }))
);


const InvoiceListScreen = lazy(() =>
  import('../../pages/crmpages/InvoiceListScreen').then(m => ({ default: m.InvoiceListScreen }))
);

const RemitListScreen = lazy(() =>
  import('../../pages/crmpages/RemitListScreen').then(m => ({ default: m.RemitListScreen }))
);

const CajaIngListScreen = lazy(() =>
  import('../../pages/crmpages/CajaIngListScreen').then(m => ({ default: m.CajaIngListScreen }))
);

const CajaEgrListScreen = lazy(() =>
  import('../../pages/crmpages/CajaEgrListScreen').then(m => ({ default: m.CajaEgrListScreen }))
);

const ReceiptListScreen = lazy(() =>
  import('../../pages/crmpages/ReceiptListScreen').then(m => ({ default: m.ReceiptListScreen }))
);

const ReceiptBuyListScreen = lazy(() =>
  import('../../pages/crmpages/ReceiptBuyListScreen').then(m => ({ default: m.ReceiptBuyListScreen }))
);

const RemitpvListScreen = lazy(() =>
  import('../../pages/crmpages/RemitpvListScreen').then(m => ({ default: m.RemitpvListScreen }))
);

const InvoiceBuyListScreen = lazy(() =>
  import('../../pages/crmpages/InvoiceBuyListScreen').then(m => ({ default: m.InvoiceBuyListScreen }))
);

const RemitBuyListScreen = lazy(() =>
  import('../../pages/crmpages/RemitBuyListScreen').then(m => ({ default: m.RemitBuyListScreen }))
);

const RemitBuypvListScreen = lazy(() =>
  import('../../pages/crmpages/RemitBuypvListScreen').then(m => ({ default: m.RemitBuypvListScreen }))
);

const EntradaListScreen = lazy(() =>
  import('../../pages/crmpages/EntradaListScreen').then(m => ({ default: m.EntradaListScreen }))
);

const DiligenciaListScreen = lazy(() =>
  import('../../pages/crmpages/DiligenciaListScreen').then(m => ({ default: m.DiligenciaListScreen }))
);
const OrdenTraListScreen = lazy(() =>
  import('../../pages/crmpages/OrdenTraListScreen').then(m => ({ default: m.OrdenTraListScreen }))
);

const TareaListScreen = lazy(() =>
  import('../../pages/crmpages/TareaListScreen').then(m => ({ default: m.TareaListScreen }))
);

export default function AdminRoutes() {
  return (
    <Routes>
                            <Route path="dashboard" element={ <Dashboard /> } />
                            <Route path="dashboardesc" element={ <DashboardEsc /> } />
                            <Route path="dashboardser" element={ <DashboardSer /> } />
                            <Route path="dashboardsermaq" element={ <DashboardSerMaq /> } />
                            <Route path="dashboardserpar" element={ <DashboardSerPar /> } />
                            <Route path="dashboardsertar" element={ <DashboardSerTar /> } />
                            <Route path="users" element={ <Users /> } />
                            <Route path="products" element={ <Products /> } />
                            <Route path="products/product/:slugadm" element={ <ProductAdminPage /> } />
                            <Route path="orders/order/:id" element={ <Order /> } />
                            <Route path="orders" element={ <Orders /> } />


                            <Route path="invoicerord/:id" element={ <AppInvOrd />  }/>
                            <Route path="invoicerrem/:id" element={ <AppInvRem />  }/>
                            <Route path="invoicerins/:id" element={ <AppInvIns />  }/>
                            <Route path="invoicerser/:id" element={ <AppInvSer />  }/>
                            <Route path="invoicer" element={ <App />  }/>
                            <Route path="remiter" element={ <AppRem />  }/>
                            <Route path="remiterpv" element={ <AppRempv />  }/>
                            <Route path="invoicerBuy" element={ <AppBuy />  }/>
                            <Route path="remiterBuy" element={ <AppRemBuy />  }/>
                            <Route path="remiterBuypv" element={ <AppRemBuypv />  }/>
                            <Route path="invoicerRec" element={ <AppRec />  }/>
                            <Route path="invoicerBuyRec" element={ <AppRecBuy />  }/>
                            <Route path="invoicerCajIng" element={ <AppCajIng />  }/>
                            <Route path="invoicerCajEgr" element={ <AppCajEgr />  }/>

                            <Route path="productsList" element={<ProductListPrint /> }/>
                            <Route path="precios" element={<Precios /> }/>
                            <Route path="invoicesCajIngEgr" element={ <CajaIngEgrListScreen /> } />
                            <Route path="informe/IngEgr" element={ <IngEgrListScreen /> } />
                            <Route path="informe/ctacus" element={ <CtaCusListScreen /> } />
                            <Route path="informe/ctasup" element={ <CtaSupListScreen /> } />
                            <Route path="informe/cuspro" element={ <CusProListScreen /> } />
                            <Route path="informe/suppro" element={ <SupProListScreen /> } />
                            <Route path="informe/procus" element={ <ProCusListScreen /> } />
                            <Route path="informe/prosup" element={ <ProSupListScreen /> } />
                            <Route path="informe/proiye" element={ <ProiyeListScreen /> } />



                            <Route path="invoicerRemCon/:id" element={ <AppRemCon />  }/>
                            <Route path="invoicerRemBuyCon/:id" element={ <AppRemBuyCon />  }/>
                            <Route path="invoicerRempvCon/:id" element={ <AppRempvCon />  }/>
                            <Route path="invoicerBuyRempvCon/:id" element={ <AppBuyRempvCon />  }/>
                            <Route path="invoicerCon/:id" element={ <AppCon />  }/>
                            <Route path="invoicerBuyCon/:id" element={ <AppBuyCon />  }/>
                            <Route path="invoicerRecCon/:id" element={ <AppRecCon />  }/>
                            <Route path="invoicerBuyRecCon/:id" element={ <AppBuyRecCon />  }/>
                            <Route path="invoicerCajIngCon/:id" element={ <AppCajIngCon />  }/>
                            <Route path="invoicerCajEgrCon/:id" element={ <AppCajEgrCon />  }/>

                            {/* <Route path="invoicesCajIngEgr" element={ <CajaIngEgrListScreen />  }/> */}

                            <Route path="invoices" element={ <InvoiceListScreen /> } />
                            <Route path="remits" element={ <RemitListScreen /> } />
                            <Route path="invoicesBuy" element={ <InvoiceBuyListScreen /> } />
                            <Route path="remitsBuy" element={ <RemitBuyListScreen /> } />
                            <Route path="remitspv" element={ <RemitpvListScreen /> } />
                            <Route path="invoicesCajIng" element={ <CajaIngListScreen /> } />
                            <Route path="invoicesCajEgr" element={ <CajaEgrListScreen /> } />
                            <Route path="invoicesRec" element={ <ReceiptListScreen /> } />
                            <Route path="invoicesBuyRec" element={ <ReceiptBuyListScreen /> } />
                            <Route path="remitsBuypv" element={ <RemitBuypvListScreen /> } />

                            <Route path="mesaentrada" element={ <MesaEntrada /> } />
                            <Route path="entrada/:id" element={ <MesaEntradaCon /> } />
                            <Route path="mesaentradaAct/:id" element={ <MesaEntradaAct /> } />
                            <Route path="mesaentradaVal/:id" element={ <MesaEntradaVal /> } />
                            <Route path="entradas" element={ <EntradaListScreen /> } />
                            <Route path="diligencias" element={ <DiligenciaListScreen /> } />

                            <Route path="ordentrabajo" element={ <OrdenTrabajo /> } />
                            <Route path="ordentrabajo/:id" element={ <OrdenTrabajoCon /> } />
                            <Route path="ordenestrabajo" element={ <OrdenTraListScreen /> } />
                            <Route path="ordentrabajoAct/:id" element={ <OrdenTrabajoAct /> } />
                            <Route path="tareas" element={ <TareaListScreen /> } />

                            <Route path="paraminstrumento" element={ <ParamInstrumento /> } />
                            <Route path="paramtrabajo" element={ <ParamTrabajo /> } />
                            <Route path="instrumentos" element={ <Instrumentos /> } />
                            <Route path="instrumentos/instrumento/:id" element={ <InstrumentoAdminPage /> } />
                            <Route path="trabajos" element={ <Trabajos /> } />
                            <Route path="instrumentos/trabajo/:id" element={ <TrabajoAdminPage /> } />
                            <Route path="customers" element={ <Customers /> } />
                            <Route path="customers/customer/:id" element={ <CustomerAdminPage /> } />
                            <Route path="comprobantes/comprobante/:id" element={ <ComprobanteAdminPage /> } />
                            <Route path="proveedores" element={ <Proveedores /> } />
                            <Route path="proveedores/proveedor/:id" element={ <ProveedorAdminPage /> } />
                            <Route path="valores" element={ <Valores /> } />
                            <Route path="valores/valor/:id" element={ <ValorAdminPage /> } />
                            <Route path="encargados" element={ <Encargados /> } />
                            <Route path="encargados/encargado/:id" element={ <EncargadoAdminPage /> } />
                            <Route path="estadosorden" element={ <Estadosorden /> } />
                            <Route path="estadosorden/estadoorden/:id" element={ <EstadoordenAdminPage /> } />
                            <Route path="productsesc" element={ <ProductsEsc /> } />
                            <Route path="productsesc/productesc/:slugadm" element={ <ProductEscAdminPage /> } />
                            <Route path="productsser" element={ <ProductsSer /> } />
                            <Route path="productsesc/productser/:slugadm" element={ <ProductSerAdminPage /> } />
                            <Route path="productsfac" element={ <ProductsFac /> } />
                            <Route path="productsfac/productfac/:slugadm" element={ <ProductFacAdminPage /> } />
                            <Route path="maquinas" element={ <Maquinas /> } />
                            <Route path="maquinas/maquina/:id" element={ <MaquinaAdminPage /> } />
                            <Route path="comprobantes" element={ <Comprobantes /> } />
                            <Route path="configuraciones" element={ <Configuraciones /> } />
                            <Route path="configuraciones/configuracion/:id" element={ <ConfiguracionAdminPage /> } />
                            <Route path="configuracionesesc" element={ <ConfiguracionesEsc /> } />
                            <Route path="configuraciones/configuracionesc/:id" element={ <ConfiguracionEscAdminPage /> } />
                            <Route path="partes" element={ <Partes /> } />
                            <Route path="partes/parte/:id" element={ <ParteAdminPage /> } />
                            <Route path="users/forgetPasword" element={ <ForgetPassword /> } />
                            <Route path="users" element={ <Users /> } />
                            <Route path="users/user/:id" element={ <UserAdminPage /> } />
                            <Route path="profile/:id" element={ <UserPerfilPage /> } />
                            <Route path="profileadm" element={ <UserPerfilAdmPage /> } />
                            <Route path="filtro" element={ <Filtro /> } />
                            <Route path="filtrocrm" element={ <FiltroCrm /> } />
                            <Route path="filtroser" element={ <FiltroSer /> } />



    </Routes>
  );
}