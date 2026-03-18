import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';




const Dashboard = lazy(() =>
  import('../../pages/admin/Dashboard').then(m => ({ default: m.Dashboard }))
);

const Dashboard1 = lazy(() =>
  import('../../pages/admin/Dashboard').then(m => ({ default: m.Dashboard1 }))
);

const Dashboard1Esc = lazy(() =>
  import('../../pages/admin/DashboardEsc').then(m => ({ default: m.Dashboard1Esc }))
);
export default function DashRoutes() {
  return (
    <Routes>
        <Route path="/admin/dashboard" element={ <Dashboard /> } />
        {/* <Route path="/admin/dashboardesc" element={ <DashboardEsc /> } /> */}
        <Route path="/admin/dashboard1" element={ <Dashboard1 /> } />
        <Route path="/admin/dashboard1esc" element={ <Dashboard1Esc /> } />
 

    </Routes>
  );
}