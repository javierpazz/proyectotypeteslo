import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

const SalePointScreen = lazy(() =>
  import('../../pages/crmpages/SalePointScreen').then(m => ({ default: m.SalePointScreen }))
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

export default function CrmRoutes() {
  return (
    <Routes>
      <Route path="salepoint" element={<SalePointScreen />} />
      <Route path="invoices" element={<InvoiceListScreen />} />
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
        <Route path="/admin/entradas" element={ <EntradaListScreen /> } />
        {/* <Route path="/admin/entradasrst" element={ <EntradaRegSinTerListScreen /> } />
        <Route path="/admin/entradasnrst" element={ <EntradaNoRegSinTerListScreen /> } />
        <Route path="/admin/entradaspst" element={ <EntradaProSinTerListScreen /> } />
        <Route path="/admin/entradasnpst" element={ <EntradaNoProSinTerListScreen /> } /> */}
        <Route path="/admin/diligencias" element={ <DiligenciaListScreen /> } />

    </Routes>
  );
}