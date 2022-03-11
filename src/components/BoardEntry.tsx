import React, { useEffect, useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
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

export const StyledTableCell = withStyles({
  body: {
    border: 'none',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFFD5A',
    backgroundColor: '#121312'
  },
})(TableCell);

/**
 * This component represent an entry on the board (Departure or Arrival)
 * @param props Contains a prediction from MTBA API
 * @returns
 */
function BoardEntry(props: { data: IPrediction, isArrival: boolean }) {
  const { data, isArrival } = props;
  const [destinationName, setDestinationName] = useState('');

  const trainNumber = getTrainNumber(data);
  const trainTrackNumber = getTrainTrackNumber(data);
  const status = getTrainStatus(data);
  const trainTime = getTrainTime(data, isArrival);

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
      <StyledTableCell align="left">{getCarrier()}</StyledTableCell>
      <StyledTableCell align="right">{trainTime}</StyledTableCell>
      <StyledTableCell align="right">{destinationName}</StyledTableCell>
      <StyledTableCell align="right">{trainNumber}</StyledTableCell>
      <StyledTableCell align="right">{trainTrackNumber}</StyledTableCell>
      <StyledTableCell align="right">{status}</StyledTableCell>
    </TableRow>
  );
}

export default BoardEntry;
