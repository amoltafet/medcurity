import renderer from 'react-test-renderer';
import DashboardPage from './DashboardPage';
import React from 'react';

test('renders DashboardPage', () => {
  const tree = renderer.create(<DashboardPage />).toJSON();
  expect(tree).toMatchSnapshot();
});
