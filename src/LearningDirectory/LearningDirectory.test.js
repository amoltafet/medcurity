import renderer from 'react-test-renderer';
import LearningDirectoryPage from './LearningDirectory';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

test('renders LearningDirectoryPage', () => {
  const tree = renderer.create(<BrowserRouter><LearningDirectoryPage /></BrowserRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});