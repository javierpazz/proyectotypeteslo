import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';


const Login = lazy(() =>
  import('../../pages/auth/Login').then(m => ({ default: m.Login }))
);

const LoginAdm = lazy(() =>
  import('../../pages/auth/LoginAdm').then(m => ({ default: m.LoginAdm }))
);

const Register = lazy(() =>
  import('../../pages/auth/Register').then(m => ({ default: m.Register }))
);

const ResetPassword = lazy(() =>
  import('../../pages/admin/users/resetPassword').then(m => ({ default: m.ResetPassword }))
);




export default function AuthRoutes() {
  return (
    <Suspense fallback={<div>Cargando páginas auth...</div>}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="loginadm" element={<LoginAdm />} />
        <Route path="register" element={<Register />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/*" element={<Navigate to="loginadm" />} />
      </Routes>
    </Suspense>
  );
}