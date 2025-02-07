import { Route, Routes } from 'react-router';
import MainDashboard from './main-dashboard/Main-Dashboard';
import IdeasDashboard from './ideas-dashboard/IdeasDashboard';
import AppHeader from './components/AppHeader/AppHeader';

const AppLayout = () => {
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/main-dashboard/*" element={<MainDashboard />} />
        <Route path="/ideas-dashboard/*" element={<IdeasDashboard />} />
      </Routes>
    </>
  );
};

export default AppLayout;
