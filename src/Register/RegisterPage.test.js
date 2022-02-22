import renderer from 'react-test-renderer';
import RegisterPage from './RegisterPage';
import React from 'react';

test('renders LoginPage', () => {
  const tree = renderer.create(<RegisterPage />).toJSON();
  expect(tree).toMatchSnapshot();
});