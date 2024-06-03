import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';

// Definir los tipos de tramas como constantes
const COD_KEYPAD = 0xF0
const COD_FINGERPRINT = 0xEF
const COD_CARD = 0x01

// Definir el header común para todas las tramas
const HEADER_ = [0xa6, 0x00, 0x0c, 0x01, 0x40]
const HEADER = "a6 0 c 1 40 "
const FOOTER = " 0 0"

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
      const ms = message.toString();

      // Expresión regular para obtener el substring entre HEADER y FOOTER
      const regex = new RegExp(`${HEADER}(.*?)${FOOTER}`);

      // Buscar el substring entre HEADER y FOOTER en el string original
      const match = ms.match(regex);

      // Obtener el substring encontrado
      let salida = match ? match[1] : null;
      // salida = salida?.split(" ").map((x) => parseInt(x, 16));
      salida = salida?.split(" ").map((x) => parseInt(x, 16));
      let str_salida = ""


      if(salida)
      switch(salida[0]){
        case COD_KEYPAD:
          console.log("KEYPAD", salida?.slice(1))
          str_salida = "KEYPAD " + salida?.slice(1).map((x) => String.fromCharCode(x)).join("")
          break;
        case COD_FINGERPRINT:
          console.log("FINGERPRINT", salida?.slice(1))
          str_salida = "FINGERPRINT " + salida?.slice(2).map((x) => x.toString(16)).join("")
          break;
        case COD_CARD:
          console.log("CARD", salida?.slice(1))
          str_salida = "CARD " + salida?.slice(2).map((x) => x.toString(16)).join(" ")
          break;
      }
      setMessage(str_salida);
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
