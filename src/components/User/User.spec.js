import React from 'react';
import { shallow, mount, render } from 'enzyme';
import User from './User';

describe('User', () => {
  let wrapper;
  beforeEach(() => wrapper = shallow(<User />));

  it('should render a <input /> in add user', () => {
    expect(wrapper.find('input').length).toEqual(3);
  });

  it('should render a <div /> in add user', () => {
    expect(wrapper.find('div').length).toEqual(24);
  });

});