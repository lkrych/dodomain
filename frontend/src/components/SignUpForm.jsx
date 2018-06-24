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

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      errors: '',
      email: '',
      password: '',
      password_confirmation: '',
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
    if (!this.state.email) {
      return this.setState({
        errors: 'Email is required.',
        message: undefined,
        disableSubmit: false
      });
    }
    if (this.state.password !== this.state.password_confirmation) {
      return this.setState({
        errors: 'Passwords must match.',
        message: undefined,
        disableSubmit: false
      });
    }
    if (this.state.password.length < 6 || this.state.password.length > 20 ) {
      return this.setState({
        errors: 'Passwords should be at least 6 characters and have fewer than 20 characters.',
        message: undefined,
        disableSubmit: false
      });
    }
    this.props.signUp({
      email: this.state.email,
      password: this.state.password,
    });
  }

  componentWillUnmount(){
    this.props.clearErrors();
  }

  render() {
    const { classes } = this.props;
    let textErrors = <div className="errors">{this.props.errors}</div>;
    return (
      <Paper className={classes.root} elevation={4}>
        {textErrors}
        <Typography variant="headline" gutterBottom>
          Sign Up
        </Typography>
        <form>
        <div className='field'>
            
            <TextField autoFocus='autofocus'
              label='email'
              type='email'
              id='email' 
              onChange={this.onInput('email')}
              value={this.state.email} />
          </div>
          <div className='field' >
            <TextField 
              autoComplete='off' 
              label='password'
              type='password'
              id='password' 
              onChange={this.onInput('password')}
              value={this.state.password}
                />
            </div>

          <div className='field' >
            
            <TextField 
              autoComplete='off'
              type='password'
              label="password_confirmation"
              id='password_confirmation' 
              onChange={this.onInput('password_confirmation')}
              value={this.state.password_confirmation}
                />
            </div>
            <br></br>

          <Button
            type="submit"
            variant="contained" color="primary"
            className="btn btn-primary btn-submit"
            onClick={this.onSubmit}>
            Sign Up
          </Button>
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(SignUpForm);
