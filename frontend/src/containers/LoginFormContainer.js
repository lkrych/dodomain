import { connect } from 'react-redux';

import LoginForm from '../components/LoginForm';
import {login, clearErrorsState} from '../actions/actions';

const mapStateToProps = state => ({
  session: state.session,
  errors: state.errors.session_errors
});

const mapDispatchToProps = dispatch => (
  {
    login: (userInfo) => login(userInfo, dispatch),
    clearErrors: () => clearErrorsState(dispatch)
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
