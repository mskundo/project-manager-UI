import React from 'react';
import { shallow } from 'enzyme';
import GetUser from './GetUser';
import axios from 'axios';

describe('GetUser', () => {
  let wrapper;
  beforeEach(() => wrapper = shallow(<GetUser />));

  it('should render a <div /> in get user', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

})