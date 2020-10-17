import React from 'react';
import './App.css';
import Plot from './Plot';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Handshake Speed Test Results
        </p>
      </header>
      <div className="App-body">
        <Plot></Plot>
      </div>
  </div>
  );
}

export default App;
