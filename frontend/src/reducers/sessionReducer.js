import { LOGIN, LOGOUT } from '../actions/actions.js';

const _defaultSession = Boolean(sessionStorage.token);

const sessionReducer = (state = _defaultSession, action) => {
  switch(action.type) {
    case LOGIN: 
      return Boolean(sessionStorage.token);
    case LOGOUT: 
      sessionStorage.removeItem('token');
      return false;
    default:
      return state;
  }
};
export default sessionReducer;