import React from 'react';
import './App.css';
import DataFetcher from './DataFetcher';
import MqttSubscriber from './MqttSubscriber';
import MqttSubscriber2 from './MqttSubscriber2';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React API Demo</h1>
        {/* <DataFetcher /> */}
	      <MqttSubscriber />
      </header>
    </div>
  );
}

export default App;

