import React from 'react';
import { CssBaseline } from '@material-ui/core';
import useMBTAStreaming from './hooks/useMBTAStreaming';
import Board from './components/Board';

function App() {
  const [data] = useMBTAStreaming();

  return (
    <>
      <CssBaseline />
      <Board data={data} />
    </>
  );
}

export default App;
