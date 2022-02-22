import renderer from 'react-test-renderer';
import LearningDirectoryPage from './LearningDirectory';
import React from 'react';

test('renders LoginPage', () => {
  const tree = renderer.create(<LearningDirectoryPage />).toJSON();
  expect(tree).toMatchSnapshot();
});