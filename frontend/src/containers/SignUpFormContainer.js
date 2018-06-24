import { connect } from 'react-redux';

import SignUpForm from '../components/SignUpForm';
import {signUp} from '../actions/actions';

const mapStateToProps = state => ({
  session: state.session
});

const mapDispatchToProps = dispatch => (
  {
    signUp: (userInfo) => signUp(userInfo, dispatch)
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
