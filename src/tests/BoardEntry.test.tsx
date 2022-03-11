import React from 'react';
import renderer from 'react-test-renderer';
import BoardEntry from '../components/BoardEntry';
import fakePredictions from './fakePredictions';

test('Board Entry renders correctly', () => {
  const tree = renderer.create(<BoardEntry data={fakePredictions[0]} />).toJSON();
  expect(tree).toMatchSnapshot();
});
