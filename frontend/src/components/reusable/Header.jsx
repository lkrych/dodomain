import React, {Component} from 'react';  
import { Link } from 'react-router-dom';  

class Header extends Component {  
  render() {
    if (this.props.logged_in) {
      return (
        <nav>
          <Link to="/" 
            className="active">Home</Link>
          {" | "}
          <Link to="/index" 
            className="active">Index</Link>
          {" | "}
          <Link to="/submit" 
            className="active">Submit Domain</Link>
          {" | "}
          <a onClick={this.props.logout} href="/logout">Log Out</a>
        </nav>
      );
    } else {
      return (
        <nav>
          <Link to="/" 
            className="active">Home</Link>
          {" | "}
          <Link to="/login" className="active">
            Log In</Link>
          {" | "}
          <Link to="/signup" className="active">
            Sign Up</Link>  
        </nav>
      );
    }
  }
}



export default Header;