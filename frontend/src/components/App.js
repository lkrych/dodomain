import React, {Component} from 'react';
import HeaderContainer from '../containers/reusable/HeaderContainer';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <HeaderContainer />
        {this.props.children}
      </div>
    );
  }
}

export default App;