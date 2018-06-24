import { connect } from 'react-redux';

import SignUpForm from '../components/SignUpForm';
import {signUp, clearErrorsState} from '../actions/actions';

const mapStateToProps = state => ({
  session: state.session,
  errors: state.errors.session_errors

});

const mapDispatchToProps = dispatch => (
  {
    signUp: (userInfo) => signUp(userInfo, dispatch),
    clearErrors: () => clearErrorsState(dispatch)

  }
);

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
