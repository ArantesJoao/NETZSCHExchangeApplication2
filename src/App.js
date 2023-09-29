import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:3001');

    ws.current.onopen = () => {
      console.log("Connected to the WebSocket");
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.source === 'net') {
        setOutput(message.data);
      }
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    const message = {
      source: 'react',
      data: e.target.value || " "  // ensure to send empty space if !value
    };
    console.log("Sending from React:", message);
    ws.current.send(JSON.stringify(message));
  };


  return (
    <div className="App">
      <input value={input} onChange={handleInputChange} />
      <div>{output}</div>
    </div>
  );
}

export default App;
