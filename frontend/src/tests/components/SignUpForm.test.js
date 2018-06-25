import React from 'react';
import { shallow } from 'enzyme';

import SignUpForm from '../../components/SignUpForm';

describe('SignUpForm', () => {
  const mockSubmitForm = jest.fn();
  const signUpForm = shallow(<SignUpForm signUp={mockSubmitForm} classes={{root:"blahStyle"}} />);
  
  it('renders correctly', () => {
    expect(signUpForm).toMatchSnapshot();
  });

  it('correctly initializes the `state` with an empty email, password, password_confirmation, and errors', () => {
    expect(signUpForm.state().email).toEqual('');
    expect(signUpForm.state().password).toEqual('');
    expect(signUpForm.state().password_confirmation).toEqual('');
    expect(signUpForm.state().errors).toEqual('');
  });

  describe('when typing into the email input', () => {
    const email = 'Noodle@gmail.com';

    beforeEach(() => {
      signUpForm.find('#email').simulate('change', { target: { value: email} });
    });

    it('updates the person in `state`', () => {
      expect(signUpForm.state().email).toEqual(email);
    });
  });

  describe('when typing into the password input', () => {
    const password = 'password';

    beforeEach(() => {
      signUpForm.find('#password').simulate('change', { target: { value: password} });
    });

    it('updates the person in `state`', () => {
      expect(signUpForm.state().password).toEqual(password);
    });
  });

  describe('when typing into the password_confirmation input', () => {
    const password_confirmation = 'password';

    beforeEach(() => {
      signUpForm.find('#password_confirmation').simulate('change', { target: { value: password_confirmation} });
    });

    it('updates the person in `state`', () => {
      expect(signUpForm.state().password_confirmation).toEqual(password_confirmation);
    });
  });

  describe('on submission of form', () => {
    beforeEach(() => {
      signUpForm.find('#email').simulate('change', { target: { value: ''} });
      signUpForm.find('#password').simulate('change', { target: { value: ''} });
      signUpForm.find('#password_confirmation').simulate('change', { target: { value: ''} });
    });

    const mockedEvent = { target: {}, preventDefault: jest.fn() };
    it('should populate the errors `state` if the user tries to submit without an email', () => {
      signUpForm.find('.btn-submit').simulate('click', mockedEvent);
      expect(signUpForm.state().errors).toEqual('Email is required.');
    });

    it('should populate the errors `state` if the passwords dont match', () => {
      signUpForm.find('#email').simulate('change', { target: { value: 'test@email.com'} });
      signUpForm.find('#password').simulate('change', { target: { value: 'password'} });
      signUpForm.find('#password_confirmation').simulate('change', { target: { value: 'passwood'} });
      signUpForm.find('.btn-submit').simulate('click', mockedEvent);

      expect(signUpForm.state().errors).toEqual('Passwords must match.');

    });

    it('should populate the errors state if the submitted password is too short', () => {
      signUpForm.find('#email').simulate('change', { target: { value: 'test@email.com'} });
      signUpForm.find('#password').simulate('change', { target: { value: 'pass'} });
      signUpForm.find('#password_confirmation').simulate('change', { target: { value: 'pass'} });
      signUpForm.find('.btn-submit').simulate('click', mockedEvent);

      expect(signUpForm.state().errors).toEqual("Passwords should be at least 6 characters and have fewer than 20 characters.");
    });

    it('should populate the errors state if the submitted password is too long', () => {
      signUpForm.find('#email').simulate('change', { target: { value: 'test@email.com'} });
      signUpForm.find('#password').simulate('change', { target: { value: 'reallyreallyreallylongpassword'} });
      signUpForm.find('#password_confirmation').simulate('change', { target: { value: 'reallyreallyreallylongpassword'} });
      signUpForm.find('.btn-submit').simulate('click', mockedEvent);

      expect(signUpForm.state().errors).toEqual("Passwords should be at least 6 characters and have fewer than 20 characters.");
    });
  });

  describe('Error Text', () => {
    beforeAll(() => { //reset error state
      signUpForm.state.errors = '';
    });

    it('should be an empty string if there are no session_errors', () => {
      expect(signUpForm.find('#errors').html()).not.toContain("there is an error");
    });
    
    let signUpFormWithErrors = shallow(<SignUpForm signUp={mockSubmitForm} errors={"there is an error"} classes={{root:"blahStyle"}}/>);
    it('should be populated if there are session_errors', () => {
      expect(signUpFormWithErrors.find('#errors').html()).toContain("there is an error");
    });
  });

});