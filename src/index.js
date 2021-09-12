import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { setSideBarState } from './utils/state_manager';

setSideBarState();
ReactDOM.render(
  <React>
    <App />
  </React>,
  document.getElementById('root')
);
