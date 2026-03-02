import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookList from './components/BookList.jsx';
import BookForm from './components/BookForm.jsx';
function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Books</Link>
          <Link className="nav-link" to="/add">Add Book</Link>
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<BookForm />} />
          <Route path="/edit/:id" element={<BookForm editMode={true} />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
