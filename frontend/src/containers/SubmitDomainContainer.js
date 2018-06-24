import { connect } from 'react-redux';

import SubmitDomain from '../components/SubmitDomain';
import {submitDomain} from '../actions/actions';

const mapStateToProps = state => ({
  domains: state.domains
});

const mapDispatchToProps = dispatch => (
  {
    submitDomain: (domainInfo) => submitDomain(domainInfo, dispatch)
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(SubmitDomain);