import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import App from './App';

import './index.module.scss';

// const root = createRoot(document.querySelector('#app') as HTMLElement);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
ReactDOM.hydrate(<App />, document.querySelector('#app'));
