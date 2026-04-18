import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Guards
// import { AdminGuard } from './guards/AdminGuard';
import { AuthGuard } from './guards/AuthGuard';
import { GuestGuard } from './guards/GuestGuard';
// import AdminDashRoutes from '../modulos/admin/AdminDashRoutes';

// módulos lazy
const AuthRoutes = lazy(() => import('../modulos/auth/AuthRoutes'));
const EcommerceRoutes = lazy(() => import('../modulos/ecommerce/EcommerceRoutes'));
const AdminRoutes = lazy(() => import('../modulos/admin/AdminRoutes'));

export const AppRouter = () => {
  return (
    <Suspense fallback={<div>Cargando aplicación...</div>}>

      <Routes>


        {/* 🔓 AUTH (solo invitados) */}
        <Route element={<GuestGuard />}>
          <Route
            path="/auth/*"
            element={
              <Suspense fallback={<div>Cargando auth...</div>}>
                <AuthRoutes />
              </Suspense>
            }
          />
        </Route>

        {/* 🔐 AUTH (solo logueados) */}
        <Route element={<AuthGuard />}>
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<div>Cargando...</div>}>
                <AdminRoutes />
              </Suspense>
            }
          />
        </Route>

        {/* 🔐 AUTH (solo logueados) */}
        {/* <Route element={<AuthGuard />}>
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<div>Cargando...</div>}>
                <AdminDashRoutes />
              </Suspense>
            }
          />
        </Route> */}

        {/* 🛒 ECOMMERCE (público, pero adentro protegés lo necesario) */}
        <Route
          path="/*"
          element={
            <Suspense fallback={<div>Cargando tienda...</div>}>
              <EcommerceRoutes />
            </Suspense>
          }
        />

      </Routes>

    </Suspense>
  );
};