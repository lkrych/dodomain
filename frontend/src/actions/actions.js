import * as APIUtil from '../util/api_util';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const RECEIVE_DOMAINS = 'RECEIVE_DOMAINS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

const receiveDomains = (domains) => (
  {
    type: RECEIVE_DOMAINS,
    domains
  }
);

const logIn = (errors) => (
  {
    type: LOGIN,
    errors
  }
);

const logOut = () => (
  {
    type: LOGOUT
  }
);

const clearErrors = () => (
  {
    type: CLEAR_ERRORS
  }
);

export const submitDomain = (domainInfo, dispatch) => (
  APIUtil.submitDomain(domainInfo).then(
    domains => dispatch(receiveDomains(domains))
  )
);

export const fetchDomains = (sortState, dispatch) => (
  APIUtil.fetchDomains(sortState).then(
    domains => dispatch(receiveDomains(domains))
  )
);

export const login = (loginInfo, dispatch) => (
  APIUtil.login(loginInfo).then( errors => dispatch(logIn(errors))
));

export const logout = (dispatch) => (
  dispatch(logOut())
);

export const signUp = (signupInfo, dispatch) => (
  APIUtil.signUp(signupInfo).then( errors => dispatch(logIn(errors))
));

export const clearErrorsState = (dispatch) => (
  dispatch(clearErrors())
);
