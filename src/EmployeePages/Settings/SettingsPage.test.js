import renderer from 'react-test-renderer';
import SettingsPage from './SettingsPage';
import React from 'react';

test('renders SettingsPage', () => {
  const tree = renderer.create(<SettingsPage />).toJSON();
  expect(tree).toMatchSnapshot();
});