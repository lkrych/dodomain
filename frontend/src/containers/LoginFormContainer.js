import { connect } from 'react-redux';

import LoginForm from '../components/LoginForm';
import {login} from '../actions/actions';

const mapStateToProps = state => ({
  session: state.session
});

const mapDispatchToProps = dispatch => (
  {
    login: (userInfo) => login(userInfo, dispatch)
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
