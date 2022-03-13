import { getTrainTime } from '../utils/boardData';
import fakePredictions from './fakePredictions';

test('Board Entry renders correctly', () => {
  const prediction = fakePredictions[0];
  const humanTime = getTrainTime(prediction, false);
  expect(humanTime).toEqual('01:53 AM');
});
