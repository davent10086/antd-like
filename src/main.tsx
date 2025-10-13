import React from 'react';
import ReactDOM from 'react-dom/client';
import ButtonDemo from './components/button/demo/basic';
import './components/button/style/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ButtonDemo />
  </React.StrictMode>,
);