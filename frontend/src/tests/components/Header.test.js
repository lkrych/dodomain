import React from 'react';
import { shallow } from 'enzyme';

import Header from '../../components/reusable/Header';

describe('Header', () => {
  
  let loggedIn = shallow(<Header logged_in={true} />);
  let loggedOut = shallow(<Header logged_in={false} />);
  
  it('renders correctly', () => {
    expect(loggedOut).toMatchSnapshot();
  });

  describe ('changes what is displayed depending on if a user is signed in', () => {
    

    it ('should display the login link if a user is not signed in', () => {
      expect(loggedOut.find('#login').length).toBeGreaterThanOrEqual(1);
      expect(loggedOut.find('#logout').length).toEqual(0);
    });

    it ('should display the logout link if a user is signed in', () => {
      expect(loggedIn.find('#logout').length).toBeGreaterThanOrEqual(1);
      expect(loggedIn.find('#login').length).toEqual(0);
    });
  });

  describe ('when logged in', () => {

    it('clicking on the logout link', () => {
      beforeEach(() => {
        loggedIn.find('#logout').simulate('click'); //allows us to find inner child nodes or components by jsx tags or by their classname
      });

      it('should change the header', () => {
        expect(loggedIn.find('#login').length).toBeGreaterThanOrEqual(1);
        expect(loggedIn.find('#logout').length).toEqual(0);
      });
    });
  });

});
