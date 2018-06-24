import * as APIUtil from '../util/api_util';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const RECEIVE_DOMAINS = 'RECEIVE_DOMAINS';

const receiveDomains = (domains) => (
  {
    type: RECEIVE_DOMAINS,
    domains
  }
);

const logIn = () => (
  {
    type: LOGIN
  }
);

const logOut = () => (
  {
    type: LOGOUT
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
  APIUtil.login(loginInfo).then( () => dispatch(logIn())
));

export const logout = (dispatch) => (
  dispatch(logOut())
);

export const signUp = (signupInfo, dispatch) => (
  APIUtil.signUp(signupInfo).then( () => dispatch(logIn())
));
