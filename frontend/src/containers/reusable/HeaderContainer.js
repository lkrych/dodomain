import { connect } from 'react-redux';

import {logout} from '../../actions/actions';
import {styledHeader} from '../../components/styledComponents/styledComponents';

const mapStateToProps = state => ({
  logged_in: state.session
});

const mapDispatchToProps = dispatch => (
  {
    logout: () => logout(dispatch)
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(styledHeader);
