import renderer from 'react-test-renderer';
import LearningPage from './LearningPage';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

test('renders LearningPage', () => {
  const tree = renderer.create(<BrowserRouter><LearningPage /></BrowserRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});