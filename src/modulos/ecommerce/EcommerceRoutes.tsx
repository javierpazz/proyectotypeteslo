import { Navigate, Route, Routes } from 'react-router-dom';

import { lazy } from 'react';

const Slug = lazy(() =>
  import('../../pages/product/Slug').then(m => ({ default: m.Slug }))
);
const NameInstrumento = lazy(() =>
  import('../../pages/instrumento/NameInstrumento').then(m => ({ default: m.NameInstrumento }))
);

const Query = lazy(() =>
  import('../../pages/search/Query').then(m => ({ default: m.Query }))
);

const EmptyPage = lazy(() =>
  import('../../pages/cart/EmptyPage').then(m => ({ default: m.EmptyPage }))
);

const Address = lazy(() =>
  import('../../pages/checkout/Address').then(m => ({ default: m.Address }))
);

const Summary = lazy(() =>
  import('../../pages/checkout/Summary').then(m => ({ default: m.Summary }))
);

const History = lazy(() =>
  import('../../pages/orders/History').then(m => ({ default: m.History }))
);

const CartPage = lazy(() =>
  import('../../pages/cart/CartPage').then(m => ({ default: m.CartPage }))
);

const Blanco = lazy(() =>
  import('../../pages/Blanco').then(m => ({ default: m.Blanco }))
);

const Ecommerce = lazy(() =>
  import('../../pages/Ecommerce').then(m => ({ default: m.Ecommerce }))
);
const Eservice = lazy(() =>
  import('../../pages/Eservice').then(m => ({ default: m.Eservice }))
);

const Invoice = lazy(() =>
  import('../../pages/Invoice').then(m => ({ default: m.Invoice }))
);

const Escribania = lazy(() =>
  import('../../pages/Escribania').then(m => ({ default: m.Escribania }))
);

const Servicio = lazy(() =>
  import('../../pages/Servicio').then(m => ({ default: m.Servicio }))
);

const OrderPage = lazy(() =>
  import('../../pages/orders/OrderPage').then(m => ({ default: m.OrderPage }))
);

const SalePointScreen = lazy(() =>
  import('../../pages/crmpages/SalePointScreen').then(m => ({ default: m.SalePointScreen }))
);
export default function EcommerceRoutes() {
  return (
    <Routes>
        <Route path="/blanco" element={ <Blanco /> } />
        <Route path="/" element={ <Ecommerce /> } />
        <Route path="/pedidoservice" element={ <Eservice /> } />
        <Route path="/factura" element={ <Invoice /> } />
        <Route path="/escribania" element={ <Escribania /> } />
        <Route path="/servicio" element={ <Servicio /> } />
        <Route path="/checkout/address" element={ <Address /> } />
        <Route path="/checkout/summary" element={ <Summary /> } />
        <Route path="/salepoint" element={ <SalePointScreen /> }/>


        <Route path="/orders/history" element={ <History /> } />
        <Route path="/orders/:id" element={ <OrderPage /> } />
        <Route path="product/:slug" element={<Slug />} />
        <Route path="instrumento/:_id" element={<NameInstrumento />} />
        <Route path="search/:query" element={<Query />} />
        <Route path="/cart/empty" element={ <EmptyPage /> } />
        <Route path="/cart" element={ <CartPage /> } />
        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  );
}