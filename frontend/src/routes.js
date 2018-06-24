
import React from 'react';
import { Route } from 'react-router';
import App from './containers/AppContainer.js';
import HomePage from './components/HomePage';
import LogInForm from './containers/LoginFormContainer.js';
import SignUpForm from './containers/SignUpFormContainer.js';
import IndexView from './containers/IndexViewContainer.js';
import SubmitDomain from './containers/SubmitDomainContainer.js';
import auth from './auth/auth';

export default (
  <div>
    <Route path="/" component={App} />
    <Route path="/login" component={LogInForm} />
    <Route path="/signup" component={SignUpForm} />
    <Route path="/index" component={IndexView} onEnter={requireAuth} />
    <Route path="/submit" component={SubmitDomain} onEnter={requireAuth} />
    <Route path="/" exact component={HomePage} />
  </div>

);

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

