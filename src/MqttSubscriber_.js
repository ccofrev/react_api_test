import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';

const MqttSubscriber = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // const client = mqtt.connect('ws://broker.hivemq.com:8000/mqtt');
    const client = mqtt.connect('ws://192.168.0.248:9001/mqtt');

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('reefet', (err) => {
        if (!err) {
          console.log('Subscribed to topic');
        }
      });
    });

    client.on('message', (topic, message) => {
      setMessage(message.toString());
    });

    return () => {
      if (client) {
        client.end();
      }
    };
  }, []);

  return (
    <div>
      <h2>MQTT Subscriber</h2>
      <p>Mensaje: {message}</p>
    </div>
  );
};

export default MqttSubscriber;
