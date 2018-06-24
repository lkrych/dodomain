import { connect } from 'react-redux';

import App from '../components/App';

const mapStateToProps = state => ({
  session: state.session
});

export default connect(mapStateToProps, null)(App);
