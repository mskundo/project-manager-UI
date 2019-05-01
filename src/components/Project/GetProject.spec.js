import React from 'react';
import { shallow } from 'enzyme';
import GetProject from './GetProject';

describe('GetProject', () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<GetProject />));

    it('should render a <input /> in add project', () => {
        expect(wrapper.find('input').length).toEqual(8);
    });

    it('should render a <div /> in add project', () => {
        expect(wrapper.find('div').length).toEqual(37);
    });

    it('should render a <form /> in add project', () => {
        expect(wrapper.find('form').length).toEqual(1);
    });

    it('should render a <table /> in add project', () => {
        expect(wrapper.find('table').length).toEqual(1);
    });

    it('should render a <tr /> in add project', () => {
        expect(wrapper.find('tr').length).toEqual(2);
    });

    it('should render a <button /> in add project', () => {
        expect(wrapper.find('button').length).toEqual(4); 
    });

});