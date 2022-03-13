import React, { memo } from 'react';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import isEqual from 'react-fast-compare';
import { IPrediction } from '../dataSource/IPredition';

import {
  getCarrier,
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

  const trainNumber = getTrainNumber(data);
  const trainTrackNumber = getTrainTrackNumber(data);
  const status = getTrainStatus(data);
  const trainTime = getTrainTime(data, isArrival);

  return (
    <TableRow className={isArrival ? 'arrival' : 'departure'}>
      <StyledTableCell align="left">{getCarrier()}</StyledTableCell>
      <StyledTableCell align="right">{trainTime}</StyledTableCell>
      <StyledTableCell align="right">{data.destination}</StyledTableCell>
      <StyledTableCell align="right">{trainNumber}</StyledTableCell>
      <StyledTableCell align="right">{trainTrackNumber}</StyledTableCell>
      <StyledTableCell align="right">{status}</StyledTableCell>
    </TableRow>
  );
}

export default memo(
  BoardEntry,
  isEqual
);
