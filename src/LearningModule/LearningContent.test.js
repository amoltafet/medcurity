import renderer from 'react-test-renderer';
import LearningContent from './LearningContent';
import React from 'react';

test('renders LoginPage', () => {
  const tree = renderer.create(<LearningContent />).toJSON();
  expect(tree).toMatchSnapshot();
});