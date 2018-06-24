import { createStore } from 'redux';

import RootReducer from '../reducers/rootReducer.js';

// this file sets up the redux store. this function is used in index.js
// and the store is passed down into the components in App.js

const configureStore = (preloadedState = {}) => (
  createStore(
    RootReducer,
    preloadedState
  )
);

export default configureStore;
