import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Layout from './Layout';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Layout>
      <img
        className='h-28 w-full pt-6'
        alt='NETZSCH Exchange logo'
        src='logo.svg'
      />
    <App />
    </Layout>
  </React.StrictMode>
);
