import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import './index.module.scss';

const root = createRoot(document.querySelector('#app') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
