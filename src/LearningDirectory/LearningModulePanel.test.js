import renderer from 'react-test-renderer';
import LearningModulePanel from './LearningModulePanel';
import React from 'react';

test('renders LoginPage', () => {
  const tree = renderer.create(<LearningModulePanel />).toJSON();
  expect(tree).toMatchSnapshot();
});