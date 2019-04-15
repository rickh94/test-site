import React from 'react';
import { shallow } from 'enzyme';
import ContestForm from './ContestForm';

describe('<ContestForm />', () => {
  test('renders', () => {
    const wrapper = shallow(<ContestForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
