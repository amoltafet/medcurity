import renderer from 'react-test-renderer';
import LearningDirectoryRequiredPage from './LearningDirectoryRequiredPage';
import React from 'react';

test('renders LoginPage', () => {
  const tree = renderer.create(<LearningDirectoryRequiredPage />).toJSON();
  expect(tree).toMatchSnapshot();
});