import renderer from 'react-test-renderer';
import LeaderboardPage from './LeaderboardPage';
import React from 'react';

test('renders LoginPage', () => {
  const tree = renderer.create(<LeaderboardPage />).toJSON();
  expect(tree).toMatchSnapshot();
});