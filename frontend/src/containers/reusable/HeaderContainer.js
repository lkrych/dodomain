import { connect } from 'react-redux';

import Header from '../../components/reusable/Header';
import {logout} from '../../actions/actions';

const mapStateToProps = state => ({
  logged_in: state.session
});

const mapDispatchToProps = dispatch => (
  {
    logout: () => logout(dispatch)
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
