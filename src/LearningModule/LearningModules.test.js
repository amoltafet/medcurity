import renderer from 'react-test-renderer';
import LearningModules from './LearningModules';
import React from 'react';

test('renders LearningModules', () => {
  const tree = renderer.create(<LearningModules />).toJSON();
  expect(tree).toMatchSnapshot();
});