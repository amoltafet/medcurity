import renderer from 'react-test-renderer';
import React from 'react';
import LearningModulesDirectories from './LearningModuleDirectories';

test('renders LoginPage', () => {
  const tree = renderer.create(<LearningModulesDirectories />).toJSON();
  expect(tree).toMatchSnapshot();
});