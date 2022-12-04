import renderer from 'react-test-renderer';
import LeaderboardPage from './LeaderboardPage';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

test('renders LeaderboardPage', () => {
  const tree = renderer.create(<BrowserRouter><LeaderboardPage /></BrowserRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});