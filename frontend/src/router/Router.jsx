import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import Login from '../pages/Login.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Books from '../pages/Books.jsx';
import Members from '../pages/Members.jsx';
export default function Router() { return (
  <Routes>
    <Route path='/login' element={<Login />} />
    <Route element={<ProtectedRoute />}>
      <Route path='/' element={<Dashboard />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/books' element={<Books />} />
      <Route path='/members' element={<Members />} />
    </Route>
  </Routes>
); }
