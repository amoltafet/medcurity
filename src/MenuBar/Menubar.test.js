import renderer from 'react-test-renderer';
import Menubar from './MenuBar';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

test('renders Menubar', () => {
  const tree = renderer.create(<BrowserRouter><Menubar /></BrowserRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});