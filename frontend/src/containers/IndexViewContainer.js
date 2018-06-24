import { connect } from 'react-redux';

import IndexView from '../components/IndexView';
import {fetchDomains, clearErrorsState} from '../actions/actions';

const mapStateToProps = state => ({
  domains: state.domains,
  errors: state.errors.domain_errors
});

const mapDispatchToProps = dispatch => (
  {
    fetchDomains: (sortState) => fetchDomains(sortState, dispatch),
    clearErrors: () => clearErrorsState(dispatch)
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(IndexView);
