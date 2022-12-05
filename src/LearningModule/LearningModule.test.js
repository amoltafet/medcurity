import renderer from 'react-test-renderer';
import LearningModule from './LearningModule';
import React from 'react';

test('renders LearningModule', () => {
  const tree = renderer.create(<LearningModule />).toJSON();
  expect(tree).toMatchSnapshot();
});