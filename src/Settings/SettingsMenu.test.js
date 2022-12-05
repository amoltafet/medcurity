import renderer from 'react-test-renderer';
import SettingsMenu from './SettingsMenu';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

test('renders SettingsMenu', () => {
  const tree = renderer.create(<BrowserRouter><SettingsMenu /></BrowserRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});