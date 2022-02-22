import renderer from 'react-test-renderer';
import DashLeaderboardProfiles from './DashLeaderboardProfiles';
import React from 'react';

test('renders LoginPage', () => {
  const tree = renderer.create(<DashLeaderboardProfiles />).toJSON();
  expect(tree).toMatchSnapshot();
});