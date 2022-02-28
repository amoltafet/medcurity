import renderer from 'react-test-renderer';
import LoginPage from './LoginPage';
import React from 'react';

test('renders LoginPage', () => {
  const tree = renderer.create(<LoginPage />).toJSON();
  expect(tree).toMatchSnapshot();
});