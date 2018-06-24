import { combineReducers } from 'redux';

import domainReducer from './domainReducer';
import sessionReducer from './sessionReducer';


const RootReducer = combineReducers({
  domains: domainReducer,
  session: sessionReducer
});

export default RootReducer;