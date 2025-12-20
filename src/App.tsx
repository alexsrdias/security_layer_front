import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import Rules from './pages/Rules/Rules.tsx';
import Versions from './pages/Versions/Versions.tsx';
import Login from './pages/Login/Login.tsx';
import Settings from './pages/Settings/Settings.tsx';
import Objects from './pages/Objects/Objects.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="rules" element={<Rules />} />
            <Route path="versions" element={<Versions />} />
            <Route path="objects" element={<Objects />} />
            <Route path="groups" element={<div>Groups Page (Coming Soon)</div>} />
            <Route path="chains" element={<div>Chains Page (Coming Soon)</div>} />
            <Route path="logs" element={<div>Logs Page (Coming Soon)</div>} />
            <Route path="reports" element={<div>Reports Page (Coming Soon)</div>} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
