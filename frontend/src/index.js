import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/store';

import routes from './routes';

const store = configureStore();
window.store = store;

ReactDOM.render( 
  <Provider store={store}>
    <Router>
      {routes}
    </Router>
  </ Provider>, 
  document.getElementById('root'));
