import React, { useEffect, useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { IPrediction } from '../dataSource/IPredition';
import {
  getCarrier,
  getDestinationName,
  getTrainNumber,
  getTrainStatus,
  getTrainTime,
  getTrainTrackNumber,
} from '../utils/boardData';

/**
 * This component represent an entry on the board (Departure or Arrival)
 * @param props Contains a prediction from MTBA API
 * @returns
 */
function BoardEntry(props: { data: IPrediction }) {
  const { data } = props;
  const [destinationName, setDestinationName] = useState('');

  const trainNumber = getTrainNumber(data);
  const trainTrackNumber = getTrainTrackNumber(data);
  const status = getTrainStatus(data);

  const {
    relationships: {
      trip: {
        data: { id },
      },
    },
  } = data;

  useEffect(() => {
    getDestinationName(id).then((destination) => {
      setDestinationName(destination);
    });
  }, [id]);

  return (
    <TableRow>
      <TableCell align="right">{getCarrier()}</TableCell>
      <TableCell align="right">{getTrainTime(data)}</TableCell>
      <TableCell align="right">{destinationName}</TableCell>
      <TableCell align="right">{trainNumber}</TableCell>
      <TableCell align="right">{trainTrackNumber}</TableCell>
      <TableCell align="right">{status}</TableCell>
    </TableRow>
  );
}

export default BoardEntry;
