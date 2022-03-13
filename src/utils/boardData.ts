/**
 * This files contains computed central logic from MBTA API data to the Board
 */

import axios from 'axios';
import * as logger from 'loglevel';
import { IPrediction, ITrainsBoard } from '../dataSource/IPredition';
import apiKey from '../enviroment';

const getCarrier = () => 'MTBA';

const getTrainTime = (prediction: IPrediction, isArrival: boolean | null) => {
  if (isArrival) {
    const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      attributes: { arrival_time }
    } = prediction;

    return new Date(arrival_time!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    attributes: { departure_time }
  } = prediction;

  return new Date(departure_time!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const getTrainNumber = (prediction: IPrediction) => {
  const {
    relationships: { vehicle }
  } = prediction;

  if (vehicle.data === null) return '';
  if (vehicle.data.id.substring(0, 5) === 'block') return vehicle.data.id.substring(6, 10);
  return vehicle.data.id;
};

const getTrainTrackNumber = (prediction: IPrediction) => {
  const {
    relationships: { stop }
  } = prediction;

  if (stop.data === null) return '';

  const trackData = stop.data.id.split('-');
  return trackData.length > 1 ? trackData[0] : 'TBD';
};

const getTrainStatus = (prediction: IPrediction) => {
  const {
    attributes: { status }
  } = prediction;
  return status;
};

// eslint-disable-next-line max-len
const getDepartures = (data: IPrediction[], tripsData: Map<string, string>): IPrediction[] => {
  const departuresResult = [];

  const validDepartures = (pred: IPrediction) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { attributes: { stop_sequence, departure_time } } = pred;
    return (stop_sequence === 1
      && departure_time !== null
      && new Date(departure_time).getTime() > new Date().getTime())
      || (departure_time !== null && stop_sequence === 0);
  };

  const departures = data.filter((pred) => validDepartures(pred));

  for (let i = 0; i < departures.length; i += 1) {
    const departureResult = { ...departures[i] };

    const {
      relationships: { trip }
    } = departures[i];

    departureResult.destination = tripsData.get(trip.data.id);
    departuresResult.push(departureResult);
  }

  const sortedDepartures = departuresResult.sort(
    (a: IPrediction, b: IPrediction) => new Date(a.attributes.departure_time!).getTime()
      - new Date(b.attributes.departure_time!).getTime()
  );

  return sortedDepartures;
};

// eslint-disable-next-line max-len
const getArrivals = (data: IPrediction[], tripsData: Map<string, string>): IPrediction[] => {
  const arrivalsResult = [];

  const arrivals = data.filter(
    (pred) => pred.attributes.stop_sequence > 1 && pred.attributes.arrival_time !== null
  );

  for (let i = 0; i < arrivals.length; i += 1) {
    const {
      relationships: { trip }
    } = arrivals[i];

    if (trip.data.id) {
      const destinationName = tripsData.get(trip.data.id);
      if (destinationName === 'South Station') {
        arrivals[i].destination = destinationName;
        arrivalsResult.push(arrivals[i]);
      }
    }
  }

  const sortedArrivals = arrivalsResult.sort(
    (a: IPrediction, b: IPrediction) => new Date(a.attributes.arrival_time!).getTime()
      - new Date(b.attributes.arrival_time!).getTime()
  );

  return sortedArrivals;
};

const getTrainsInfo = async (dataPredictions: IPrediction[]): Promise<ITrainsBoard> => {
  const tripDataResult = new Map<string, string>();
  const tripsId = dataPredictions.filter((pred) => pred.relationships.trip.data !== null)
    .map((pred) => pred.relationships.trip.data.id).join(',');

  try {
    const tripData = await axios.get(`https://api-v3.mbta.com/trips/?api_key=${apiKey}&id=${tripsId}`);
    const { data: { data } } = tripData;

    for (let i = 0; i < data.length; i += 1) {
      const { attributes: { headsign }, id } = data[i];
      tripDataResult.set(id, headsign);
    }
    const departuresData = getDepartures(dataPredictions, tripDataResult);
    const arrivalsData = getArrivals(dataPredictions, tripDataResult);
    return { departuresData, arrivalsData };
  } catch (err) {
    logger.error('Resolve trains info:', err);
  }

  return { departuresData: [], arrivalsData: [] };
};

export {
  getTrainsInfo,
  getDepartures,
  getArrivals,
  getCarrier,
  getTrainTime,
  getTrainNumber,
  getTrainTrackNumber,
  getTrainStatus,
};
