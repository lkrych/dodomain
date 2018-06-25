import { RECEIVE_DOMAINS } from '../actions/actions.js';

const _defaultDomains = {
  domains: [],
  pagination: {
    page: 1,
    search_query: "",
    desc: true,
    order_by: "id"
  },
  message: ''
};

const domainReducer = (state = _defaultDomains, action) => {
  console.log(action);
  switch(action.type) {
    case RECEIVE_DOMAINS: 
      let domains = Array.isArray(action.domains.domains) ?  action.domains.domains : [];
      let pagination = typeof action.domains.pagination === 'object' ? action.domains.pagination : {};
      let message = typeof action.domains.message === 'string'? action.domains.message : '';
      return Object.assign({},
        state,
        {domains},
        {pagination},
        {message}
      );
    default:
      return state;
  }
};
export default domainReducer;