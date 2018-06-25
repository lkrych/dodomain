import React from 'react';
import { shallow } from 'enzyme';

import LoginForm from '../../components/LoginForm';

describe('LoginForm', () => {
  const mockSubmitForm = jest.fn();
  const loginForm = shallow(<LoginForm login={mockSubmitForm} classes={{root:"blahStyle"}}/>);

  it('renders correctly', () => {
    expect(loginForm).toMatchSnapshot();
  });

  it('correctly initializes the `state` with an empty email and password', () => {
    expect(loginForm.state().email).toEqual('');
    expect(loginForm.state().password).toEqual('');
  });

  describe('when typing into the email input', () => {
    const email = 'Noodle@gmail.com';

    beforeEach(() => {
      loginForm.find('#email').simulate('change', { target: { value: email} });
    });

    it('updates the person in `state`', () => {
      expect(loginForm.state().email).toEqual(email);
    });
  });

  describe('when typing into the password input', () => {
    const password = 'password';

    beforeEach(() => {
      loginForm.find('#password').simulate('change', { target: { value: password} });
    });

    it('updates the person in `state`', () => {
      expect(loginForm.state().password).toEqual(password);
    });
  });

  describe('on submission of form', () => {
    const mockedEvent = { target: {}, preventDefault: jest.fn() };

    it('should call the login method', () => {
      beforeEach(() => {
        loginForm.find('.btn-submit').simulate('click', mockedEvent);
      });

      it('calls the login callback', () => {
        expect(mockSubmitForm.mock.calls).toEqual(1);
      });
    });
  });
  
  describe('Error Text', () => {
    it('should be an empty string if there are no session_errors', () => {
      expect(loginForm.find('#errors').html()).not.toContain("there is an error");
    });
    
    let loginFormWithErrors = shallow(<LoginForm login={mockSubmitForm} errors={"there is an error"} classes={{root:"blahStyle"}}/>);
    it('should be populated if there are session_errors', () => {
      expect(loginFormWithErrors.find('#errors').html()).toContain("there is an error");
    });
  });
  
});