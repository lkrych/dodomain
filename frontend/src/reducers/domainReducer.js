import { RECEIVE_DOMAINS } from '../actions/actions.js';

const _defaultDomains = {
  domains: [],
  pagination: {
    page: 1,
    search_query: "",
    desc: true,
    order_by: "id"
  }
};

const domainReducer = (state = _defaultDomains, action) => {
  switch(action.type) {
    case RECEIVE_DOMAINS: 
      return action.domains;
    default:
      return state;
  }
};
export default domainReducer;