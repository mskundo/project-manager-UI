import React from 'react';
import { shallow } from 'enzyme';
import AddTask from './AddTask';

describe('AddTask', () => {
  let wrapper;
  beforeEach(() => wrapper = shallow(<AddTask />));

  it('should render a <input /> in add Task', () => {
    expect(wrapper.find('input').length).toEqual(11);
  });

  it('should render a <div /> in add Task', () => {
    expect(wrapper.find('div').length).toEqual(53);
  });

  it('should render a <button /> in add Task', () => {
    expect(wrapper.find('button').length).toEqual(11);
  });

});