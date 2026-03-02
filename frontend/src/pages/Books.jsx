import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Footer from '../components/Footer.jsx';
export default function Books() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <main>Books Page</main>
      <Footer />
    </div>
  );
}
