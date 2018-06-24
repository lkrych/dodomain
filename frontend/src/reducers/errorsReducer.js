import { RECEIVE_DOMAINS, LOGIN, CLEAR_ERRORS} from '../actions/actions.js';

const _defaultDomains = {
  session_errors: '',
  domain_errors: '',
};

const errorsReducer = (state = _defaultDomains, action) => {
  switch(action.type) {
    case RECEIVE_DOMAINS: 
      return Object.assign({},
        state,
        {domain_errors: action.domains.domain_errors}
      );
    case LOGIN:
      return Object.assign({}, state, action.errors);
    case CLEAR_ERRORS:
      return _defaultDomains;
    default:
      return state;
  }
};
export default errorsReducer;