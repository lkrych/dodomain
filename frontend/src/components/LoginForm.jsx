import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: 16,
  }),
});

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      email: '',
      password: '',
    };
    this.onInput = this.onInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  //update state fields
  onInput (property) {
    return (e) => {
      this.setState({ [property]: e.target.value });
    };
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.login(this.state);
  }

  componentWillUnmount(){
    this.props.clearErrors();
  }

  render() {
    const { classes } = this.props;
    let textErrors = <div className="errors">{this.props.errors}</div>;
    return (
      <Paper className={classes.root} elevation={4}>
      <Typography variant="headline" gutterBottom>
          Log In
        </Typography>
        {textErrors}
        <form>
          <div className='field'>
            <TextField
              label='email'
              type='email'
              id='email' 
              onChange={this.onInput('email')}
              value={this.state.email} />
          </div>
          <div className='field' >
            <TextField 
              autoComplete='off' 
              label="password"
              type='password'
              id='password' 
              onChange={this.onInput('password')}
              value={this.state.password}
                />
            </div>
            <br></br>

          < Button
            type="submit"
            variant="contained" color="primary"
            className="btn btn-primary btn-submit"
            onClick={this.onSubmit}>
            Log In
            </Button>
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(LoginForm);