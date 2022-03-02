import renderer from 'react-test-renderer';
import Menubar from './MenuBar';
import React from 'react';

test('renders LoginPage', () => {
  const tree = renderer.create(<Menubar />).toJSON();
  expect(tree).toMatchSnapshot();
});