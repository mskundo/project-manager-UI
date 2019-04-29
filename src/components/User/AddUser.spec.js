import React from 'react';
import { shallow, mount, render } from 'enzyme';
import AddUser from './AddUser';
import GetUser from './GetUser';

describe('AddUser', () => {
  let wrapper;
  beforeEach(() => wrapper = shallow(<AddUser />));

  it('should render a <input /> in add user', () => {
    expect(wrapper.find('input').length).toEqual(3);
  });

  it('should render a <div /> in add user', () => {
    expect(wrapper.find('div').length).toEqual(24);
  });

  it('should render the GetUser Component', () => {
    expect(wrapper.containsMatchingElement(<GetUser />)).toEqual(true);
  });

});