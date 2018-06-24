import { connect } from 'react-redux';

import IndexView from '../components/IndexView';
import {fetchDomains} from '../actions/actions';

const mapStateToProps = state => ({
  domains: state.domains
});

const mapDispatchToProps = dispatch => (
  {
    fetchDomains: (sortState) => fetchDomains(sortState, dispatch)
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(IndexView);
