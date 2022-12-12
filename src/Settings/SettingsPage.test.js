// import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import SettingsPage from './SettingsPage';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

test('renders SettingsPage', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<BrowserRouter><SettingsPage /></BrowserRouter>);
  const view = renderer.getRenderOutput();
  expect(view).toMatchSnapshot();
});