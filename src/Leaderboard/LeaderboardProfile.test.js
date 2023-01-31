import renderer from 'react-test-renderer';
import LeaderboardProfile from './LeaderboardProfile';
import React from 'react';

test('renders LeaderboardProfile', () => {
  const tree = renderer.create(<LeaderboardProfile />).toJSON();
  expect(tree).toMatchSnapshot();
});