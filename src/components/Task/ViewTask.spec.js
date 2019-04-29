import React from 'react';
import { shallow, mount, render } from 'enzyme';
import ViewTask from './ViewTask';
import ShowTask from './ShowTask';

describe('ViewTask', () => {
  let wrapper;
  beforeEach(() => wrapper = shallow(<ViewTask />));

  it('should render a <div /> in view task', () => {
    expect(wrapper.find('div').length).toEqual(18);
  });

  it('should render a <form /> in view task', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('should render a <table /> in view task', () => {
    expect(wrapper.find('table').length).toEqual(1);
  });

  it('should render a <td /> in view task', () => {
    expect(wrapper.find('td').length).toEqual(0);
  });

  it('should render a <tr /> in view task', () => {
    expect(wrapper.find('tr').length).toEqual(1);
  });

  it('should render a <button /> in add user', () => {
    expect(wrapper.find('button').length).toEqual(7);
  });

  it('should render the ShowTask Component', () => {
    expect(wrapper.containsMatchingElement(<ShowTask />)).toEqual(true);
  });

});