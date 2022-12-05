import renderer from 'react-test-renderer';
import SettingsPage from './SettingsPage';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

test('renders SettingsPage', () => {
  const tree = renderer.create(<BrowserRouter><SettingsPage /></BrowserRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});