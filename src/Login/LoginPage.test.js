import renderer from 'react-test-renderer';
import LoginPage from './LoginPage';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

test('renders LoginPage', () => {
  const tree = renderer.create(<BrowserRouter><LoginPage /></BrowserRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});