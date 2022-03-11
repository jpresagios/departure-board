import React from 'react';
import useMBTAStreaming from './hooks/useMBTAStreaming';
import Board from './components/Board';

function App() {
  const [data] = useMBTAStreaming();

  return (
    <Board data={data} />
  );
}

export default App;
