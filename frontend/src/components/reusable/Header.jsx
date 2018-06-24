import React, {Component} from 'react';  
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
  link: {
    textDecoration: "none"
  }
});

class Header extends Component {  
  render() {
    let { classes } = this.props;
    if (this.props.logged_in) {
      return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" color="inherit" className={classes.flex}>
                  Dodomain
              </Typography>
              <Link to="/" className={classes.link} >
                <Button variant="contained" color="primary" className={classes.button}>
                  Home
                </Button>
              </Link>
              <Link to="/index" className={classes.link} >
                <Button variant="contained" color="primary" className={classes.button}>
                  Domain List
                </Button>
              </Link>
              <Link to="/submit" className={classes.link} >
                <Button variant="contained" color="primary" className={classes.button}>
                  Submit Domain
                </Button>
              </Link>
              <Link to="/" id="logout" className={classes.link}
                onClick={this.props.logout} >
                <Button variant="contained" color="primary" className={classes.button}>
                  Log Out
                </Button>
              </Link>
            </Toolbar>
          </AppBar>
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" color="inherit" className={classes.flex}>
                  Dodomain
              </Typography>
              <Link to="/" className={classes.link} >
                <Button variant="contained" color="primary" className={classes.button}>
                  Home
                </Button>
              </Link>
              <Link to="/login" className={classes.link} >
                <Button variant="contained" color="primary" className={classes.button}>
                  Log In
                </Button>
              </Link>
              <Link to="/signup" className={classes.link} >
                <Button variant="contained" color="primary" className={classes.button}>
                  Sign Up
                </Button>
              </Link>
            </Toolbar>
          </AppBar>
        </div>
      );
    }
  }
}



export default withStyles(styles)(Header);