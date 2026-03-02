import { AuthProvider } from './context/AuthContext.jsx';
import Router from './router/Router.jsx';
export default function App() { return (
  <AuthProvider><Router /></AuthProvider>
); }
