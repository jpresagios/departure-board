/**
 * This files contains computed central logic from MBTA API data to the Board
 */

import axios from 'axios';
import { IPrediction } from '../dataSource/IPredition';
import apiKey from '../enviroment';

const getCarrier = () => 'MTBA';

const getTrainTime = (prediction: IPrediction, isArrival: boolean) => {
  let time = null;

  if (isArrival) {
    const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      attributes: { arrival_time }
    } = prediction;
    time = arrival_time;
  } else {
    const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      attributes: { departure_time }
    } = prediction;

    time = departure_time;
  }

  const realHour: number = new Date(time!).getHours();
  const realMinutes: number = new Date(time!).getMinutes();
  let suffix = 'AM';

  let displayHour: string = `${realHour}`;
  let displayMinutes: string = `${realMinutes}`;

  if (realHour > 11) {
    displayHour = `${realHour - 12}`;
    suffix = 'PM';
  }
  if (realHour === 0) {
    displayHour = '12';
  }
  if (realMinutes < 10) {
    displayMinutes = `0${realMinutes}`;
  }
  return `${displayHour}:${displayMinutes} ${suffix}`;
};

const getDestinationName = async (tripId: string): Promise<string> => {
  const tripData = await axios.get(
    `https://api-v3.mbta.com/trips/${tripId}?api_key=${apiKey}`
  );

  const {
    data: {
      attributes: { headsign }
    }
  } = tripData.data;

  return headsign;
};

const getTrainNumber = (prediction: IPrediction) => {
  const {
    relationships: { vehicle }
  } = prediction;

  const vehicleData = vehicle.data.id.split('-');
  return vehicleData.length > 1 ? vehicleData[1] : vehicleData;
};

const getTrainTrackNumber = (prediction: IPrediction) => {
  const {
    relationships: { stop }
  } = prediction;

  const trackData = stop.data.id.split('-');
  return trackData.length > 1 ? stop.data.id[1] : 'TBD';
};

const getTrainStatus = (prediction: IPrediction) => {
  const {
    attributes: { status }
  } = prediction;
  return status;
};

export {
  getCarrier,
  getTrainTime,
  getDestinationName,
  getTrainNumber,
  getTrainTrackNumber,
  getTrainStatus
};
