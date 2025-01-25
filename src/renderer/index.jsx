import React from 'react';
import { createRoot } from 'react-dom/client';
import Router from './Router';
import './styles/globals.css';

console.log('React app initializing...');

const container = document.getElementById('root');
if (!container) {
  console.error('Root element not found!');
} else {
  console.log('Root element found, creating React root...');
  const root = createRoot(container);
  console.log('Rendering Router component...');
  root.render(<Router />);
} 