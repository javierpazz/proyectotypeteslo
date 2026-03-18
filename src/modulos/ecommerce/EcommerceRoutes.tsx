import { Navigate, Route, Routes } from 'react-router-dom';

import { lazy } from 'react';

const Slug = lazy(() =>
  import('../../pages/product/Slug').then(m => ({ default: m.Slug }))
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

const Invoice = lazy(() =>
  import('../../pages/Invoice').then(m => ({ default: m.Invoice }))
);

const Escribania = lazy(() =>
  import('../../pages/Escribania').then(m => ({ default: m.Escribania }))
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
        <Route path="/factura" element={ <Invoice /> } />
        <Route path="/escribania" element={ <Escribania /> } />
        <Route path="/checkout/address" element={ <Address /> } />
        <Route path="/checkout/summary" element={ <Summary /> } />
        <Route path="/salepoint" element={ <SalePointScreen /> }/>


        <Route path="/orders/history" element={ <History /> } />
        <Route path="/orders/:id" element={ <OrderPage /> } />
        <Route path="product/:slug" element={<Slug />} />
        <Route path="search/:query" element={<Query />} />
        <Route path="/cart/empty" element={ <EmptyPage /> } />
        <Route path="/cart" element={ <CartPage /> } />
        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  );
}