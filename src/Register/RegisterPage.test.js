import renderer from 'react-test-renderer';
import RegisterPage from './RegisterPage';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

test('renders RegisterPage', () => {
  const tree = renderer.create(<BrowserRouter><RegisterPage /></BrowserRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});