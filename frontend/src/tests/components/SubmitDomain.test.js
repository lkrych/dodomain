import React from 'react';
import { shallow } from 'enzyme';

import SubmitDomain from '../../components/SubmitDomain';

describe('SubmitDomain', () => {
  const mockSubmitForm = jest.fn();
  const submitDomain = shallow(<SubmitDomain submitDomain={mockSubmitForm} classes={{root:"blahStyle"}} />);
  
  it('renders correctly', () => {
    expect(submitDomain).toMatchSnapshot();
  });

  it('correctly initializes the `state` with an empty name and description', () => {
    expect(submitDomain.state().name).toEqual('');
    expect(submitDomain.state().description).toEqual('');
  });

  describe('when typing into the name input', () => {
    const name = 'Noodle@gmail.com';

    beforeEach(() => {
      submitDomain.find('#name').simulate('change', { target: { value: name} });
    });

    it('updates the person in `state`', () => {
      expect(submitDomain.state().name).toEqual(name);
    });
  });

  describe('when typing into the description input', () => {
    const description = 'description';

    beforeEach(() => {
      submitDomain.find('#description').simulate('change', { target: { value: description} });
    });

    it('updates the person in `state`', () => {
      expect(submitDomain.state().description).toEqual(description);
    });
  });

  describe('on submission of form', () => {
    const mockedEvent = { target: {}, preventDefault: jest.fn() };

    it('should call the login method', () => {
      beforeEach(() => {
        submitDomain.find('.btn-submit').simulate('click', mockedEvent);
      });

      it('calls the login callback', () => {
        expect(mockSubmitForm.mock.calls).toEqual(1);
      });
    });
  });

  describe('Error Text', () => {
    it('should be an empty string if there are no session_errors', () => {
      expect(submitDomain.find('#errors').html()).not.toContain("there is an error");
    });
    
    let submitDomainWithErrors = shallow(<SubmitDomain submitDomain={mockSubmitForm} errors={"there is an error"} classes={{root:"blahStyle"}}/>);
    it('should be populated if there are session_errors', () => {
      expect(submitDomainWithErrors.find('#errors').html()).toContain("there is an error");
    });
  });

  describe('Success Message Text', () => {
    it('should be an empty string if there are no messages', () => {
      expect(submitDomain.find('#messages').html()).not.toContain("success!");
    });
    
    let submitDomainWithErrors = shallow(<SubmitDomain submitDomain={mockSubmitForm} message={"success!"} classes={{root:"blahStyle"}}/>);
    it('should be populated if there are session_errors', () => {
      expect(submitDomainWithErrors.find('#messages').html()).toContain("success!");
    });
  });
});