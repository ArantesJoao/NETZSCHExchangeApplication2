import React, { useRef, useEffect } from 'react';

function Input({ value, onInputChange, onMessageReceived }) {
  const ws = useRef(null);

  useEffect(() => {
    setupWebSocket();
    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, [onMessageReceived]);

  const setupWebSocket = () => {
    ws.current = new WebSocket('ws://localhost:3001');
    ws.current.onmessage = handleWebSocketMessage;
    ws.current.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };
    ws.current.onclose = (event) => {
      if (event.wasClean) {
        console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
      } else {
        console.error('Connection died');
      }
    };
  };

  const handleWebSocketMessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.source === 'net') {
      onMessageReceived(message.data);
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    onInputChange(inputValue);
    sendMessage(inputValue);
  };

  const sendMessage = (inputValue) => {
    const message = {
      source: 'react',
      data: inputValue || " "  // ensure to send empty space if !value
    };
    ws.current.send(JSON.stringify(message));
  };

  return (
    <div className='flex flex-col w-full h-full justify-center items-center'>
      <div className='w-1/4'>
        <label className='font-bold'>
          Say something to your fellow NETZSCHE Exchanger!
        </label>
        <textarea
          value={value}
          onChange={handleInputChange}
          className='w-full h-32 border border-neutral-950 rounded mt-1 px-1.5 resize-none'
        />
      </div>
    </div>
  );
}

export default Input;
