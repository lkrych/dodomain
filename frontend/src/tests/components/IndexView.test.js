import React from 'react';
import { shallow } from 'enzyme';

import IndexView from '../../components/IndexView';
import { fetchDomains } from '../../util/api_util';

describe('IndexView', () => {
  const mockLifeCycle = jest.fn();
  const indexView = shallow(<IndexView domains={{domains: [], pagination: {}}} fetchDomains={mockLifeCycle} />);

  it('renders correctly', () => {
    expect(indexView).toMatchSnapshot();
  });

  it('should call fetchDomains when it loads', () => {
    expect(mockLifeCycle.mock.calls.length).toBeGreaterThanOrEqual(1);
  });

  describe('when returned domains from backend', () => {
    let populatedIndexView = shallow(<IndexView domains={{domains: [{name: "test.com"}, {name: "testing.com"}], pagination: {}}} fetchDomains={mockLifeCycle} />);
    it('displays them in a list', () => {
      expect(populatedIndexView.find('.domain-list').children().length).toBeGreaterThanOrEqual(2);
    });
  });
});