import renderer from 'react-test-renderer';
import Leaderboard from './DashLeaderboard';
import React from 'react';

test('renders LoginPage', () => {
  const tree = renderer.create(<Leaderboard />).toJSON();
  expect(tree).toMatchSnapshot();
});