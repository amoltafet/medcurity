import renderer from 'react-test-renderer';
import DashboardPage from './DashboardPage';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

test('renders DashboardPage', () => {
  const tree = renderer.create(<BrowserRouter><DashboardPage /></BrowserRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});
