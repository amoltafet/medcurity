import renderer from 'react-test-renderer';
import LearningModule from './LearningModule';
import React from 'react';

test('renders LoginPage', () => {
  const tree = renderer.create(<LearningModule />).toJSON();
  expect(tree).toMatchSnapshot();
});