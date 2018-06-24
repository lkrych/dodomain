import React, {Component} from 'react';

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