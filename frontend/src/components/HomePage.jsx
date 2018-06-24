import React from 'react';
import {Link} from 'react-router-dom';

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Dodomain</h1>
        <p>Keep track of domains before they go the way of the dodo.</p>
      </div>
    );
  }
}

export default HomePage;