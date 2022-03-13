import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as logger from 'loglevel';
import { v4 as uuidv4 } from 'uuid';
import { IPrediction } from '../dataSource/IPredition';
import BoardEntry from './BoardEntry';
import { getTrainsInfo } from '../utils/boardData';

export const StyledTableCell = withStyles((theme) => ({
  head: {
    textTransform: 'uppercase',
    fontSize: 20,
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

export const StyledBlackTableCell = withStyles({
  body: {
    border: 'none',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    backgroundColor: '#121312'
  },
})(TableCell);

function Board(props: { data: IPrediction[] }) {
  const [departures, setDepartures] = useState([] as IPrediction[]);
  const [arrivals, setArrivals] = useState([] as IPrediction[]);
  const { data } = props;

  useEffect(() => {
    getTrainsInfo(data).then((res) => {
      const { departuresData, arrivalsData } = res;
      setDepartures(departuresData);
      setArrivals(arrivalsData);
    }).catch((err) => {
      logger.error('Integration trains data:', err);
    });
  }, [data]);

  const useStyles = makeStyles({
    table: {
      minWidth: 650
    }
  });

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Departure/Arrivals Board">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <b>Carrier</b>
            </StyledTableCell>
            <StyledTableCell align="right">
              <b>Time</b>
            </StyledTableCell>
            <StyledTableCell align="right">
              <b>Destination</b>
            </StyledTableCell>
            <StyledTableCell align="right">
              <b>Train #</b>
            </StyledTableCell>
            <StyledTableCell align="right">
              <b>Track #</b>
            </StyledTableCell>
            <StyledTableCell align="right">
              <b>Status</b>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {departures.map((departure: IPrediction) => (
            <BoardEntry key={uuidv4()} data={departure} isArrival={false} />
          ))}

          {arrivals.length > 0 && (
            <TableRow>
              <StyledBlackTableCell />
              <StyledBlackTableCell />
              <StyledBlackTableCell>
                Trains on way to South Station
                (
                {arrivals.length}
                )
              </StyledBlackTableCell>
              <StyledBlackTableCell />
              <StyledBlackTableCell />
              <StyledBlackTableCell />
            </TableRow>
          )}
          {arrivals.map((arrival: IPrediction) => (
            <BoardEntry key={uuidv4()} data={arrival} isArrival />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Board;
