import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './components/App';
import Settings from './pages/Settings';

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </HashRouter>
  );
} 