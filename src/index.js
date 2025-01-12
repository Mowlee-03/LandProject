import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './components/theme-provider';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Store/Store';
import { UserProvider } from './Store/Provider/Userprovider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Provider store={store}>
          <UserProvider>
              <App />
          </UserProvider>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);


