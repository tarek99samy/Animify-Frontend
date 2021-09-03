import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { setSideBarState } from '../src/utils/state_manager';
setSideBarState();
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
