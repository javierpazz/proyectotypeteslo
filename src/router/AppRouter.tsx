import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// módulos lazy

const AuthRoutes = lazy(() => import('../modulos/auth/AuthRoutes'));
const EcommerceRoutes = lazy(() => import('../modulos/ecommerce/EcommerceRoutes'));
const AdminRoutes = lazy(() => import('../modulos/admin/AdminRoutes'));

export const AppRouter = () => {
  return (
    <Suspense fallback={<div>Cargando aplicación...</div>}>

      <Routes>
        <Route
          path="/auth/*"
          element={
            <Suspense fallback={<div>Cargando ...</div>}>
              <AuthRoutes />
            </Suspense>
          }
        />

        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<div>Cargando ...</div>}>
              <AdminRoutes />
            </Suspense>
          }
        />


        <Route
          path="/*"
          element={
            <Suspense fallback={<div>Cargando ...</div>}>
              <EcommerceRoutes />
            </Suspense>
          }
        />
      </Routes>

    </Suspense>
  );
};