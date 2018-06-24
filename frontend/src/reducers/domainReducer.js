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
      return Object.assign({},
        state,
        {domains: action.domains.domains},
        {pagination: action.domains.pagination});
    default:
      return state;
  }
};
export default domainReducer;