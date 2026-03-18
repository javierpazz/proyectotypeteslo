import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';

// const Login = lazy(() => import('../../pages/auth/Login'));
// const LoginAdm = lazy(() => import('../../pages/auth/LoginAdm'));
// const Register = lazy(() => import('../../pages/auth/Register'));

const Login = lazy(() =>
  import('../../pages/auth/Login').then(m => ({ default: m.Login }))
);

const LoginAdm = lazy(() =>
  import('../../pages/auth/LoginAdm').then(m => ({ default: m.LoginAdm }))
);

const Register = lazy(() =>
  import('../../pages/auth/Register').then(m => ({ default: m.Register }))
);

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="loginadm" element={<LoginAdm />} />
      <Route path="register" element={<Register />} />
      <Route path="/*" element={<Navigate to="loginadm" />} />
    </Routes>
  );
}