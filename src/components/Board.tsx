import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IPrediction } from '../dataSource/IPredition';
import BoardEntry from './BoardEntry';

function Board(props: { data: IPrediction[] }) {
  const [departures, setDepartures] = useState([] as IPrediction[]);
  const { data } = props;

  useEffect(() => {
    const departuresFilter = data.filter(
      (pred) => pred.attributes.departure_time !== null,
    );

    const sortedDepartures = departuresFilter.sort(
      (a: IPrediction, b: IPrediction) => (
        new Date(a.attributes.departure_time).getTime()
        - new Date(b.attributes.departure_time).getTime()
      ),
    );

    setDepartures(sortedDepartures);
  }, [data]);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Departure/Arrivals Board">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Carrier</b>
            </TableCell>
            <TableCell align="right">
              <b>Time</b>
            </TableCell>
            <TableCell align="right">
              <b>Destination</b>
            </TableCell>
            <TableCell align="right">
              <b>Train #</b>
            </TableCell>
            <TableCell align="right">
              <b>Track #</b>
            </TableCell>
            <TableCell align="right">
              <b>Status</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {departures.map((departure: IPrediction) => (
            <BoardEntry key={departure.id} data={departure} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Board;
