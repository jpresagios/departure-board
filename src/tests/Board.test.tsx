import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Board from '../components/Board';
import fakePredictions from './fakePredictions';

test('Board renders correctly', () => {
  const tree = renderer.create(<Board data={fakePredictions} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Board display props', () => {
  const prediction = fakePredictions[0];
  render(<Board data={fakePredictions} />);
  const predictionItem = screen.getByText(prediction.attributes.status!);
  expect(predictionItem).toBeInTheDocument();
});
