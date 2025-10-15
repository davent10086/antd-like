import React from 'react';
import ReactDOM from 'react-dom/client';
import BasicFormDemo from './components/form/demo/basic';
import './components/form/style/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BasicFormDemo />
  </React.StrictMode>,
);