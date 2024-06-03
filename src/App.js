import React from 'react';
import './App.css';
import DataFetcher from './DataFetcher';
import MqttSubscriber from './MqttSubscriber';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React API Demo</h1>
        <DataFetcher />
	      <MqttSubscriber />
      </header>
    </div>
  );
}

export default App;

