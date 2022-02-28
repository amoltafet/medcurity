import renderer from 'react-test-renderer';
import WelcomePanel from './WelcomePanel';
import React from 'react';

test('renders LoginPage', () => {
  const tree = renderer.create(<WelcomePanel />).toJSON();
  expect(tree).toMatchSnapshot();
});