import renderer from 'react-test-renderer';
import LearningDirectoryRequiredPage from './LearningDirectoryRequiredPage';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

test('renders LoginPage', () => {
  const tree = renderer.create(<BrowserRouter><LearningDirectoryRequiredPage /></BrowserRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});