/* eslint-disable no-case-declarations */
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { useEffect, useReducer } from 'react';
import { IPrediction } from '../dataSource/IPredition';
import apiKey from '../enviroment';

interface EventAction {
  type: string;
  payload: IPrediction[] | IPrediction | { id: string };
}

const useMBTAStreaming = () => {
  const [data, dispatch] = useReducer(
    (state: IPrediction[], action: EventAction) => {
      const { type, payload } = action;

      switch (type) {
        case 'reset':
          return payload as IPrediction[];
        case 'add':
          return [...state, payload as IPrediction];
        case 'remove':
          const removeData = payload as { id: string };
          return state.filter((pred) => pred.id !== removeData.id);
        case 'update':
          const predictionToUpdate = payload as IPrediction;
          return [
            ...state.filter((pred) => pred.id !== predictionToUpdate.id),
            predictionToUpdate
          ];
        default:
          return state;
      }
    },
    []
  );

  useEffect(() => {
    fetchEventSource(
      `https://api-v3.mbta.com/predictions/?api_key=${apiKey}&stop=place-sstat`,
      {
        onmessage(ev) {
          dispatch({ type: ev.event, payload: JSON.parse(ev.data) });
        }
      }
    );
  }, []);

  return [data];
};

export default useMBTAStreaming;
