import React from 'react';
import './Header.css';
import Topbar from '../Topbar/Topbar';
import Navbar from '../Navbar/Navbar';

export default function Header() {
  return (
    <header className="header">
      <Topbar />
      <Navbar />
    </header>
  );
}
