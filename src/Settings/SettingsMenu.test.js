import renderer from 'react-test-renderer';
import SettingsMenu from './SettingsMenu';
import React from 'react';

test('renders LoginPage', () => {
  const tree = renderer.create(<SettingsMenu />).toJSON();
  expect(tree).toMatchSnapshot();
});