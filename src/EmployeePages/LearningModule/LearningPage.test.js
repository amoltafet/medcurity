import renderer from 'react-test-renderer';
import LearningPage from './LearningPage';
import React from 'react';

test('renders LoginPage', () => {
  const tree = renderer.create(<LearningPage />).toJSON();
  expect(tree).toMatchSnapshot();
});