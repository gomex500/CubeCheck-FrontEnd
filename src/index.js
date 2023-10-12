import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import Menu from './views/partials/Menu';
import './css/main.css';


import { Provider } from 'react-redux';
import { Store } from './store/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={ Store }>
      <BrowserRouter>
        <Menu/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);