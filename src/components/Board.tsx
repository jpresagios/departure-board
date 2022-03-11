import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IPrediction } from '../dataSource/IPredition';
import BoardEntry from './BoardEntry';

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

function Board(props: { data: IPrediction[] }) {
  const [departures, setDepartures] = useState([] as IPrediction[]);
  const [arrivals, setArrivals] = useState([] as IPrediction[]);
  const { data } = props;

  useEffect(() => {
    const departuresFilter = data.filter(
      (pred) => pred.attributes.departure_time !== null
    );

    const sortedDepartures = departuresFilter.sort(
      (a: IPrediction, b: IPrediction) => new Date(a.attributes.departure_time!).getTime()
        - new Date(b.attributes.departure_time!).getTime()
    );

    setDepartures(sortedDepartures);

    const arrivasFilter = data.filter(
      (pred) => pred.attributes.arrival_time !== null
    );

    const sortedArrivals = arrivasFilter.sort(
      (a: IPrediction, b: IPrediction) => new Date(a.attributes.arrival_time!).getTime()
        - new Date(b.attributes.arrival_time!).getTime()
    );

    setArrivals(sortedArrivals);
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
            <BoardEntry key={departure.id} data={departure} isArrival={false} />
          ))}

          <TableRow>
            <StyledTableCell>
              <h1>Arrivals</h1>
            </StyledTableCell>
          </TableRow>
          {arrivals.map((arrival: IPrediction) => (
            <BoardEntry key={arrival.id} data={arrival} isArrival />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Board;
