import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import pretty from 'pretty';
import Board from '../components/Board';
import fakePredictions, { trips } from './fakePredictions';
import { getTrainNumber } from '../utils/boardData';

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

test('Trains data show up in the Board', async () => {
  // eslint-disable-next-line max-len
  (axios.get as jest.Mock).mockImplementation(() => Promise.resolve({ data: { ...trips } }));

  const el = document.createElement('div');
  await act(async () => {
    ReactDOM.render(<Board data={fakePredictions} />, el);
  });

  for (let i = 0; i < fakePredictions.length; i += 1) {
    expect(el.innerHTML).toContain(fakePredictions[i].attributes.status!);
    expect(el.innerHTML).toContain(getTrainNumber(fakePredictions[i]));
  }
});

test('Trains arriving at South Station are displayed in the departures area in the UI', async () => {
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

test('Trains leaving the south station are displayed in the departures area in the UI', async () => {
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
