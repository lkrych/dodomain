import { combineReducers } from 'redux';

import domainReducer from './domainReducer';
import sessionReducer from './sessionReducer';
import errorsReducer from './errorsReducer';


const RootReducer = combineReducers({
  domains: domainReducer,
  session: sessionReducer,
  errors: errorsReducer
});

export default RootReducer;