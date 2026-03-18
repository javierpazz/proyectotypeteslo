import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

const AppInvOrd = lazy(() =>
  import('../../pages/invoice/AppInvOrd').then(m => ({ default: m.AppInvOrd }))
);

const AppInvRem = lazy(() =>
  import('../../pages/invoice/AppInvRem').then(m => ({ default: m.AppInvRem }))
);

const AppInvIns = lazy(() =>
  import('../../pages/invoice/AppInvIns').then(m => ({ default: m.AppInvIns }))
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

const MesaEntrada = lazy(() =>
  import('../../pages/invoice/MesaEntrada').then(m => ({ default: m.MesaEntrada }))
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

const ParamInstrumento = lazy(() =>
  import('../../pages/invoice/ParamInstrumento').then(m => ({ default: m.ParamInstrumento }))
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


export default function InvoiceRoutes() {
  return (
    <Routes>
      <Route path="invoicerord/:id" element={<AppInvOrd />} />
      <Route path="invoicerrem/:id" element={<AppInvRem />} />
      <Route path="invoicerins/:id" element={<AppInvIns />} />
      <Route path="invoicer" element={<App />} />
      <Route path="invoicerBuy" element={<AppBuy />} />
      <Route path="remiter" element={<AppRem />} />
        <Route path="/admin/mesaentrada" element={ <MesaEntrada /> } />
        <Route path="/admin/mesaentradaAct/:id" element={ <MesaEntradaAct /> } />
        <Route path="/admin/mesaentradaVal/:id" element={ <MesaEntradaVal /> } />
        <Route path="/admin/entrada/:id" element={ <MesaEntradaCon /> } />
        <Route path="/admin/paraminstrumento" element={ <ParamInstrumento /> } />
        <Route path="/admin/filtro" element={ <Filtro /> } />
        <Route path="/admin/filtrocrm" element={ <FiltroCrm /> } />

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


    </Routes>
  );
}