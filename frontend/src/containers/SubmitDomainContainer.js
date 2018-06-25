import { connect } from 'react-redux';

import {styledSubmitDomain} from '../components/styledComponents/styledComponents';
import {submitDomain, clearErrorsState} from '../actions/actions';

const mapStateToProps = state => ({
  domains: state.domains,
  errors: state.errors.domain_errors
});

const mapDispatchToProps = dispatch => (
  {
    submitDomain: (domainInfo) => submitDomain(domainInfo, dispatch),
    clearErrors: () => clearErrorsState(dispatch)
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(styledSubmitDomain);