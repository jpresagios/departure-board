import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import pretty from 'pretty';
import Board from '../components/Board';
import fakePredictions, { trips } from './fakePredictions';

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('axios');

test('Board renders correctly', async () => {
  const el = document.createElement('div');
  (axios.get as jest.Mock).mockImplementation(() => Promise.resolve({ data: { ...trips } }));
  await act(async () => {
    ReactDOM.render(<Board data={fakePredictions} />, el);
  });

  expect(pretty(el.innerHTML)).toMatchSnapshot();
});

test('Board display props', async () => {
  const prediction = fakePredictions[0];
  // eslint-disable-next-line max-len
  (axios.get as jest.Mock).mockImplementation(() => Promise.resolve({ data: { ...trips } }));

  const el = document.createElement('div');
  await act(async () => {
    ReactDOM.render(<Board data={fakePredictions} />, el);
  });
  expect(el.innerHTML).toContain(prediction.attributes.status!);
});

test('Entry shpow up in departure section', async () => {
  // eslint-disable-next-line max-len
  (axios.get as jest.Mock).mockImplementation(() => Promise.resolve({ data: { ...trips } }));

  const el = document.createElement('div');
  await act(async () => {
    ReactDOM.render(<Board data={fakePredictions} />, el);
  });

  const departuresElements = el.getElementsByClassName('MuiTableRow-root departure');
  const entryDeparture = fakePredictions.filter((pred) => pred.attributes.stop_sequence === 1)[0];
  expect(departuresElements[0].innerHTML).toContain(entryDeparture.attributes.status);
});

test('Entry shpow up in arrival section', async () => {
  // eslint-disable-next-line max-len
  (axios.get as jest.Mock).mockImplementation(() => Promise.resolve({ data: { ...trips } }));

  const el = document.createElement('div');
  await act(async () => {
    ReactDOM.render(<Board data={fakePredictions} />, el);
  });

  const departuresElements = el.getElementsByClassName('MuiTableRow-root arrival');
  const entryArrival = fakePredictions.filter((pred) => pred.attributes.stop_sequence > 1)[0];
  expect(departuresElements[0].innerHTML).toContain(entryArrival.attributes.status);
});
