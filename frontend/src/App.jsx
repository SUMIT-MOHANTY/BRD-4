import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
function App() {
  return (
    <div>
      <nav><Link to="/">Home</Link></nav>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
export default App;
