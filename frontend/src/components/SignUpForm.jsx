import React, {Component} from 'react';

class LoginForm extends Component {
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
    let textErrors = <div className="errors">{this.props.errors}</div>;
    return (
      <div>
        {textErrors}
        <form>
        <div className='field'>
            <label> Email </label>
            <br />
            <input autoFocus='autofocus' type='email'
              id='email' 
              onChange={this.onInput('email')}
              value={this.state.email} />
          </div>
          <div className='field' >
            <label> Password </label>
            <br />
            <input autoComplete='off' type='password'
              id='password' 
              onChange={this.onInput('password')}
              value={this.state.password}
                />
            </div>

          <div className='field' >
            <label> Password Confirmation </label>
            <br />
            <input autoComplete='off' type='password'
              id='password_confirmation' 
              onChange={this.onInput('password_confirmation')}
              value={this.state.password_confirmation}
                />
            </div>

          < input
            type="submit"
            className="btn btn-primary btn-submit"
            onClick={this.onSubmit}/>
        </form>
      </div>
    );
  }
}

export default LoginForm;
