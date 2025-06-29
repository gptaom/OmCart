import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ Import this
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import './index.css';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter> {/* ✅ Wrap your App */}
        <App />
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
